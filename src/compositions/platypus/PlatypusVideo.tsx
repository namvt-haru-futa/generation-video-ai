/**
 * PlatypusVideo — Video chính ghép 6 scene
 * Format: TikTok 9:16 — 1080×1920, 30fps
 *
 * ChannelHeader ("Hồ Sơ Tự Nhiên" — logo thật) render Ở CẤP COMPOSITION,
 * phủ đè lên toàn bộ TransitionSeries → hiển thị XUYÊN SUỐT cả video.
 *
 * S01 420f · S02 470f · S03 400f · S04 486f · S05 440f · S06 446f
 * Trừ 5 transition × 12f = 60f overlap.
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  Audio,
  staticFile,
  interpolate,
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

export const SCENE_DURATIONS = {
  s01: 420,
  s02: 470,
  s03: 400,
  s04: 486,
  s05: 440,
  s06: 446,
} as const;

const TRANSITION = 12;
const N_TRANSITIONS = 5;

export const TOTAL_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  TRANSITION * N_TRANSITIONS; // 2662 - 60 = 2602f ≈ 86.7s

// Header cố định — dùng frame toàn cục để animation chạy 1 lần rồi giữ nguyên
const PersistentHeader: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <ChannelHeader
      frame={frame}
      appearAt={0}
      position="top-left"
      size="md"
      logoSrc="assets/images/header/icon-header.webp"
    />
  );
};

// Nhạc nền — âm lượng nhỏ làm bed, fade in đầu / fade out cuối
const BackgroundMusic: React.FC = () => (
  <Audio
    src={staticFile("assets/background/background-1.mp3")}
    volume={(f) =>
      interpolate(
        f,
        [0, 30, TOTAL_FRAMES - 45, TOTAL_FRAMES],
        [0, 0.12, 0.12, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    }
  />
);

export const PlatypusVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Nhạc nền xuyên suốt (dưới giọng đọc) */}
      <BackgroundMusic />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s01} name="S01-Hook">
          <Scene01 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s02} name="S02-Hoax">
          <Scene02 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s03} name="S03-Electro">
          <Scene03 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s04} name="S04-Venom">
          <Scene04 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s05} name="S05-Genome">
          <Scene05 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.s06} name="S06-Outro">
          <Scene06 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Header logo — xuyên suốt toàn video */}
      <PersistentHeader />
    </AbsoluteFill>
  );
};
