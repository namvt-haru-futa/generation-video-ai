/**
 * Scene 02 — Bị nghi là trò lừa + đẻ trứng (~470f @30fps)
 * Voice: voice-02-hoax-eggs.wav
 * Ảnh: i03 (mỏ), i02 (Gould 1863 sketch — hoax), i04 (Broken River)
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SubText,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  scaleIn,
} from "./shared";
import { FONT } from "./fonts";
import { Caption } from "./Caption";
import { captionsS02 } from "./captions";

const P2 = 150; // sang sketch
const P3 = 300; // sang broken river

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Phase 1 — cận mỏ (mô tả cơ thể ghép) */}
      {frame < P2 && (
        <ImageBg
          src="assets/images/platypus/i03-platypus-bill-closeup.jpg"
          frame={frame}
          colorOverlay="rgba(9,20,34,0.4)"
          duration={P2}
        />
      )}

      {/* Phase 2 — tranh Gould 1863 (hoax) */}
      {frame >= P2 && frame < P3 && (
        <ImageBg
          src="assets/images/platypus/i02-gould-1863-sketch.jpg"
          frame={frame - P2}
          colorOverlay="rgba(20,14,6,0.35)"
          from={1.02}
          to={1.12}
          duration={P3 - P2}
        />
      )}

      {/* Phase 3 — bơi ở Broken River */}
      {frame >= P3 && (
        <ImageBg
          src="assets/images/platypus/i04-platypus-broken-river.jpg"
          frame={frame - P3}
          colorOverlay="rgba(9,20,34,0.45)"
          duration={durationInFrames - P3}
        />
      )}

      {/* Phase 1 — pills mô tả */}
      {frame < P2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 22,
          }}
        >
          <Pill text="MỎ NHƯ VỊT" frame={frame} appearAt={8} bg={COLORS.cyan} />
          <Pill text="ĐUÔI NHƯ HẢI LY" frame={frame} appearAt={40} bg={COLORS.cream} />
          <Pill text="CHÂN NHƯ RÁI CÁ" frame={frame} appearAt={72} bg={COLORS.gold} />
        </AbsoluteFill>
      )}

      {/* Phase 2 — con dấu HOAX */}
      {frame >= P2 && frame < P3 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              transform: `rotate(-12deg) scale(${scaleIn(frame, P2 + 10, 10)})`,
              opacity: fadeIn(frame, P2 + 10, 8),
              border: `6px solid ${COLORS.red}`,
              color: COLORS.red,
              fontSize: 96,
              fontWeight: 900,
              fontFamily: FONT,
              padding: "12px 48px",
              borderRadius: 12,
              letterSpacing: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            HUH?
          </div>
          <div style={{ height: 30 }} />
          <SubText
            text="Khoa học từng nghĩ đây là đồ giả"
            frame={frame}
            appearAt={P2 + 40}
            color={COLORS.white}
            size={40}
          />
        </AbsoluteFill>
      )}

      {/* Phase 3 — reveal đẻ trứng */}
      {frame >= P3 && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
        >
          <SubText
            text="Nhưng có thật —"
            frame={frame}
            appearAt={P3 + 10}
            color={COLORS.cyan}
            size={46}
          />
          <SubText
            text={"ĐỘNG VẬT CÓ VÚ\nLẠI ĐẺ TRỨNG"}
            frame={frame}
            appearAt={P3 + 45}
            color={COLORS.white}
            size={68}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/platypus/voice-02-hoax-eggs.wav" />
      <Caption captions={captionsS02} />
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={6}
      />
    </AbsoluteFill>
  );
};
