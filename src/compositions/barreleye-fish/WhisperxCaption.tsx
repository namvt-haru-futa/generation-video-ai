/**
 * WhisperxCaption — Phụ đề đọc trực tiếp từ WhisperX word-level JSON
 * (nguồn: src/research/barreleye-fish/captions/vo-XX.json)
 *
 * Timing 100% chính xác với voice-over vì lấy startMs/endMs từng chữ
 * do WhisperX align ra. Dùng `createTikTokStyleCaptions` để gom
 * từng chữ thành page ~1.2s (phong cách TikTok / Shorts).
 *
 * Hiển thị:
 *   - Cả page hiện trong khoảng [page.startMs, page.startMs + page.durationMs]
 *   - Chữ đang phát: glow xanh lá + scale nhẹ (karaoke)
 *   - Chữ đã phát: trắng ngà
 *   - Chữ chưa phát: mờ
 */
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type {
  Caption as RemotionCaption,
  TikTokPage,
  TikTokToken,
} from "@remotion/captions";
import { COLORS } from "./shared";
import { FONT } from "./fonts";

// ─── Custom grouper — chia captions thành page 5-7 từ theo pause tự nhiên ─
// `createTikTokStyleCaptions` của Remotion chỉ break khi gap > threshold, mà TTS
// tiếng Việt thường nói liền → toàn bộ scene có thể dồn 1 page. Thay bằng
// grouper tự viết: đóng page khi đã đủ ~6 từ và gặp dấu câu / pause > 200ms.
const TARGET_WORDS = 6;
const MAX_WORDS = 9;
const PAUSE_HINT_MS = 200;
const PUNCT_END = /[,.?!:;…—]$/;

const pagesCache = new WeakMap<RemotionCaption[], TikTokPage[]>();

const buildPage = (words: RemotionCaption[]): TikTokPage => {
  const tokens: TikTokToken[] = words.map((c) => ({
    text: c.text,
    fromMs: c.startMs,
    toMs: c.endMs,
  }));
  return {
    text: words.map((c) => c.text).join(" "),
    startMs: words[0].startMs,
    durationMs: words[words.length - 1].endMs - words[0].startMs,
    tokens,
  };
};

const getPages = (captions: RemotionCaption[]): TikTokPage[] => {
  const cached = pagesCache.get(captions);
  if (cached) return cached;

  const pages: TikTokPage[] = [];
  let curr: RemotionCaption[] = [];
  for (let i = 0; i < captions.length; i++) {
    curr.push(captions[i]);
    const next = captions[i + 1];
    const nextGap = next ? next.startMs - captions[i].endMs : Infinity;
    const isPunct = PUNCT_END.test(captions[i].text);
    const enough = curr.length >= TARGET_WORDS;
    const force = curr.length >= MAX_WORDS;
    const isLast = i === captions.length - 1;
    const shouldBreak =
      isLast || force || (enough && (isPunct || nextGap > PAUSE_HINT_MS));
    if (shouldBreak) {
      pages.push(buildPage(curr));
      curr = [];
    }
  }

  // Kéo dài mỗi page tới ngay trước khi page kế tiếp bắt đầu, để caption không
  // "chớp mất" ở các gap ngắn giữa cụm từ / dấu câu.
  for (let i = 0; i < pages.length - 1; i++) {
    pages[i].durationMs = pages[i + 1].startMs - pages[i].startMs;
  }
  // Page cuối: giữ nguyên hoặc +300ms để bám cuối câu.
  if (pages.length > 0) {
    const last = pages[pages.length - 1];
    last.durationMs = Math.max(last.durationMs + 200, 800);
  }

  pagesCache.set(captions, pages);
  return pages;
};

interface WhisperxCaptionProps {
  captions: RemotionCaption[];
  /** Frame offset (nếu voice không bắt đầu từ frame 0 của scene) */
  offset?: number;
}

export const WhisperxCaption: React.FC<WhisperxCaptionProps> = ({
  captions,
  offset = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = ((frame - offset) / fps) * 1000;

  const pages = getPages(captions);

  const active = pages.find(
    (p) => currentMs >= p.startMs && currentMs < p.startMs + p.durationMs,
  );
  if (!active) return null;

  // Fade in/out mượt cho box
  const rel = currentMs - active.startMs;
  const dur = active.durationMs;
  const boxOpacity = interpolate(
    rel,
    [0, 120, dur - 120, dur],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 40px",
        opacity: boxOpacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(2,11,24,0.78)",
          borderRadius: 14,
          padding: "16px 30px",
          maxWidth: "92%",
          border: `1.5px solid ${COLORS.glow}55`,
          display: "flex",
          flexWrap: "wrap",
          gap: "0 14px",
          justifyContent: "center",
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 24px ${COLORS.glow}22`,
        }}
      >
        {active.tokens.map((tok, i) => {
          const spoken = currentMs >= tok.toMs;
          const activeWord = currentMs >= tok.fromMs && currentMs < tok.toMs;
          const color = activeWord
            ? COLORS.glow
            : spoken
              ? COLORS.cream
              : "rgba(245,251,255,0.5)";
          return (
            <span
              key={i}
              style={{
                color,
                fontSize: 48,
                fontWeight: 800,
                fontFamily: FONT,
                lineHeight: 1.35,
                display: "inline-block",
                textShadow: activeWord
                  ? `0 0 20px ${COLORS.glow}, 0 2px 10px rgba(0,0,0,0.95)`
                  : "0 2px 10px rgba(0,0,0,0.95)",
              }}
            >
              {tok.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
