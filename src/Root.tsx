import React from "react";
import "./index.css";
import { Composition, Folder } from "remotion";
import { PolarBearVideo, SCENE_DURATIONS } from "./compositions/polar-bear/PolarBearVideo";
import { Scene01 } from "./compositions/polar-bear/Scene01";
import { Scene02 } from "./compositions/polar-bear/Scene02";
import { Scene03 } from "./compositions/polar-bear/Scene03";
import { Scene04 } from "./compositions/polar-bear/Scene04";
import { Scene05 } from "./compositions/polar-bear/Scene05";
import { Scene06 } from "./compositions/polar-bear/Scene06";
import {
  PlatypusVideo,
  SCENE_DURATIONS as PLATYPUS_DURATIONS,
  TOTAL_FRAMES as PLATYPUS_TOTAL,
} from "./compositions/platypus/PlatypusVideo";
import { Scene01 as PScene01 } from "./compositions/platypus/Scene01";
import { Scene02 as PScene02 } from "./compositions/platypus/Scene02";
import { Scene03 as PScene03 } from "./compositions/platypus/Scene03";
import { Scene04 as PScene04 } from "./compositions/platypus/Scene04";
import { Scene05 as PScene05 } from "./compositions/platypus/Scene05";
import { Scene06 as PScene06 } from "./compositions/platypus/Scene06";
import {
  DeathValleyVideo,
  SCENE_DURATIONS as DV_DURATIONS,
  TOTAL_FRAMES as DV_TOTAL,
} from "./compositions/death-valley/DeathValleyVideo";
import { Scene01 as DVScene01 } from "./compositions/death-valley/Scene01";
import { Scene01Cesium } from "./compositions/death-valley/Scene01Cesium";
import { Scene02 as DVScene02 } from "./compositions/death-valley/Scene02";
import { Scene03 as DVScene03 } from "./compositions/death-valley/Scene03";
import { Scene04 as DVScene04 } from "./compositions/death-valley/Scene04";
import { Scene05 as DVScene05 } from "./compositions/death-valley/Scene05";
import { Scene06 as DVScene06 } from "./compositions/death-valley/Scene06";
import { Scene07 as DVScene07 } from "./compositions/death-valley/Scene07";
import { Scene08 as DVScene08 } from "./compositions/death-valley/Scene08";
import {
  BarreleyeFishVideo,
  SCENE_DURATIONS as BF_DURATIONS,
  TOTAL_FRAMES as BF_TOTAL,
} from "./compositions/barreleye-fish/BarreleyeFishVideo";
import { Scene01 as BFScene01 } from "./compositions/barreleye-fish/Scene01";
import { Scene02 as BFScene02 } from "./compositions/barreleye-fish/Scene02";
import { Scene03 as BFScene03 } from "./compositions/barreleye-fish/Scene03";
import { Scene04 as BFScene04 } from "./compositions/barreleye-fish/Scene04";
import { Scene05 as BFScene05 } from "./compositions/barreleye-fish/Scene05";
import { Scene06 as BFScene06 } from "./compositions/barreleye-fish/Scene06";
import { Scene07 as BFScene07 } from "./compositions/barreleye-fish/Scene07";
import { Scene08 as BFScene08 } from "./compositions/barreleye-fish/Scene08";

// TikTok 9:16
const W = 1080;
const H = 1920;
const FPS = 30;

// Tổng thời lượng (bù trừ transition overlap: 5 transitions × 10f = 50f, 1 transition × 20f = 20f)
const TOTAL = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) - 70;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Video chính ─────────────────────────────────────── */}
      <Composition
        id="PolarBear"
        component={PolarBearVideo}
        durationInFrames={TOTAL}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* ── Từng scene để preview/debug trong Studio ────────── */}
      <Folder name="PolarBear-Scenes">
        <Composition
          id="S01-Hook"
          component={Scene01}
          durationInFrames={SCENE_DURATIONS.s01}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="S02-Hunter"
          component={Scene02}
          durationInFrames={SCENE_DURATIONS.s02}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="S03-Fur"
          component={Scene03}
          durationInFrames={SCENE_DURATIONS.s03}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="S04-Mother"
          component={Scene04}
          durationInFrames={SCENE_DURATIONS.s04}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="S05-Crisis"
          component={Scene05}
          durationInFrames={SCENE_DURATIONS.s05}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="S06-Outro"
          component={Scene06}
          durationInFrames={SCENE_DURATIONS.s06}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>

      {/* ── Video Thú Mỏ Vịt ────────────────────────────────── */}
      <Composition
        id="Platypus"
        component={PlatypusVideo}
        durationInFrames={PLATYPUS_TOTAL}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* ── Video Thung Lũng Chết ───────────────────────────── */}
      <Composition
        id="DeathValley"
        component={DeathValleyVideo}
        durationInFrames={DV_TOTAL}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* ── Video Cá Mắt Vòm ────────────────────────────────── */}
      <Composition
        id="BarreleyeFish"
        component={BarreleyeFishVideo}
        durationInFrames={BF_TOTAL}
        fps={FPS}
        width={W}
        height={H}
      />

      <Folder name="BarreleyeFish-Scenes">
        <Composition id="BF-S01-Hook" component={BFScene01} durationInFrames={BF_DURATIONS.s01} fps={FPS} width={W} height={H} />
        <Composition id="BF-S02-TransparentHead" component={BFScene02} durationInFrames={BF_DURATIONS.s02} fps={FPS} width={W} height={H} />
        <Composition id="BF-S03-NotEyes" component={BFScene03} durationInFrames={BF_DURATIONS.s03} fps={FPS} width={W} height={H} />
        <Composition id="BF-S04-Habitat" component={BFScene04} durationInFrames={BF_DURATIONS.s04} fps={FPS} width={W} height={H} />
        <Composition id="BF-S05-Mystery" component={BFScene05} durationInFrames={BF_DURATIONS.s05} fps={FPS} width={W} height={H} />
        <Composition id="BF-S06-Thief" component={BFScene06} durationInFrames={BF_DURATIONS.s06} fps={FPS} width={W} height={H} />
        <Composition id="BF-S07-Rare" component={BFScene07} durationInFrames={BF_DURATIONS.s07} fps={FPS} width={W} height={H} />
        <Composition id="BF-S08-Outro" component={BFScene08} durationInFrames={BF_DURATIONS.s08} fps={FPS} width={W} height={H} />
      </Folder>

      <Folder name="DeathValley-Scenes">
        <Composition id="DV-S01-CesiumBG" component={Scene01Cesium} durationInFrames={DV_DURATIONS.s01} fps={FPS} width={W} height={H} />
        <Composition id="DV-S01-Hook" component={DVScene01} durationInFrames={DV_DURATIONS.s01} fps={FPS} width={W} height={H} />
        <Composition id="DV-S02-Hottest" component={DVScene02} durationInFrames={DV_DURATIONS.s02} fps={FPS} width={W} height={H} />
        <Composition id="DV-S03-Lowest" component={DVScene03} durationInFrames={DV_DURATIONS.s03} fps={FPS} width={W} height={H} />
        <Composition id="DV-S04-Driest" component={DVScene04} durationInFrames={DV_DURATIONS.s04} fps={FPS} width={W} height={H} />
        <Composition id="DV-S05-Name" component={DVScene05} durationInFrames={DV_DURATIONS.s05} fps={FPS} width={W} height={H} />
        <Composition id="DV-S06-Life" component={DVScene06} durationInFrames={DV_DURATIONS.s06} fps={FPS} width={W} height={H} />
        <Composition id="DV-S07-People" component={DVScene07} durationInFrames={DV_DURATIONS.s07} fps={FPS} width={W} height={H} />
        <Composition id="DV-S08-Outro" component={DVScene08} durationInFrames={DV_DURATIONS.s08} fps={FPS} width={W} height={H} />
      </Folder>

      <Folder name="Platypus-Scenes">
        <Composition
          id="P-S01-Hook"
          component={PScene01}
          durationInFrames={PLATYPUS_DURATIONS.s01}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="P-S02-Hoax"
          component={PScene02}
          durationInFrames={PLATYPUS_DURATIONS.s02}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="P-S03-Electro"
          component={PScene03}
          durationInFrames={PLATYPUS_DURATIONS.s03}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="P-S04-Venom"
          component={PScene04}
          durationInFrames={PLATYPUS_DURATIONS.s04}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="P-S05-Genome"
          component={PScene05}
          durationInFrames={PLATYPUS_DURATIONS.s05}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="P-S06-Outro"
          component={PScene06}
          durationInFrames={PLATYPUS_DURATIONS.s06}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>
    </>
  );
};
