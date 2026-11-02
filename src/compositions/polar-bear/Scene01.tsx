/**
 * Scene 01 — Hook: 800 KG
 * 0:00–0:12 (~360 frames @ 30fps → dùng 360f)
 * Voice: voice-s01.wav
 * Video: v01-polar-bear-walking.mp4, v02-polar-bear-closeup.mp4
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS01 } from "./captions";
import { ChannelHeader } from "../shared/ChannelHeader";

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Phase 1 (0–60f): gấu đi trên băng + màn đen fade in → "800 KG"
  // Phase 2 (60–180f): cut gấu cận cảnh + "LOÀI THÚ ĂN THỊT LỚN NHẤT TRÁI ĐẤT"
  // Phase 3 (180–360f): cả hai text + stat nhỏ

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background video — gấu đi trên băng */}
      <SceneBg src="assets/video/v01-polar-bear-walking.mp4" colorOverlay="rgba(0,0,0,0.5)" />

      {/* Cut sang closeup sau 2s */}
      {frame >= 60 && (
        <SceneBg src="assets/video/v02-polar-bear-closeup.mp4" colorOverlay="rgba(0,0,0,0.45)" />
      )}

      {/* Channel header — "Hồ Sơ Tự Nhiên" */}
      <ChannelHeader frame={frame} appearAt={0} position="top-left" size="md" />

      {/* Top label */}
      <TopLabel text="GẤU BẮC CỰC" frame={frame} appearAt={10} />

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Stat lớn: 800 KG */}
        <StatText
          text="800 KG"
          frame={frame}
          appearAt={20}
          color={COLORS.orange}
          size={128}
        />

        {/* Separator */}
        {frame >= 40 && (
          <div
            style={{
              width: interpolate(frame, [40, 60], [0, 300]),
              height: 3,
              backgroundColor: COLORS.iceBlue,
              opacity: fadeIn(frame, 40, 15),
            }}
          />
        )}

        {/* Sub-stat */}
        <StatText
          text="CAO 3 MÉT"
          frame={frame}
          appearAt={50}
          color={COLORS.white}
          size={72}
        />

        {/* Main claim */}
        <SubText
          text={"LOÀI THÚ ĂN THỊT\nLỚN NHẤT HÀNH TINH"}
          frame={frame}
          appearAt={90}
          color={COLORS.iceBlue}
          size={44}
        />

        {/* Không có kẻ thù */}
        <SubText
          text="Không có kẻ thù tự nhiên nào."
          frame={frame}
          appearAt={140}
          color={COLORS.white}
          size={34}
        />
      </AbsoluteFill>

      {/* Voice */}
      <VoiceTrack src="voice-s01.wav" />

      {/* Captions */}
      <Caption captions={captionsS01} />

      {/* Fade in từ đen */}
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={10} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};

// helper nội bộ
function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}
