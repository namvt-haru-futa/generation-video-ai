/**
 * PolarBearVideo — Video chính ghép 6 scene
 * Format: TikTok 9:16 — 1080×1920, 30fps
 * Tổng: 2700 frames = 90 giây
 *
 * S01:  360f (12s) — Hook
 * S02:  690f (23s) — Cỗ máy săn mồi
 * S03:  510f (17s) — Bí mật lông trắng
 * S04:  540f (18s) — Người mẹ phi thường
 * S05:  360f (12s) — Thế giới đang tan
 * S06:  240f ( 8s) — Kết
 */

import React from "react";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { linearTiming } from "@remotion/transitions";
import { Scene01 } from "./Scene01";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";
import { Scene04 } from "./Scene04";
import { Scene05 } from "./Scene05";
import { Scene06 } from "./Scene06";

// Thời lượng từng scene (frames @ 30fps)
export const SCENE_DURATIONS = {
  s01: 360,  // 12s — Hook
  s02: 690,  // 23s — Săn mồi
  s03: 510,  // 17s — Lông trắng
  s04: 540,  // 18s — Gấu mẹ
  s05: 360,  // 12s — Băng tan
  s06: 240,  //  8s — Kết
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce(
  (a, b) => a + b,
  0
); // 2700f = 90s

// Transition duration giữa các scene (frames)
const TRANSITION_DURATION = 10;

export const PolarBearVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* S01 — Hook */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s01}
        name="S01-Hook"
      >
        <Scene01 />
      </TransitionSeries.Sequence>

      {/* Hard cut S01→S02 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* S02 — Cỗ máy săn mồi */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s02}
        name="S02-Hunter"
      >
        <Scene02 />
      </TransitionSeries.Sequence>

      {/* Hard cut S02→S03 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* S03 — Bí mật lông trắng */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s03}
        name="S03-Fur"
      >
        <Scene03 />
      </TransitionSeries.Sequence>

      {/* Hard cut S03→S04 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* S04 — Người mẹ phi thường */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s04}
        name="S04-Mother"
      >
        <Scene04 />
      </TransitionSeries.Sequence>

      {/* Hard cut S04→S05 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* S05 — Thế giới đang tan */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s05}
        name="S05-Crisis"
      >
        <Scene05 />
      </TransitionSeries.Sequence>

      {/* Slow fade S05→S06 — cảm xúc */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* S06 — Kết */}
      <TransitionSeries.Sequence
        durationInFrames={SCENE_DURATIONS.s06}
        name="S06-Outro"
      >
        <Scene06 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
