/**
 * Caption component — hiển thị phụ đề đồng bộ giọng đọc
 * Đặt ở cuối màn hình, text ngắn gọn tối đa 2 dòng
 */

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CaptionEntry } from "./captions";
import { COLORS } from "./shared";

interface CaptionProps {
  captions: CaptionEntry[];
  /** Offset frame nếu caption bắt đầu muộn hơn scene (mặc định 0) */
  offset?: number;
}

export const Caption: React.FC<CaptionProps> = ({ captions, offset = 0 }) => {
  const frame = useCurrentFrame() - offset;

  // Tìm caption active tại frame hiện tại
  const active = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!active) return null;

  // Fade in 6f đầu, fade out 6f cuối của từng caption
  const captionFrame = frame - active.startFrame;
  const duration = active.endFrame - active.startFrame;
  const opacity = interpolate(
    captionFrame,
    [0, 6, duration - 6, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 40px",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.72)",
          borderRadius: 12,
          padding: "14px 28px",
          maxWidth: "90%",
        }}
      >
        {active.text.split("\n").map((line, i) => (
          <div
            key={i}
            style={{
              color: COLORS.white,
              fontSize: 44,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              lineHeight: 1.35,
              whiteSpace: "pre-wrap",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
