/**
 * Font tiếng Việt — Be Vietnam Pro (thiết kế riêng cho tiếng Việt,
 * hiển thị dấu chuẩn & đẹp). Thay cho Arial (dấu bị xấu trong Chromium).
 */
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["vietnamese", "latin", "latin-ext"],
});

// Dùng xuyên suốt các component
export const FONT = fontFamily;
