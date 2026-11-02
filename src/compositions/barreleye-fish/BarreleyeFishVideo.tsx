/**
 * BarreleyeFishVideo — Video chính ghép 8 scene
 * Format: TikTok 9:16 — 1080×1920, 30fps
 *
 * Thời lượng scene = voice thực đo + 20f đệm end.
 * Trừ 7 transition × 15f overlap (fade mềm).
 */
import React from "react";
import {
  AbsoluteFill,
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

// Voice thực đo (frame @30fps) + 20f pad end mỗi scene
export const SCENE_DURATIONS = {
  s01: 447, // 427 + 20
  s02: 450, // 430 + 20
  s03: 447, // 427 + 20
  s04: 452, // 432 + 20
  s05: 632, // 612 + 20
  s06: 512, // 492 + 20
  s07: 495, // 475 + 20
  s08: 298, // 278 + 20
} as const;

const TRANSITION = 15;
const N_TRANSITIONS = 7;

export const TOTAL_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  TRANSITION * N_TRANSITIONS; // 3733 - 105 = 3628f ≈ 120.9s

const fadeT = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION })}
  />
);

// Header kênh cố định — hiển thị xuyên suốt video
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

export const BarreleyeFishVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s01}
          name="S01-Hook"
        >
          <Scene01 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s02}
          name="S02-TransparentHead"
        >
          <Scene02 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s03}
          name="S03-NotEyes"
        >
          <Scene03 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s04}
          name="S04-Habitat"
        >
          <Scene04 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s05}
          name="S05-Mystery"
        >
          <Scene05 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s06}
          name="S06-Thief"
        >
          <Scene06 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s07}
          name="S07-Rare"
        >
          <Scene07 />
        </TransitionSeries.Sequence>
        {fadeT()}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.s08}
          name="S08-Outro"
        >
          <Scene08 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Header kênh — overlay xuyên suốt */}
      <PersistentHeader />
    </AbsoluteFill>
  );
};
