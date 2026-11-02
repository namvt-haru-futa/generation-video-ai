/**
 * DeathValleyVideo — Video chính ghép 8 scene
 * Format: TikTok 9:16 — 1080×1920, 30fps
 *
 * Thời lượng scene = voice + ~20f đệm. Trừ 7 transition × 15f overlap.
 * Scene 1 = Cesium (zoom vũ trụ → flythrough). Scene 2–8 = ảnh + Ken Burns.
 */
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ChannelHeader } from "../shared/ChannelHeader";
import { Scene01 } from "./Scene01";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";
import { Scene04 } from "./Scene04";
import { Scene05 } from "./Scene05";
import { Scene06 } from "./Scene06";
import { Scene07 } from "./Scene07";
import { Scene08 } from "./Scene08";

export const SCENE_DURATIONS = {
  s01: 392,
  s02: 557,
  s03: 572,
  s04: 599,
  s05: 641,
  s06: 755,
  s07: 506,
  s08: 383,
} as const;

const TRANSITION = 15;
const N_TRANSITIONS = 7;

export const TOTAL_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  TRANSITION * N_TRANSITIONS; // 4405 - 105 = 4300f ≈ 143.3s

// Độ dài track nhạc nền (background-2.mp3 = 94.03s @30fps ≈ 2821f)
const MUSIC_LEN = 2820;

// Fade theo frame TOÀN CỤC: fade in đầu, giữ 0.1, fade out cuối
const musicVolume = (globalFrame: number) =>
  interpolate(
    globalFrame,
    [0, 30, TOTAL_FRAMES - 60, TOTAL_FRAMES],
    [0, 0.1, 0.1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

// Nhạc nền phủ kín video: lần 1 (0→~94s) + lần 2 nối tiếp cho khúc sau.
// Mỗi <Audio> nhận volume theo frame cục bộ nên cộng offset để khớp fade toàn cục.
const BackgroundMusic: React.FC = () => (
  <>
    <Audio
      src={staticFile("assets/background/background-2.mp3")}
      volume={(f) => musicVolume(f)}
    />
    <Sequence from={MUSIC_LEN}>
      <Audio
        src={staticFile("assets/background/background-2.mp3")}
        volume={(f) => musicVolume(f + MUSIC_LEN)}
      />
    </Sequence>
  </>
);

const fadeT = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION })}
  />
);

// Header kênh cố định — hiển thị xuyên suốt video (dùng frame toàn cục)
const PersistentHeader: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ChannelHeader
      frame={frame}
      appearAt={0}
      position="top-left"
      size="md"
      channelName="Hồ Sơ Tự Nhiên"
    />
  );
};

export const DeathValleyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <BackgroundMusic />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s01} name="S01-Hook">
          <Scene01 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s02} name="S02-Hottest">
          <Scene02 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s03} name="S03-Lowest">
          <Scene03 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s04} name="S04-Driest">
          <Scene04 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s05} name="S05-Name">
          <Scene05 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s06} name="S06-Life">
          <Scene06 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s07} name="S07-People">
          <Scene07 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s08} name="S08-Outro">
          <Scene08 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Header kênh — overlay xuyên suốt toàn video */}
      <PersistentHeader />
    </AbsoluteFill>
  );
};
