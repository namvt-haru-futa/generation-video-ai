#!/usr/bin/env python3
"""
pipeline.py — orchestrator cho video workflow (Bước 3 + 4 + audit).

Đọc `src/research/<topic>/script.json` rồi tự chạy:
  1. TTS (Zero TTS) mỗi scene → `public/voice/<topic>/<sceneId>.wav`
  2. WhisperX align mỗi voice   → `src/research/<topic>/captions/<sceneId>.json`
  3. Audit độ dài thực tế qua Python `wave`, so với `durationHint`, tính frame @ fps.

Idempotent: file đã tồn tại thì bỏ qua. Xoá file để re-run 1 scene.

Cách dùng:
    uv run pipeline.py death-valley                 # chạy full pipeline
    uv run pipeline.py death-valley --dry-run       # chỉ audit, không TTS/align
    uv run pipeline.py death-valley --force-tts     # ép re-TTS toàn bộ
    uv run pipeline.py death-valley --force-align   # ép re-align toàn bộ
    uv run pipeline.py death-valley --skip-align    # chỉ TTS + audit
    uv run pipeline.py death-valley --only vo-03    # chỉ scene vo-03 (có thể lặp)
    uv run pipeline.py death-valley --phrase        # align ra phrase-level thay vì word

Phụ thuộc: tts.py, whisperx-align.py cùng root project. UTF-8 tự ép cho subprocess.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import wave
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
TTS_SCRIPT = ROOT / "tts.py"
ALIGN_SCRIPT = ROOT / "whisperx-align.py"
SFX_MANIFEST = ROOT / "public" / "assets" / "sfx" / "manifest.json"

REQUIRED_TOP_KEYS = {"topic", "scenes"}
REQUIRED_SCENE_KEYS = {"id", "voiceText"}

# Keyword → category (giữ đồng bộ với src/lib/sfx-selector.ts). Rule: match đầu tiên wins.
SFX_KEYWORDS: list[tuple[str, list[str]]] = [
    ("alert", ["cảnh báo", "nguy hiểm", "chết chóc", "thảm kịch", "thảm hoạ",
               "thảm họa", "mắc kẹt", "lạc", "mất tích", "vĩnh biệt", "cái chết"]),
    ("success", ["kỷ lục", "cao nhất", "thấp nhất", "khô hạn nhất", "nóng nhất",
                 "lớn nhất", "đạt mức", "chinh phục", "kỳ tích", "vô địch"]),
    ("reveal", ["bạn có biết", "kỳ diệu", "đặc biệt", "tuyệt vời", "khám phá",
                "bí ẩn", "hoá ra", "hóa ra", "hiện ra", "bừng nở", "sống sót"]),
    ("drone", ["khắc nghiệt", "sa mạc", "hoang mạc", "hàng triệu năm",
               "hàng trăm triệu", "ngàn năm", "nghìn năm", "mãi mãi", "màn đêm"]),
]


# ─────────────────────────────── Data model ───────────────────────────────

@dataclass
class Scene:
    id: str
    voice_text: str
    name: str = ""
    component: str = ""
    duration_hint: float | None = None
    sfx_override: str | None = None  # None → auto, "none" → mute, "cat/file.ogg" hoặc "cat"

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "Scene":
        missing = REQUIRED_SCENE_KEYS - raw.keys()
        if missing:
            raise ValueError(f"scene thiếu key {missing}: {raw!r}")
        sfx = raw.get("sfx")
        if sfx is not None and not isinstance(sfx, str):
            sfx = None  # bỏ qua nếu không phải string
        return cls(
            id=raw["id"],
            voice_text=raw["voiceText"].strip(),
            name=raw.get("name", ""),
            component=raw.get("component", ""),
            duration_hint=raw.get("durationHint"),
            sfx_override=sfx,
        )


@dataclass
class Script:
    topic: str
    fps: int
    voice_provider: str
    voice_name: str
    scenes: list[Scene]

    @classmethod
    def load(cls, path: Path) -> "Script":
        raw = json.loads(path.read_text(encoding="utf-8"))
        missing = REQUIRED_TOP_KEYS - raw.keys()
        if missing:
            raise ValueError(f"script.json thiếu key {missing}")
        voice = raw.get("voice") or {}
        return cls(
            topic=raw["topic"],
            fps=int(raw.get("fps", 30)),
            voice_provider=voice.get("provider", "zerotts"),
            voice_name=voice.get("voice", "giahuy"),
            scenes=[Scene.from_dict(s) for s in raw["scenes"]],
        )


# ─────────────────────────────── Helpers ───────────────────────────────

def utf8_env() -> dict[str, str]:
    """UTF-8 env cho subprocess trên Windows (tránh lỗi in console)."""
    env = os.environ.copy()
    env.setdefault("PYTHONUTF8", "1")
    env.setdefault("PYTHONIOENCODING", "utf-8")
    return env


def wav_duration_seconds(path: Path) -> float | None:
    """Đọc độ dài WAV bằng stdlib `wave`. None nếu file lỗi."""
    try:
        with wave.open(str(path), "rb") as w:
            frames = w.getnframes()
            rate = w.getframerate()
            if rate <= 0:
                return None
            return frames / rate
    except (wave.Error, FileNotFoundError, EOFError):
        return None


def load_sfx_manifest() -> dict[str, list[str]]:
    """Load SFX manifest categories → filenames. Empty dict nếu chưa có."""
    if not SFX_MANIFEST.exists():
        return {}
    try:
        data = json.loads(SFX_MANIFEST.read_text(encoding="utf-8"))
        return data.get("categories", {}) or {}
    except json.JSONDecodeError:
        return {}


def _djb2_hash(s: str) -> int:
    """Match src/lib/sfx-selector.ts hashString() để pipeline audit khớp Remotion runtime."""
    h = 5381
    for ch in s:
        h = ((h * 33) + ord(ch)) & 0xFFFFFFFF
    return h


def predict_sfx(scene: "Scene", index: int, total: int,
                manifest: dict[str, list[str]]) -> tuple[str, str, str]:
    """
    Dự đoán SFX cho 1 scene giống hệt logic sfx-selector.ts.
    Return (category, filename, reason) — reason ∈ {override, semantic, default, muted, missing, empty}.
    """
    override = getattr(scene, "sfx_override", None)
    if override == "none":
        return ("—", "—", "muted")
    if isinstance(override, str) and override:
        if "/" in override:
            cat, fname = override.split("/", 1)
            return (cat, fname, "override")
        # ép category, hash pick
        files = manifest.get(override, [])
        if not files:
            return (override, "—", "missing")
        idx = _djb2_hash(scene.id) % len(files)
        return (override, files[idx], "override")

    # semantic
    lower = scene.voice_text.lower()
    for cat, words in SFX_KEYWORDS:
        if any(w in lower for w in words):
            files = manifest.get(cat, [])
            if not files:
                return (cat, "—", "missing")
            idx = _djb2_hash(scene.id) % len(files)
            return (cat, files[idx], "semantic")

    # default theo vị trí
    if index == 0:
        cat = "hook"
    elif index == total - 1:
        cat = "outro"
    else:
        cat = "callout"
    files = manifest.get(cat, [])
    if not files:
        return (cat, "—", "missing")
    idx = _djb2_hash(scene.id) % len(files)
    return (cat, files[idx], "default")


def captions_max_end_ms(path: Path) -> int | None:
    """Lấy endMs entry cuối trong file captions JSON."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if not data:
            return None
        return max(int(c.get("endMs", 0)) for c in data)
    except (json.JSONDecodeError, FileNotFoundError):
        return None


def run(cmd: list[str], *, dry_run: bool) -> int:
    """Chạy subprocess, stream stdout/stderr về parent. Return exit code."""
    print(f"  $ {' '.join(cmd)}")
    if dry_run:
        return 0
    try:
        return subprocess.call(cmd, env=utf8_env())
    except FileNotFoundError as e:
        print(f"  ❌ Không tìm thấy lệnh: {e}", file=sys.stderr)
        return 127


# ─────────────────────────────── Pipeline steps ───────────────────────────────

def step_tts(script: Script, wav_path: Path, scene: Scene, *,
             force: bool, dry_run: bool) -> str:
    """Trả về status string: 'exist' | 'created' | 'failed' | 'skip'."""
    if wav_path.exists() and not force:
        return "exist"
    if force and wav_path.exists() and not dry_run:
        wav_path.unlink()
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"🎙  TTS  [{scene.id}] → {wav_path.name}")
    code = run(
        [
            "uv", "run", str(TTS_SCRIPT),
            scene.voice_text,
            "-o", str(wav_path),
            "--voice", script.voice_name,
        ],
        dry_run=dry_run,
    )
    if code != 0:
        return "failed"
    return "created"


def step_align(cap_path: Path, wav_path: Path, scene_id: str, *,
               force: bool, dry_run: bool, phrase: bool,
               model: str, align_model: str | None) -> str:
    if cap_path.exists() and not force:
        return "exist"
    if not wav_path.exists():
        return "skip"  # không có voice thì không align được
    if force and cap_path.exists() and not dry_run:
        cap_path.unlink()
    cap_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"📝 ALIGN [{scene_id}] → {cap_path.name}")
    cmd = [
        "uv", "run", str(ALIGN_SCRIPT),
        str(wav_path),
        "-o", str(cap_path),
        "--model", model,
    ]
    if phrase:
        cmd.append("--phrase")
    if align_model:
        cmd.extend(["--align-model", align_model])
    code = run(cmd, dry_run=dry_run)
    if code != 0:
        return "failed"
    return "created"


# ─────────────────────────────── Audit ───────────────────────────────

def format_delta(delta_s: float) -> str:
    sign = "+" if delta_s >= 0 else "−"
    return f"{sign}{abs(delta_s):.1f}s"


def audit(script: Script, voice_dir: Path, captions_dir: Path) -> None:
    manifest = load_sfx_manifest()
    sfx_available = bool(manifest)

    print("\n📊 Audit — real durations vs hints" +
          ("" if sfx_available else "   (SFX chưa cài — chạy `uv run sfx-download.py`)"))
    header_line = "─" * 108
    print(header_line)
    print(f"{'Scene':<10} {'Voice':<7} {'Caps':<6} {'Real':>8} {'Hint':>8} "
          f"{'Δ':>8} {'Frames':>8} {'Caps Δ':>8}  {'SFX':<28} {'Reason':<10}")
    print(header_line)

    total_real = 0.0
    total_hint = 0.0
    have_all_voice = True
    have_all_caps = True
    sfx_reason_counts: dict[str, int] = {}
    total = len(script.scenes)

    for idx, scene in enumerate(script.scenes):
        wav_path = voice_dir / f"{scene.id}.wav"
        cap_path = captions_dir / f"{scene.id}.json"
        real_s = wav_duration_seconds(wav_path)
        cap_end_ms = captions_max_end_ms(cap_path)

        voice_col = "✅" if wav_path.exists() else "❌"
        caps_col = "✅" if cap_path.exists() else "❌"
        if not wav_path.exists():
            have_all_voice = False
        if not cap_path.exists():
            have_all_caps = False

        real_str = f"{real_s:.1f}s" if real_s is not None else "—"
        hint_str = f"{scene.duration_hint:.1f}s" if scene.duration_hint else "—"
        if real_s is not None and scene.duration_hint is not None:
            delta_str = format_delta(real_s - scene.duration_hint)
            total_real += real_s
            total_hint += scene.duration_hint
        elif real_s is not None:
            delta_str = "—"
            total_real += real_s
        else:
            delta_str = "—"

        frames_str = f"{int(round(real_s * script.fps))}" if real_s is not None else "—"

        if real_s is not None and cap_end_ms is not None:
            caps_delta_str = format_delta(cap_end_ms / 1000.0 - real_s)
        else:
            caps_delta_str = "—"

        # SFX prediction — match sfx-selector.ts
        sfx_cat, sfx_file, sfx_reason = predict_sfx(scene, idx, total, manifest)
        sfx_reason_counts[sfx_reason] = sfx_reason_counts.get(sfx_reason, 0) + 1
        if sfx_reason == "muted":
            sfx_col = "🔇 muted"
        elif sfx_reason == "missing":
            sfx_col = f"⚠ {sfx_cat}/?"
        else:
            sfx_col = f"{sfx_cat}/{sfx_file}"
        # trim
        if len(sfx_col) > 28:
            sfx_col = sfx_col[:26] + ".."

        print(f"{scene.id:<10} {voice_col:<7} {caps_col:<6} "
              f"{real_str:>8} {hint_str:>8} {delta_str:>8} "
              f"{frames_str:>8} {caps_delta_str:>8}  {sfx_col:<28} {sfx_reason:<10}")

    print(header_line)
    total_frames = int(round(total_real * script.fps))
    print(f"Tổng voice thực tế: {total_real:.1f}s  →  ~{total_frames} frames @ {script.fps}fps")
    if total_hint > 0:
        print(f"Tổng hint script:   {total_hint:.1f}s  (Δ {format_delta(total_real - total_hint)})")
    status_bits = []
    status_bits.append("voice: FULL" if have_all_voice else "voice: MISSING")
    status_bits.append("captions: FULL" if have_all_caps else "captions: MISSING")
    print("Trạng thái:         " + " | ".join(status_bits))
    if sfx_available:
        summary = ", ".join(f"{v} {k}" for k, v in sorted(sfx_reason_counts.items()))
        print(f"SFX resolve:        {summary}")
    print()


# ─────────────────────────────── Main ───────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Video workflow orchestrator (Bước 3 + 4 + audit)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("topic", help="Tên topic (khớp thư mục src/research/<topic>/)")
    parser.add_argument("--script", help="Path đến script.json (mặc định: src/research/<topic>/script.json)")
    parser.add_argument("--dry-run", action="store_true", help="Chỉ audit, không chạy TTS/align")
    parser.add_argument("--force-tts", action="store_true", help="Ép re-TTS dù wav đã có")
    parser.add_argument("--force-align", action="store_true", help="Ép re-align dù json đã có")
    parser.add_argument("--skip-tts", action="store_true", help="Bỏ qua bước TTS")
    parser.add_argument("--skip-align", action="store_true", help="Bỏ qua bước align")
    parser.add_argument("--only", action="append", default=[],
                        help="Chỉ xử lý scene id này (có thể lặp: --only vo-01 --only vo-03)")
    parser.add_argument("--phrase", action="store_true", help="WhisperX gộp thành phrase-level")
    parser.add_argument("--model", default="medium", help="faster-whisper model (mặc định: medium)")
    parser.add_argument("--align-model", default=None, help="HF alignment model (override VN default)")
    parser.add_argument("--scan-sfx", action="store_true",
                        help="Regenerate SFX manifest.json trước khi audit (khi vừa thêm/bớt SFX)")
    args = parser.parse_args()

    # Optional: scan SFX before anything else
    if args.scan_sfx:
        print("🔎 Scan SFX manifest…")
        code = subprocess.call(["uv", "run", str(ROOT / "sfx-download.py"), "--scan-only"],
                               env=utf8_env())
        if code != 0:
            print(f"⚠️  sfx-download.py --scan-only failed (exit {code})")
        print()

    # Locate script.json
    script_path = Path(args.script) if args.script else ROOT / "src" / "research" / args.topic / "script.json"
    if not script_path.exists():
        print(f"❌ Không tìm thấy script.json: {script_path}", file=sys.stderr)
        print(f"   Tạo file này trước khi chạy pipeline, hoặc dùng --script.", file=sys.stderr)
        return 1

    try:
        script = Script.load(script_path)
    except (ValueError, json.JSONDecodeError) as e:
        print(f"❌ script.json không hợp lệ: {e}", file=sys.stderr)
        return 1

    if script.topic != args.topic:
        print(f"⚠️  script.json.topic={script.topic!r} khác CLI topic={args.topic!r}. "
              f"Dùng theo CLI cho đường dẫn.")

    voice_dir = ROOT / "public" / "voice" / args.topic
    captions_dir = ROOT / "src" / "research" / args.topic / "captions"

    # Filter scenes
    scenes = script.scenes
    if args.only:
        only = set(args.only)
        scenes = [s for s in scenes if s.id in only]
        missing = only - {s.id for s in scenes}
        if missing:
            print(f"⚠️  Không tìm thấy scene id: {sorted(missing)}")
        if not scenes:
            print("❌ Không còn scene nào sau khi filter --only.", file=sys.stderr)
            return 1

    print(f"📋 topic={script.topic}  fps={script.fps}  voice={script.voice_name} ({script.voice_provider})")
    print(f"   {len(scenes)}/{len(script.scenes)} scenes  •  script={script_path.relative_to(ROOT)}")
    if args.dry_run:
        print("   MODE: dry-run (chỉ audit)")
    print()

    # Verify scripts exist
    if not args.dry_run:
        if not args.skip_tts and not TTS_SCRIPT.exists():
            print(f"❌ Thiếu {TTS_SCRIPT}", file=sys.stderr)
            return 1
        if not args.skip_align and not ALIGN_SCRIPT.exists():
            print(f"❌ Thiếu {ALIGN_SCRIPT}", file=sys.stderr)
            return 1

    # ── Step 1: TTS ──
    if not args.skip_tts and not args.dry_run:
        print("═══ Step 1/3 — TTS ═══")
        tts_stats = {"exist": 0, "created": 0, "failed": 0}
        for scene in scenes:
            wav_path = voice_dir / f"{scene.id}.wav"
            status = step_tts(script, wav_path, scene,
                              force=args.force_tts, dry_run=False)
            tts_stats[status] = tts_stats.get(status, 0) + 1
        print(f"→ TTS: {tts_stats['created']} tạo mới, {tts_stats['exist']} bỏ qua (đã có), "
              f"{tts_stats['failed']} lỗi\n")
        if tts_stats["failed"]:
            print("⚠️  Có scene TTS lỗi — pipeline vẫn tiếp tục nhưng audit sẽ báo thiếu.\n")
    elif args.skip_tts:
        print("═══ Step 1/3 — TTS ═══   (bỏ qua theo --skip-tts)\n")

    # ── Step 2: Align ──
    if not args.skip_align and not args.dry_run:
        print("═══ Step 2/3 — WhisperX align ═══")
        align_stats = {"exist": 0, "created": 0, "failed": 0, "skip": 0}
        for scene in scenes:
            wav_path = voice_dir / f"{scene.id}.wav"
            cap_path = captions_dir / f"{scene.id}.json"
            status = step_align(
                cap_path, wav_path, scene.id,
                force=args.force_align, dry_run=False,
                phrase=args.phrase, model=args.model,
                align_model=args.align_model,
            )
            align_stats[status] = align_stats.get(status, 0) + 1
        print(f"→ Align: {align_stats['created']} tạo mới, {align_stats['exist']} bỏ qua, "
              f"{align_stats['skip']} thiếu voice, {align_stats['failed']} lỗi\n")
    elif args.skip_align:
        print("═══ Step 2/3 — WhisperX align ═══   (bỏ qua theo --skip-align)\n")

    # ── Step 3: Audit ──
    print("═══ Step 3/3 — Audit ═══")
    # Nếu filter --only, chỉ audit các scene được chọn
    audit_script = script if not args.only else Script(
        topic=script.topic, fps=script.fps,
        voice_provider=script.voice_provider, voice_name=script.voice_name,
        scenes=scenes,
    )
    audit(audit_script, voice_dir, captions_dir)

    print("💡 Sync check: nhắc lại workflow.md — nếu vừa sửa `video-script.md`, "
          "cập nhật `script.json` (voiceText/overlayText) cho khớp trước khi chạy pipeline.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
