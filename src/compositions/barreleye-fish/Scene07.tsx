/**
 * Scene 07 — Chỉ 9 lần trong 5.600 chuyến lặn · voice vo-07 (~475f)
 * Số liệu khổng lồ + số 9 cực lớn glow xanh lá.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, OffthreadVideo, staticFile } from "remotion";
import {
  COLORS,
  MarineSnow,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  scaleIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS07 from "../../research/barreleye-fish/captions/vo-07.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-07")!;

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Count-up số liệu
  const dives = Math.round(
    interpolate(frame, [80, 200], [0, 5600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const hours = Math.round(
    interpolate(frame, [140, 260], [0, 27600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Số 9 pulse mạnh
  const ninePulse = 1 + Math.sin((frame - 250) * 0.2) * 0.1;
  const nineOpacity = fadeIn(frame, 240, 20);
  const nineScale = scaleIn(frame, 240, 24);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền deep sea creature — chậm + tối */}
      {/* v03 600f × playbackRate 0.5 → 1200f, dư cho scene 495f. */}
      <OffthreadVideo
        src={staticFile("assets/video/barreleye-fish/v03-deepsea-creature.mp4")}
        muted
        playbackRate={0.5}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(2,11,24,0.78)" }} />
      <MarineSnow opacity={0.5} />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.cyan,
          letterSpacing: 4,
          textTransform: "uppercase",
          opacity: fadeIn(frame, 10, 12),
          textShadow: `0 0 16px ${COLORS.cyan}, 0 2px 8px rgba(0,0,0,0.9)`,
        }}
      >
        Cực kỳ hiếm gặp
      </div>

      {/* Middle — stats block */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Số liệu 1: 5.600+ chuyến lặn */}
        <div
          style={{
            opacity: fadeIn(frame, 80, 12),
            transform: `scale(${scaleIn(frame, 80, 12)})`,
            textAlign: "center",
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: COLORS.cream,
              lineHeight: 0.95,
              letterSpacing: "-1px",
              textShadow: `0 0 24px ${COLORS.cyan}, 0 4px 20px rgba(0,0,0,0.95)`,
            }}
          >
            {dives.toLocaleString("vi-VN")}+
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.cyan,
              marginTop: 6,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            chuyến lặn ROV
          </div>
        </div>

        {/* Số liệu 2: 27.600+ giờ */}
        <div
          style={{
            opacity: fadeIn(frame, 140, 12),
            transform: `scale(${scaleIn(frame, 140, 12)})`,
            textAlign: "center",
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: COLORS.cream,
              lineHeight: 0.95,
              letterSpacing: "-1px",
              textShadow: `0 0 24px ${COLORS.cyan}, 0 4px 20px rgba(0,0,0,0.95)`,
            }}
          >
            {hours.toLocaleString("vi-VN")}+
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.cyan,
              marginTop: 6,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            giờ ghi hình
          </div>
        </div>

        {/* Số 9 khổng lồ */}
        <div
          style={{
            marginTop: 20,
            opacity: nineOpacity,
            transform: `scale(${nineScale * ninePulse})`,
            textAlign: "center",
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.glow,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            CHỈ GẶP
          </div>
          <div
            style={{
              fontSize: 340,
              fontWeight: 900,
              color: COLORS.glow,
              lineHeight: 0.85,
              letterSpacing: "-8px",
              textShadow: `
                0 0 40px ${COLORS.glow},
                0 0 80px ${COLORS.glow},
                0 0 120px ${COLORS.highlight}88,
                0 8px 40px rgba(0,0,0,0.95)`,
            }}
          >
            9
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: COLORS.cream,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginTop: -20,
              textShadow: `0 0 20px ${COLORS.glow}, 0 4px 16px rgba(0,0,0,0.95)`,
            }}
          >
            LẦN
          </div>
        </div>
      </AbsoluteFill>

      {/* CTA bottom pill */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 340,
        }}
      >
        <Pill
          text="🎥 Video viral toàn cầu — 12/2021"
          frame={frame}
          appearAt={370}
          bg="rgba(10,37,64,0.9)"
          color={COLORS.glow}
          size={32}
        />
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-07.wav" />
      <WhisperxCaption captions={whisperxS07 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={240} volume={0.18} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
