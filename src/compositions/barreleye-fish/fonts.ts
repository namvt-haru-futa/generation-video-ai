/**
 * Font tiếng Việt — Be Vietnam Pro (dấu hiển thị chuẩn trong Chromium).
 */
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800", "900"],
  subsets: ["vietnamese", "latin", "latin-ext"],
});

export const FONT = fontFamily;
