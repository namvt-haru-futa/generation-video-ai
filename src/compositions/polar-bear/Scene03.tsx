/**
 * Scene 03 — Bí mật lông trắng
 * 0:35–0:52 (~510 frames)
 * Voice: voice-s03.wav
 * Image: i02-bear-walking-ice.jpg (closeup)
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SceneBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS03 } from "./captions";

// Animation "lõi lông rỗng" — infographic đơn giản
const FurDiagram: React.FC<{ frame: number; appearAt: number }> = ({
  frame,
  appearAt,
}) => {
  const opacity = fadeIn(frame, appearAt, 15);
  const progress = Math.min(
    1,
    Math.max(0, (frame - appearAt - 5) / 20)
  );

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Sợi lông — hình chữ nhật dài */}
      <div style={{ display: "flex", gap: 10 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 100,
              borderRadius: 12,
              border: `3px solid ${COLORS.white}`,
              backgroundColor: "transparent",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Lõi rỗng highlight */}
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: 8,
                backgroundColor: COLORS.iceBlue,
                opacity: 0.4 * progress,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          color: COLORS.iceBlue,
          fontSize: 22,
          fontWeight: 600,
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          opacity: progress,
        }}
      >
        Lõi rỗng → phản chiếu ánh sáng
      </div>
    </div>
  );
};

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background: ảnh gấu closeup */}
      <ImageBg
        src="assets/images/i02-bear-walking-ice.jpg"
        colorOverlay="rgba(0,0,0,0.6)"
        scale={1.05}
      />

      {frame >= 150 && (
        <SceneBg
          src="assets/video/v05-polar-bear-swimming.mp4"
          colorOverlay="rgba(0,0,0,0.5)"
        />
      )}

      <TopLabel text="BÍ MẬT" frame={frame} appearAt={5} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          paddingTop: 60,
        }}
      >
        {/* Reveal headline */}
        <StatText
          text={"LÔNG KHÔNG\nPHẢI MÀU TRẮNG"}
          frame={frame}
          appearAt={10}
          color={COLORS.white}
          size={82}
        />

        {/* Diagram */}
        <FurDiagram frame={frame} appearAt={50} />

        {/* Da đen */}
        {frame >= 80 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: fadeIn(frame, 80, 12),
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#111",
                border: "3px solid #fff",
              }}
            />
            <SubText
              text="Da đen — hấp thụ nhiệt mặt trời"
              frame={frame}
              appearAt={80}
              color={COLORS.white}
              size={34}
            />
          </div>
        )}

        {/* Mỡ 10cm */}
        {frame >= 130 && (
          <StatText
            text="MỠ DÀY 10 CM"
            frame={frame}
            appearAt={130}
            color={COLORS.orange}
            size={80}
          />
        )}

        {/* Rũ một cái, khô ngay */}
        {frame >= 200 && (
          <SubText
            text={"Sau khi bơi lên —\nrũ một cái, khô ngay."}
            frame={frame}
            appearAt={200}
            color={COLORS.iceBlue}
            size={38}
          />
        )}
      </AbsoluteFill>

      <VoiceTrack src="voice-s03.wav" />
      <Caption captions={captionsS03} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
