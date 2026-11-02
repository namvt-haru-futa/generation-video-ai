/**
 * Scene 06 — Kẻ trộm mồi của biển sâu · voice vo-06 (~492f)
 * Cá lơ lửng dưới xúc tu sứa dây, giật con mồi.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  COLORS,
  SceneBg,
  MarineSnow,
  StatText,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS06 from "../../research/barreleye-fish/captions/vo-06.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-06")!;

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Đường quét ánh sáng khi vòm chống xúc tu — pulse ở phần cuối
  const shieldPulse = interpolate(
    frame,
    [280, 320, 360, 400],
    [0, 1, 0.4, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền: video siphonophore NOAA (817f, đủ cho scene 512f — không cần loop) */}
      <SceneBg
        src="assets/video/barreleye-fish/v02-siphonophore.mp4"
        colorOverlay="rgba(2,11,24,0.55)"
        playbackRate={0.85}
      />
      <MarineSnow opacity={0.25} />

      {/* Title lớn ở trên */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: fadeIn(frame, 20, 12),
            textShadow: `0 0 16px ${COLORS.cyan}, 0 2px 8px rgba(0,0,0,0.9)`,
          }}
        >
          Cách nó kiếm ăn
        </div>
        <div style={{ height: 14 }} />
        <StatText
          text="KẺ TRỘM"
          frame={frame}
          appearAt={40}
          color={COLORS.glow}
          size={130}
          glow
        />
        <div style={{ height: 4 }} />
        <StatText
          text="CỦA BIỂN SÂU"
          frame={frame}
          appearAt={80}
          color={COLORS.cream}
          size={64}
        />
      </div>

      {/* Info card ở dưới */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 340,
          gap: 20,
        }}
      >
        {/* Card giải thích */}
        <div
          style={{
            width: "88%",
            padding: "22px 28px",
            backgroundColor: "rgba(2,11,24,0.75)",
            borderRadius: 20,
            border: `1.5px solid ${COLORS.glow}66`,
            boxShadow: `0 0 24px ${COLORS.glow}22`,
            opacity: fadeIn(frame, 160, 15),
            transform: `translateY(${(1 - fadeIn(frame, 160, 15)) * 30}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 800,
              color: COLORS.cream,
              textAlign: "center",
              lineHeight: 1.35,
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            Cướp mồi từ xúc tu{" "}
            <span style={{ color: COLORS.glow }}>sứa dây</span>
          </div>
          <div style={{ height: 12 }} />
          <div
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 600,
              color: COLORS.cyan,
              textAlign: "center",
              lineHeight: 1.3,
              opacity: 0.9,
            }}
          >
            Mái vòm trong suốt = tấm khiên chống chất độc
          </div>
        </div>

        <Pill
          text="🛡 Vòm bảo vệ đôi mắt khỏi chích độc"
          frame={frame}
          appearAt={280}
          bg={`rgba(10,37,64,${0.7 + shieldPulse * 0.2})`}
          color={COLORS.glow}
          size={32}
          glow
        />
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-06.wav" />
      <WhisperxCaption captions={whisperxS06 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={20} volume={0.14} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
