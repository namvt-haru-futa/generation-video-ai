/**
 * Scene 01 — Hook: Xuống biển sâu · voice vo-01 (~427f)
 * Camera lao xuống nước, đồng hồ đo độ sâu 100→800m, cá hiện ra.
 */
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  OffthreadVideo,
  staticFile,
} from "remotion";
import {
  COLORS,
  MarineSnow,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  slideUp,
  scaleIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS01 from "../../research/barreleye-fish/captions/vo-01.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-01")!;

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Đồng hồ đo độ sâu — count-up 100 → 800m trong 250f đầu
  const depth = Math.round(
    interpolate(frame, [0, 250], [80, 800], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Fade tối theo độ sâu — càng xuống sâu càng tối
  const darkness = interpolate(frame, [0, 250], [0.2, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title reveal khi camera dừng ở 700m (~frame 240)
  const titleOpacity = fadeIn(frame, 240, 15);
  const titleY = slideUp(frame, 240, 20);
  const titleScale = scaleIn(frame, 240, 15);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền video deep-sea creature (chậm 0.6x cho mượt).
          v03 dài 600f, playbackRate 0.6 → hiệu quả 1000f, dư cho scene 447f. */}
      <OffthreadVideo
        src={staticFile("assets/video/barreleye-fish/v03-deepsea-creature.mp4")}
        muted
        playbackRate={0.6}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Overlay tối dần theo độ sâu */}
      <AbsoluteFill
        style={{ backgroundColor: `rgba(2,11,24,${darkness})` }}
      />

      {/* Marine snow particles */}
      <MarineSnow opacity={0.5} />

      {/* Đồng hồ đo độ sâu — top-right */}
      <div
        style={{
          position: "absolute",
          top: 210,
          right: 60,
          padding: "12px 22px",
          borderRadius: 14,
          backgroundColor: "rgba(2,11,24,0.75)",
          border: `1.5px solid ${COLORS.cyan}55`,
          fontFamily: FONT,
          textAlign: "right",
          opacity: fadeIn(frame, 8, 10),
          boxShadow: `0 0 20px ${COLORS.cyan}33`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Độ sâu
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.glow,
            fontFamily: FONT,
            textShadow: `0 0 20px ${COLORS.glow}, 0 0 40px ${COLORS.glow}66`,
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          {depth}
          <span style={{ fontSize: 32, marginLeft: 4 }}>m</span>
        </div>
      </div>

      {/* Title reveal */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 130,
            fontWeight: 900,
            color: COLORS.cream,
            textAlign: "center",
            lineHeight: 0.95,
            letterSpacing: "-2px",
            textShadow: `0 0 40px ${COLORS.glow}, 0 6px 30px rgba(0,0,0,0.95)`,
          }}
        >
          CÁ MẮT
          <br />
          <span
            style={{
              color: COLORS.glow,
              textShadow: `0 0 60px ${COLORS.glow}, 0 0 30px ${COLORS.glow}`,
            }}
          >
            VÒM
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 400,
            fontStyle: "italic",
            color: COLORS.cyan,
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
            letterSpacing: 1.5,
          }}
        >
          Macropinna microstoma
        </div>
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-01.wav" />
      <WhisperxCaption captions={whisperxS01 as RemotionCaption[]} />

      {/* SFX hook — chime khi title landing (~frame 245) */}
      <SceneSfx scene={sceneData} fromFrame={245} volume={0.22} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={10}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
