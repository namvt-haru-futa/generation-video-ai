/**
 * Scene 08 — Kết & CTA · voice vo-08 (~278f)
 * Cá bơi biến mất vào bóng tối. Logo kênh + CTA.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, OffthreadVideo, staticFile } from "remotion";
import {
  COLORS,
  MarineSnow,
  StatText,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS08 from "../../research/barreleye-fish/captions/vo-08.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-08")!;

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade video tối dần
  const videoDim = interpolate(
    frame,
    [0, 100, durationInFrames],
    [0.55, 0.7, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền deep sea — chậm nhất */}
      {/* v03 600f × playbackRate 0.4 → 1500f, dư cho scene 298f. */}
      <OffthreadVideo
        src={staticFile("assets/video/barreleye-fish/v03-deepsea-creature.mp4")}
        muted
        playbackRate={0.4}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(2,11,24,${videoDim})` }} />
      <MarineSnow opacity={0.4} />

      {/* HỒ SƠ #01 — HOÀN TẤT */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 200,
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: fadeIn(frame, 5, 12),
            textShadow: `0 0 16px ${COLORS.cyan}, 0 2px 8px rgba(0,0,0,0.9)`,
          }}
        >
          Hồ Sơ #01
        </div>

        <StatText
          text="CÁ MẮT VÒM"
          frame={frame}
          appearAt={20}
          color={COLORS.glow}
          size={110}
          glow
        />

        <div style={{ height: 8 }} />

        <div
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontStyle: "italic",
            fontWeight: 400,
            color: COLORS.cyan,
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            opacity: fadeIn(frame, 80, 15),
            padding: "0 60px",
          }}
        >
          Còn triệu bí mật khác đang chờ
          <br />
          dưới đại dương…
        </div>

        <div style={{ height: 40 }} />

        <Pill
          text="🔍 Theo dõi để mở hồ sơ tiếp theo"
          frame={frame}
          appearAt={150}
          bg={COLORS.glow}
          color={COLORS.darkBg}
          size={40}
          glow
        />
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-08.wav" />
      <WhisperxCaption captions={whisperxS08 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={20} volume={0.2} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={16}
      />
    </AbsoluteFill>
  );
};
