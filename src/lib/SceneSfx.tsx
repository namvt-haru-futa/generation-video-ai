import React from "react";
import { Audio, Sequence } from "remotion";
import { resolveSfx, type SfxScene } from "./sfx-selector";

/**
 * Component tiện dụng — resolve SFX theo `scene` và render <Audio/>
 * đặt trong <Sequence from={fromFrame}> để trigger tại đúng frame.
 *
 * Ví dụ đơn giản (SFX phát ngay khi scene bắt đầu):
 *   <SceneSfx scene={{ id: "vo-02", voiceText: "..." }} />
 *
 * Đặt SFX phát trễ 12 frame (0.4s sau khi voice bắt đầu):
 *   <SceneSfx scene={...} fromFrame={12} />
 *
 * Ghi đè volume nếu cần:
 *   <SceneSfx scene={...} volume={0.25} />
 *
 * Muốn debug thì log resolve reason:
 *   const res = resolveSfx(scene); console.log(res);
 */
export type SceneSfxProps = {
  scene: SfxScene;
  /** Frame bắt đầu SFX (mặc định 0 = ngay đầu scene) */
  fromFrame?: number;
  /** Volume 0..1 (mặc định 0.18 — dưới voice ~15dB) */
  volume?: number;
};

export const SceneSfx: React.FC<SceneSfxProps> = ({
  scene,
  fromFrame = 0,
  volume = 0.18,
}) => {
  const { src } = resolveSfx(scene);
  if (!src) return null;
  return (
    <Sequence from={fromFrame}>
      <Audio src={src} volume={volume} />
    </Sequence>
  );
};
