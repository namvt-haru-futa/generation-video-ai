"""
Playwright downloader — dùng khi URL tư liệu không tải trực tiếp được.

Usage:
    uv run playwright-download.py --url "https://www.pexels.com/video/12345/" --out "public/assets/video/v01-mo-ta.mp4"
    uv run playwright-download.py --url "https://pixabay.com/videos/12345/" --out "public/assets/video/v02-mo-ta.mp4"
    uv run playwright-download.py --url "https://example.com/image.jpg" --out "public/assets/images/i01-mo-ta.jpg"

Requires:
    uv pip install playwright
    uv run playwright install chromium
"""

import argparse
import asyncio
import os
import shutil
import tempfile
from pathlib import Path
from urllib.parse import urlparse

from playwright.async_api import async_playwright, Response


# Mime types được coi là "media cần tải"
MEDIA_MIME_PREFIXES = ("video/", "image/jpeg", "image/png", "image/webp", "image/gif")
# Kích thước tối thiểu để không nhầm với thumbnail nhỏ (bytes)
MIN_SIZE_BYTES = 50_000


async def intercept_download(url: str, out_path: str) -> bool:
    """
    Mở trang URL, intercept response media lớn nhất, lưu vào out_path.
    Trả về True nếu thành công.
    """
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)

    best: dict | None = None  # {"url": ..., "body": bytes}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36"
            ),
            accept_downloads=True,
        )
        page = await context.new_page()

        captured: list[dict] = []

        async def on_response(response: Response):
            ct = response.headers.get("content-type", "")
            if any(ct.startswith(p) for p in MEDIA_MIME_PREFIXES):
                try:
                    body = await response.body()
                    if len(body) >= MIN_SIZE_BYTES:
                        captured.append({"url": response.url, "body": body, "size": len(body)})
                        print(f"  [intercept] {response.url[:80]} — {len(body)//1024} KB")
                except Exception:
                    pass

        page.on("response", on_response)

        print(f"[*] Mở trang: {url}")
        await page.goto(url, wait_until="networkidle", timeout=30_000)

        # Thử click nút download nếu có
        for selector in [
            "a[download]",
            "button:has-text('Download')",
            "a:has-text('Download')",
            "[data-testid*='download']",
            ".download-button",
        ]:
            try:
                el = page.locator(selector).first
                if await el.is_visible(timeout=1_000):
                    print(f"  [click] Tìm thấy nút download: {selector}")
                    async with page.expect_download(timeout=15_000) as dl_info:
                        await el.click()
                    download = await dl_info.value
                    tmp = await download.path()
                    shutil.copy(tmp, out)
                    print(f"[✓] Đã tải (qua download event): {out}")
                    await browser.close()
                    return True
            except Exception:
                pass

        # Fallback: lấy media lớn nhất đã intercept
        if captured:
            best = max(captured, key=lambda x: x["size"])
            out.write_bytes(best["body"])
            print(f"[✓] Đã lưu từ intercept: {out} ({best['size']//1024} KB)")
            await browser.close()
            return True

        # Thử tải trực tiếp URL gốc nếu là file media
        parsed = urlparse(url)
        ext = Path(parsed.path).suffix.lower()
        if ext in (".mp4", ".webm", ".jpg", ".jpeg", ".png", ".gif", ".webp"):
            print("  [direct] URL trông giống file trực tiếp, thử tải...")
            response = await page.request.get(url)
            if response.ok:
                body = await response.body()
                out.write_bytes(body)
                print(f"[✓] Đã tải trực tiếp: {out} ({len(body)//1024} KB)")
                await browser.close()
                return True

        await browser.close()
        print("[✗] Không tìm thấy media để tải.")
        return False


def main():
    parser = argparse.ArgumentParser(description="Tải ảnh/video qua Playwright")
    parser.add_argument("--url", required=True, help="URL trang hoặc file cần tải")
    parser.add_argument("--out", required=True, help="Đường dẫn file đầu ra (vd: public/assets/video/v01-mo-ta.mp4)")
    args = parser.parse_args()

    success = asyncio.run(intercept_download(args.url, args.out))
    if not success:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
