/**
 * Scene 05 — Thế giới đang tan
 * 1:10–1:22 (~360 frames)
 * Voice: voice-s05.wav
 * Video: v06-arctic-ice-floating.mp4, v07-iceberg.mp4, v08-mountains-ice.mp4
 * Image: i05-bears-melting-arctic.jpg
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
  ImageBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS05 } from "./captions";

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Tone tối hơn, lạnh hơn các scene trước
  return (
    <AbsoluteFill style={{ backgroundColor: "#050D1A" }}>
      {/* Phase 1: băng trôi */}
      <SceneBg
        src="assets/video/v06-arctic-ice-floating.mp4"
        colorOverlay="rgba(5,13,26,0.6)"
      />

      {/* Phase 2: iceberg */}
      {frame >= 90 && (
        <SceneBg
          src="assets/video/v07-iceberg.mp4"
          colorOverlay="rgba(5,13,26,0.55)"
        />
      )}

      {/* Phase 3: 3 gấu trên băng tan */}
      {frame >= 200 && (
        <ImageBg
          src="assets/images/i05-bears-melting-arctic.jpg"
          colorOverlay="rgba(5,13,26,0.65)"
        />
      )}

      <TopLabel text="NGUY CƠ" frame={frame} appearAt={5} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {/* Mỗi năm băng tan sớm hơn */}
        <SubText
          text={"Mỗi năm băng tan sớm hơn."}
          frame={frame}
          appearAt={10}
          color={COLORS.white}
          size={40}
        />

        {/* Logic chain */}
        {frame >= 50 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              opacity: fadeIn(frame, 50, 12),
              alignItems: "center",
            }}
          >
            {[
              "Không có băng →",
              "Không săn được →",
              "Chết đói.",
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  color: i === 2 ? COLORS.red : COLORS.iceBlue,
                  fontSize: i === 2 ? 50 : 40,
                  fontWeight: i === 2 ? 900 : 600,
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  textAlign: "center",
                  textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  opacity: Math.min(1, Math.max(0, (frame - 50 - i * 20) / 12)),
                }}
              >
                {line}
              </div>
            ))}
          </div>
        )}

        {/* 26.000 counter */}
        {frame >= 160 && (
          <>
            <SubText
              text="Toàn thế giới còn lại:"
              frame={frame}
              appearAt={160}
              color={COLORS.white}
              size={36}
            />
            <StatText
              text="26.000"
              frame={frame}
              appearAt={175}
              color={COLORS.orange}
              size={130}
            />
            <SubText
              text="con. Và đang giảm."
              frame={frame}
              appearAt={210}
              color={COLORS.red}
              size={44}
            />
          </>
        )}

        {/* Gấu đơn độc trên tảng băng */}
        {frame >= 270 && (
          <SubText
            text={"Gấu đứng trên tảng băng\ncuối cùng."}
            frame={frame}
            appearAt={270}
            color={COLORS.iceBlue}
            size={34}
          />
        )}
      </AbsoluteFill>

      <VoiceTrack src="voice-s05.wav" />
      <Caption captions={captionsS05} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={10} />
    </AbsoluteFill>
  );
};
