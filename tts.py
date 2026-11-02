#!/usr/bin/env python3
"""
Zero TTS script — sinh file audio WAV từ text tiếng Việt.

Cách dùng:
  uv run tts.py "Xin chào, đây là video của tôi." -o public/voice.wav
  uv run tts.py "Nội dung cần đọc" -o public/voice.wav --voice "baotrang"
  uv run tts.py --list-voices

Lần đầu chạy sẽ tải model (~911 MB) về cache của Hugging Face.

Giọng có sẵn: baotrang, giahuy, hamy, huuduc, kimoanh, maichi, quangminh, tiendat
"""

import argparse
import sys
from pathlib import Path

AVAILABLE_VOICES = [
    "baotrang",
    "giahuy",
    "hamy",
    "huuduc",
    "kimoanh",
    "maichi",
    "quangminh",
    "tiendat",
]


def list_voices():
    print(f"\n🎙️  {len(AVAILABLE_VOICES)} giọng có sẵn:")
    for v in AVAILABLE_VOICES:
        print(f"  - {v}")


def main():
    parser = argparse.ArgumentParser(description="Zero TTS — Text-to-Speech tiếng Việt")
    parser.add_argument("text", nargs="?", help="Văn bản cần đọc")
    parser.add_argument("-o", "--output", default="public/voice.wav", help="Đường dẫn file output (mặc định: public/voice.wav)")
    parser.add_argument("--voice", default="giahuy", help="Tên giọng đọc (mặc định: giahuy)")
    parser.add_argument("--list-voices", action="store_true", help="Hiển thị danh sách giọng có sẵn")
    args = parser.parse_args()

    if args.list_voices:
        list_voices()
        return

    if not args.text:
        parser.print_help()
        sys.exit(1)

    print("⏳ Đang khởi động Zero TTS...")
    from zerotts import ZeroTTS
    tts = ZeroTTS.from_pretrained("zeroweight-ai/ZeroTTS")

    # Đảm bảo thư mục output tồn tại
    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"🔊 Đang tổng hợp giọng đọc...")
    print(f"   Text  : {args.text}")
    print(f"   Giọng : {args.voice}")
    print(f"   Output: {out_path}")

    audio = tts.synthesize(args.text, voice=args.voice)
    tts.save_audio(audio, str(out_path))
    print(f"✅ Đã lưu: {out_path}")


if __name__ == "__main__":
    main()
