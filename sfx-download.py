#!/usr/bin/env python3
"""
sfx-download.py — tải bộ SFX CC0 curated về `public/assets/sfx/<category>/`.

Nguồn: Kenney game asset packs (public domain / CC0), mirror qua repo
`lavenderdotpet/CC0-Public-Domain-Sounds` trên GitHub. Không cần API key,
không cần attribution.

Categories:
    hook     — punchy opening hit (dùng cho scene mở)
    callout  — soft ding cho số liệu / fact
    success  — rising chime cho kỷ lục / achievement
    alert    — warning tone cho thảm kịch / nguy hiểm
    reveal   — sparkle cho khám phá / bất ngờ
    drone    — bell heavy cho tông tối / khắc nghiệt
    outro    — closing chime cho scene kết

Chạy 1 lần sau khi clone repo:
    uv run sfx-download.py

Đã có file rồi thì bỏ qua (idempotent). Ép re-download:
    uv run sfx-download.py --force

Xong sẽ tự sinh `public/assets/sfx/manifest.json` để selector dùng.
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.request
import urllib.error
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SFX_ROOT = ROOT / "public" / "assets" / "sfx"
MANIFEST_PATH = SFX_ROOT / "manifest.json"

BASE_URL = "https://raw.githubusercontent.com/lavenderdotpet/CC0-Public-Domain-Sounds/main"

# category → list of (source_folder_in_repo, [filenames])
SFX_MAP: dict[str, list[tuple[str, list[str]]]] = {
    "hook": [
        ("kenney_musicjingles/Audio/Hit jingles",
         ["jingles_HIT00.ogg", "jingles_HIT01.ogg", "jingles_HIT02.ogg", "jingles_HIT03.ogg"]),
    ],
    "callout": [
        ("kenney_interfacesounds/Audio",
         ["confirmation_001.ogg", "confirmation_002.ogg",
          "pluck_001.ogg", "pluck_002.ogg"]),
        ("kenney_impactsounds/Audio",
         ["impactBell_heavy_000.ogg", "impactBell_heavy_001.ogg"]),
    ],
    "success": [
        ("kenney_musicjingles/Audio/Pizzicato jingles",
         ["jingles_PIZZI00.ogg", "jingles_PIZZI01.ogg", "jingles_PIZZI02.ogg"]),
        ("kenney_interfacesounds/Audio",
         ["confirmation_003.ogg", "confirmation_004.ogg"]),
    ],
    "alert": [
        ("kenney_interfacesounds/Audio",
         ["error_003.ogg", "error_004.ogg", "glitch_001.ogg", "glitch_002.ogg"]),
    ],
    "reveal": [
        ("kenney_interfacesounds/Audio",
         ["glass_001.ogg", "glass_002.ogg", "question_001.ogg"]),
        ("kenney_musicjingles/Audio/Pizzicato jingles",
         ["jingles_PIZZI08.ogg", "jingles_PIZZI09.ogg"]),
    ],
    "drone": [
        ("kenney_impactsounds/Audio",
         ["impactBell_heavy_003.ogg", "impactBell_heavy_004.ogg"]),
    ],
    "outro": [
        ("kenney_musicjingles/Audio/Pizzicato jingles",
         ["jingles_PIZZI13.ogg", "jingles_PIZZI14.ogg", "jingles_PIZZI15.ogg"]),
    ],
}


def download(url: str, dest: Path) -> tuple[bool, str]:
    """Tải 1 file. Return (ok, msg)."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "sfx-download.py"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        dest.write_bytes(data)
        return True, f"{len(data):,} bytes"
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}"
    except (urllib.error.URLError, TimeoutError) as e:
        return False, f"network: {e}"


def scan_manifest(sfx_root: Path) -> dict[str, list[str]]:
    """Scan `public/assets/sfx/<category>/*.{ogg,mp3,wav}` → dict category → filenames."""
    manifest: dict[str, list[str]] = {}
    if not sfx_root.exists():
        return manifest
    for cat_dir in sorted(p for p in sfx_root.iterdir() if p.is_dir()):
        files = sorted(
            p.name for p in cat_dir.iterdir()
            if p.is_file() and p.suffix.lower() in {".ogg", ".mp3", ".wav"}
        )
        if files:
            manifest[cat_dir.name] = files
    return manifest


def write_manifest(manifest: dict[str, list[str]]) -> None:
    SFX_ROOT.mkdir(parents=True, exist_ok=True)
    payload = {
        "generatedBy": "sfx-download.py",
        "source": "kenney (CC0) via lavenderdotpet/CC0-Public-Domain-Sounds",
        "license": "CC0 1.0 Universal — no attribution required",
        "categories": manifest,
    }
    MANIFEST_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"📝 manifest → {MANIFEST_PATH.relative_to(ROOT)}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Tải Kenney CC0 SFX pack")
    parser.add_argument("--force", action="store_true", help="Ép tải lại dù file đã có")
    parser.add_argument("--scan-only", action="store_true",
                        help="Không tải mới, chỉ scan thư mục hiện có + regenerate manifest")
    args = parser.parse_args()

    if args.scan_only:
        manifest = scan_manifest(SFX_ROOT)
        print(f"🔎 Scan {SFX_ROOT.relative_to(ROOT)} → {sum(len(v) for v in manifest.values())} files "
              f"trong {len(manifest)} categories")
        write_manifest(manifest)
        return 0

    print(f"📥 Tải Kenney CC0 SFX pack → {SFX_ROOT.relative_to(ROOT)}/")
    print(f"   Nguồn: {BASE_URL}\n")

    stats = {"ok": 0, "skip": 0, "fail": 0}
    for category, groups in SFX_MAP.items():
        cat_dir = SFX_ROOT / category
        cat_dir.mkdir(parents=True, exist_ok=True)
        for src_folder, filenames in groups:
            for fname in filenames:
                dest = cat_dir / fname
                if dest.exists() and not args.force:
                    stats["skip"] += 1
                    print(f"  ⏭  {category}/{fname}  (đã có)")
                    continue
                # URL-encode dấu space trong tên folder
                src_folder_enc = src_folder.replace(" ", "%20")
                url = f"{BASE_URL}/{src_folder_enc}/{fname}"
                ok, msg = download(url, dest)
                if ok:
                    stats["ok"] += 1
                    print(f"  ✅ {category}/{fname}  ({msg})")
                else:
                    stats["fail"] += 1
                    print(f"  ❌ {category}/{fname}  ({msg})", file=sys.stderr)

    print(f"\n📊 Kết quả: {stats['ok']} tải mới, {stats['skip']} bỏ qua, {stats['fail']} lỗi")

    manifest = scan_manifest(SFX_ROOT)
    write_manifest(manifest)
    return 0 if stats["fail"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
