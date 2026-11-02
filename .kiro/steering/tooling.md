# Tooling Conventions

## Python

- Luôn dùng `uv` thay vì `python` hoặc `pip` trực tiếp.
- Chạy script Python: `uv run tts.py ...` (không dùng `.venv\Scripts\python.exe`)
- Cài package: `uv pip install <package>`
- Tạo venv: `uv venv .venv`
- Venv nằm ở `.venv/` trong project root.
