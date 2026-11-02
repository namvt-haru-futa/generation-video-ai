#!/usr/bin/env python3
"""
WhisperX alignment — transcribe + word-level timestamps cho file audio tiếng Việt.

Xuất JSON theo đúng Remotion `Caption` type:
    { text, startMs, endMs, timestampMs, confidence }

Cách dùng cơ bản:
    uv run whisperx-align.py public/voice/<topic>/vo-01.wav \
        -o src/research/<topic>/captions/vo-01.json

Word-level (mặc định) — mỗi từ là 1 entry:
    uv run whisperx-align.py public/voice/death-valley/vo-01.wav \
        -o src/research/death-valley/captions/vo-01.json

Phrase-level — gộp từ thành cụm 4-6 từ cho phụ đề dễ đọc:
    uv run whisperx-align.py public/voice/death-valley/vo-01.wav \
        -o src/research/death-valley/captions/vo-01.json \
        --phrase

Batch cả folder:
    uv run whisperx-align.py public/voice/death-valley/ \
        -o src/research/death-valley/captions/

Ngôn ngữ khác (mặc định vi):
    uv run whisperx-align.py audio.wav -o out.json --language en

Lần đầu chạy sẽ tải model:
    - faster-whisper `medium` ~1.5 GB
    - wav2vec2 alignment model tiếng Việt ~370 MB
"""

import argparse
import json
import os
import sys
from pathlib import Path


# Alignment model tốt cho tiếng Việt (WhisperX DEFAULT map không có `vi`).
# Có thể override bằng --align-model.
DEFAULT_VI_ALIGN_MODEL = "nguyenvulebinh/wav2vec2-base-vietnamese-250h"


def _ensure_ffmpeg_on_path():
    """
    WhisperX gọi ffmpeg qua subprocess. Trên Windows thường không có ffmpeg
    trong PATH — dùng binary bundle từ `imageio-ffmpeg` để không cần cài
    system-wide.
    """
    try:
        import imageio_ffmpeg
    except ImportError:
        return  # để WhisperX tự báo lỗi rõ ràng hơn
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    ffmpeg_dir = str(Path(exe).parent)
    # WhisperX chạy `ffmpeg` (không phải `ffmpeg-<version>.exe`) → tạo alias.
    alias = Path(ffmpeg_dir) / "ffmpeg.exe"
    if not alias.exists():
        try:
            import shutil
            shutil.copy2(exe, alias)
        except Exception:
            pass
    if ffmpeg_dir not in os.environ.get("PATH", ""):
        os.environ["PATH"] = ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")


_ensure_ffmpeg_on_path()


def merge_words_to_phrases(words, max_words=6, max_gap_ms=350):
    """Gộp word-level captions thành phrase-level dựa trên khoảng lặng và số từ."""
    if not words:
        return []

    phrases = []
    current = None
    word_count = 0

    for w in words:
        text = w["text"].strip()
        if not text:
            continue

        if current is None:
            current = {
                "text": text,
                "startMs": w["startMs"],
                "endMs": w["endMs"],
                "timestampMs": None,
                "confidence": w.get("confidence"),
            }
            word_count = 1
            continue

        gap_ms = w["startMs"] - current["endMs"]
        prev_ends_punct = current["text"].rstrip().endswith((".", ",", "!", "?", ";", ":", "…"))
        should_break = (
            gap_ms > max_gap_ms
            or word_count >= max_words
            or prev_ends_punct
        )

        if should_break:
            phrases.append(current)
            current = {
                "text": text,
                "startMs": w["startMs"],
                "endMs": w["endMs"],
                "timestampMs": None,
                "confidence": w.get("confidence"),
            }
            word_count = 1
        else:
            current["text"] = f"{current['text']} {text}"
            current["endMs"] = w["endMs"]
            word_count += 1
            # Confidence trung bình đơn giản: giữ min
            wc = w.get("confidence")
            cc = current.get("confidence")
            if wc is not None and cc is not None:
                current["confidence"] = min(cc, wc)

    if current is not None:
        phrases.append(current)

    return phrases


def segments_to_captions(segments):
    """Convert WhisperX segments (đã align) sang Caption[] word-level."""
    captions = []
    for seg in segments:
        words = seg.get("words") or []
        if words:
            for w in words:
                # WhisperX đôi khi không có start/end cho từ ngắn (số, ký hiệu)
                if "start" not in w or "end" not in w:
                    continue
                word_text = (w.get("word") or "").strip()
                if not word_text:
                    continue
                captions.append({
                    "text": word_text,
                    "startMs": int(round(w["start"] * 1000)),
                    "endMs": int(round(w["end"] * 1000)),
                    "timestampMs": None,
                    "confidence": w.get("score"),
                })
        else:
            # Không align được → dùng segment-level
            captions.append({
                "text": (seg.get("text") or "").strip(),
                "startMs": int(round(seg["start"] * 1000)),
                "endMs": int(round(seg["end"] * 1000)),
                "timestampMs": None,
                "confidence": None,
            })
    return captions


def transcribe_file(audio_path: Path, args, cache):
    """Transcribe 1 file audio → list Caption. Reuse model qua dict `cache`."""
    import whisperx  # import trễ để --help chạy nhanh

    print(f"\n🎧 {audio_path}")
    audio = whisperx.load_audio(str(audio_path))

    # 1) Transcribe
    if "asr" not in cache:
        print(f"   ⏳ Load faster-whisper model '{args.model}' ({args.device}/{args.compute_type})…")
        cache["asr"] = whisperx.load_model(
            args.model,
            args.device,
            compute_type=args.compute_type,
            language=args.language,
        )
    asr = cache["asr"]

    print(f"   🗣  Transcribing ({args.language})…")
    result = asr.transcribe(audio, batch_size=args.batch_size, language=args.language)

    # 2) Align (word-level timestamps)
    aligned_segments = result["segments"]
    if not args.no_align:
        try:
            if "aligner" not in cache:
                model_a_name = args.align_model
                if model_a_name is None and args.language == "vi":
                    model_a_name = DEFAULT_VI_ALIGN_MODEL
                print(f"   ⏳ Load alignment model: {model_a_name or '<whisperx default>'}…")
                model_a, metadata = whisperx.load_align_model(
                    language_code=args.language,
                    device=args.device,
                    model_name=model_a_name,
                )
                cache["aligner"] = (model_a, metadata)
            model_a, metadata = cache["aligner"]

            print(f"   🎯 Aligning word-level timestamps…")
            result = whisperx.align(
                result["segments"],
                model_a,
                metadata,
                audio,
                args.device,
                return_char_alignments=False,
            )
            aligned_segments = result["segments"]
        except Exception as e:
            print(f"   ⚠️  Alignment thất bại ({e}). Dùng segment-level timestamps.")

    captions = segments_to_captions(aligned_segments)
    if args.phrase:
        before = len(captions)
        captions = merge_words_to_phrases(
            captions,
            max_words=args.phrase_max_words,
            max_gap_ms=args.phrase_max_gap_ms,
        )
        print(f"   🧩 Gộp {before} từ → {len(captions)} cụm")

    return captions


def resolve_output(input_path: Path, output_arg: Path, is_batch: bool) -> Path:
    """Xác định đường dẫn output cho 1 file input."""
    if is_batch:
        # output_arg là folder
        return output_arg / (input_path.stem + ".json")
    return output_arg


def main():
    parser = argparse.ArgumentParser(
        description="WhisperX align → Remotion Caption[] JSON",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("audio", help="File .wav hoặc folder chứa .wav")
    parser.add_argument("-o", "--output", required=True,
                        help="File .json (single input) hoặc folder (batch input)")
    parser.add_argument("--language", default="vi", help="Ngôn ngữ (mặc định: vi)")
    parser.add_argument("--model", default="medium",
                        help="Model faster-whisper (tiny/base/small/medium/large-v3). Mặc định: medium")
    parser.add_argument("--device", default="cpu", choices=["cpu", "cuda"],
                        help="Device (mặc định: cpu)")
    parser.add_argument("--compute-type", default="int8",
                        help="Compute type (int8 cho cpu, float16 cho cuda). Mặc định: int8")
    parser.add_argument("--batch-size", type=int, default=8, help="Batch size (mặc định: 8)")
    parser.add_argument("--no-align", action="store_true",
                        help="Bỏ qua alignment (chỉ segment-level). Dùng khi VN alignment fail.")
    parser.add_argument("--align-model", default=None,
                        help=f"HuggingFace alignment model. Mặc định VN: {DEFAULT_VI_ALIGN_MODEL}")
    parser.add_argument("--phrase", action="store_true",
                        help="Gộp word-level thành cụm 4-6 từ (dễ đọc hơn)")
    parser.add_argument("--phrase-max-words", type=int, default=6,
                        help="Số từ tối đa mỗi cụm (mặc định: 6)")
    parser.add_argument("--phrase-max-gap-ms", type=int, default=350,
                        help="Khoảng lặng tối đa để gộp cùng cụm, ms (mặc định: 350)")
    args = parser.parse_args()

    audio_arg = Path(args.audio)
    output_arg = Path(args.output)

    if not audio_arg.exists():
        print(f"❌ Không tìm thấy: {audio_arg}", file=sys.stderr)
        sys.exit(1)

    if audio_arg.is_dir():
        wavs = sorted(audio_arg.glob("*.wav"))
        if not wavs:
            print(f"❌ Không có .wav nào trong {audio_arg}", file=sys.stderr)
            sys.exit(1)
        output_arg.mkdir(parents=True, exist_ok=True)
        is_batch = True
    else:
        wavs = [audio_arg]
        is_batch = False
        # Nếu output là folder, tự đặt tên; nếu là file .json thì giữ nguyên
        if output_arg.is_dir() or (output_arg.suffix == "" and not output_arg.exists()):
            output_arg.mkdir(parents=True, exist_ok=True)
            is_batch = True

    cache = {}
    for wav in wavs:
        out_path = resolve_output(wav, output_arg, is_batch)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        captions = transcribe_file(wav, args, cache)
        out_path.write_text(
            json.dumps(captions, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        total_s = 0
        if captions:
            total_s = captions[-1]["endMs"] / 1000.0
        print(f"   ✅ {len(captions)} entries → {out_path}  ({total_s:.1f}s)")


if __name__ == "__main__":
    main()
