/**
 * Caption — phụ đề KARAOKE đồng bộ giọng đọc (video Thung Lũng Chết)
 *
 * Mỗi caption entry (startFrame→endFrame) được chia thời lượng cho từng chữ:
 *   - trọng số theo độ dài chữ (chữ dài đọc lâu hơn)
 *   - cộng thêm "khoảng nghỉ" ở dấu câu (dấu kết câu nghỉ lâu hơn dấu phẩy)
 * → chữ đang đọc được highlight (đổi màu cam + phóng nhẹ), tạo hiệu ứng chữ
 *   chạy theo giọng đọc. Cửa sổ thời gian mỗi câu căn theo file voice thực tế.
 */

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CaptionEntry } from "./captions";
import { COLORS } from "./shared";
import { FONT } from "./fonts";

interface CaptionProps {
  captions: CaptionEntry[];
  offset?: number;
}

const SENTENCE_END = /[.?!…—:]$/;
const CLAUSE_END = /[,;]$/;

// Trọng số ~ thời lượng đọc của 1 chữ (đơn vị "ký tự tương đương")
const weightOf = (word: string): number => {
  const letters = word.replace(/[^\p{L}\p{N}]/gu, "").length;
  let w = Math.max(2, letters);
  if (SENTENCE_END.test(word)) w += 6;
  else if (CLAUSE_END.test(word)) w += 3;
  return w;
};

interface Tok {
  word: string;
  line: number;
  start: number;
  end: number;
}

const buildTokens = (entry: CaptionEntry): { lines: number; tokens: Tok[] } => {
  const rawLines = entry.text.split("\n");
  const items: { word: string; line: number; weight: number }[] = [];
  rawLines.forEach((line, li) => {
    line
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => items.push({ word, line: li, weight: weightOf(word) }));
  });

  const total = items.reduce((s, it) => s + it.weight, 0) || 1;
  const span = entry.endFrame - entry.startFrame;

  let acc = 0;
  const tokens: Tok[] = items.map((it) => {
    const start = entry.startFrame + (acc / total) * span;
    acc += it.weight;
    const end = entry.startFrame + (acc / total) * span;
    return { word: it.word, line: it.line, start, end };
  });

  return { lines: rawLines.length, tokens };
};

export const Caption: React.FC<CaptionProps> = ({ captions, offset = 0 }) => {
  const frame = useCurrentFrame() - offset;

  const active = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame,
  );
  if (!active) return null;

  const { lines, tokens } = buildTokens(active);

  const dur = active.endFrame - active.startFrame;
  const rel = frame - active.startFrame;
  const boxOpacity = interpolate(rel, [0, 5, dur - 5, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(26,18,6,0.74)",
          borderRadius: 14,
          padding: "16px 30px",
          maxWidth: "92%",
          border: `1.5px solid ${COLORS.heat}55`,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {Array.from({ length: lines }).map((_, li) => (
          <div
            key={li}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 14px",
            }}
          >
            {tokens
              .filter((t) => t.line === li)
              .map((t, i) => {
                const spoken = frame >= t.end;
                const activeWord = frame >= t.start && frame < t.end;
                const color = activeWord
                  ? COLORS.hot
                  : spoken
                    ? COLORS.cream
                    : "rgba(255,248,236,0.45)";
                return (
                  <span
                    key={i}
                    style={{
                      color,
                      fontSize: 46,
                      fontWeight: 800,
                      fontFamily: FONT,
                      lineHeight: 1.35,
                      display: "inline-block",
                      transition: "none",
                      textShadow: activeWord
                        ? `0 0 16px ${COLORS.heat}, 0 2px 10px rgba(0,0,0,0.95)`
                        : "0 2px 10px rgba(0,0,0,0.95)",
                    }}
                  >
                    {t.word}
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};
