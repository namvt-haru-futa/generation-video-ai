/**
 * Scene 05 — Phát sáng UV + bộ gen dị nhất (~440f @30fps)
 * Voice: voice-05-uv-genome.wav
 * Ảnh: i03 (lông/mỏ) + hiệu ứng glow cyan tự tạo (KHÔNG dùng ảnh nghiên cứu có bản quyền)
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import {
  COLORS,
  SubText,
  Pill,
  StatText,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  scaleIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS05 } from "./captions";

const GENOME = 230; // chuyển sang phần nhiễm sắc thể

const ChromoDots: React.FC<{ n: number; color: string }> = ({ n, color }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(n, 5)}, 1fr)`,
      gap: 8,
      justifyItems: "center",
    }}
  >
    {Array.from({ length: n }).map((_, i) => (
      <div
        key={i}
        style={{
          width: 18,
          height: 46,
          borderRadius: 9,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    ))}
  </div>
);

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Glow UV nhấp nháy
  const glow = interpolate(
    Math.sin((frame / 12) * Math.PI),
    [-1, 1],
    [0.35, 0.8]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Phần phát sáng UV */}
      {frame < GENOME && (
        <>
          <AbsoluteFill style={{ overflow: "hidden" }}>
            <Img
              src={staticFile("assets/images/platypus/i03-platypus-bill-closeup.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${interpolate(frame, [0, GENOME], [1.05, 1.15], { extrapolateRight: "clamp" })})`,
                filter: "brightness(0.5) saturate(1.4) hue-rotate(120deg)",
              }}
            />
            {/* Lớp glow cyan */}
            <AbsoluteFill
              style={{
                background: `radial-gradient(circle at 50% 45%, ${COLORS.cyan}, transparent 60%)`,
                mixBlendMode: "screen",
                opacity: glow,
              }}
            />
            <AbsoluteFill style={{ backgroundColor: "rgba(9,20,34,0.35)" }} />
          </AbsoluteFill>

          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
          >
            <Pill
              text="✨ PHÁT HIỆN 2020"
              frame={frame}
              appearAt={12}
              bg={COLORS.gold}
              color={COLORS.darkBg}
            />
            <StatText
              text={"PHÁT SÁNG\nDƯỚI TIA UV"}
              frame={frame}
              appearAt={45}
              color={COLORS.cyan}
              size={78}
            />
            <SubText
              text="Đến giờ chưa ai lý giải được tại sao"
              frame={frame}
              appearAt={150}
              color={COLORS.white}
              size={38}
            />
          </AbsoluteFill>
        </>
      )}

      {/* Phần bộ gen — 10 nhiễm sắc thể */}
      {frame >= GENOME && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            padding: "0 40px",
          }}
        >
          {/* Người: 2 */}
          <div
            style={{
              opacity: fadeIn(frame, GENOME + 10, 10),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <SubText text="Con người" frame={frame} appearAt={GENOME + 10} color={COLORS.cream} size={40} />
            <ChromoDots n={2} color={COLORS.cream} />
            <StatText text="2" frame={frame} appearAt={GENOME + 10} color={COLORS.cream} size={80} />
          </div>

          {/* vs */}
          <div
            style={{
              color: COLORS.white,
              fontSize: 34,
              fontWeight: 800,
              opacity: fadeIn(frame, GENOME + 40, 8),
            }}
          >
            so với
          </div>

          {/* Thú mỏ vịt: 10 */}
          <div
            style={{
              transform: `scale(${scaleIn(frame, GENOME + 70, 12)})`,
              opacity: fadeIn(frame, GENOME + 70, 10),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <SubText text="Thú mỏ vịt" frame={frame} appearAt={GENOME + 70} color={COLORS.cyan} size={44} />
            <ChromoDots n={10} color={COLORS.cyan} />
            <StatText text="10" frame={frame} appearAt={GENOME + 70} color={COLORS.cyan} size={110} />
            <SubText text="nhiễm sắc thể giới tính" frame={frame} appearAt={GENOME + 90} color={COLORS.white} size={36} />
          </div>
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/platypus/voice-05-uv-genome.wav" />
      <Caption captions={captionsS05} />
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={6}
      />
    </AbsoluteFill>
  );
};
