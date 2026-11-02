/**
 * Scene 03 — Hai chấm đen KHÔNG phải mắt · voice vo-03 (~427f)
 * Plot twist: chấm đen = lỗ mũi, mắt thật là hai quả cầu xanh bên trong.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  MarineSnow,
  SubText,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  scaleIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS03 from "../../research/barreleye-fish/captions/vo-03.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-03")!;

// Điểm chuyển phase — sau khi giải thích chấm đen sang phần mắt thật
const P2 = 240;

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Blink cho chữ ❌ ở phase 1
  const xBlink = 0.7 + Math.sin(frame * 0.3) * 0.3;

  // Pulse xanh cho phần "mắt thật" ở phase 2
  const eyePulse = 1 + Math.sin((frame - P2) * 0.2) * 0.08;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền ảnh cá zoom sát mặt */}
      <ImageBg
        src="assets/images/barreleye-fish/i01-barreleye-noaa.jpg"
        frame={frame}
        colorOverlay="rgba(2,11,24,0.55)"
        from={1.25}
        to={1.4}
        duration={durationInFrames}
        objectPosition="center 45%"
      />

      <MarineSnow opacity={0.3} />

      {/* Phase 1 — ❌ KHÔNG PHẢI MẮT */}
      {frame < P2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: fadeIn(frame, 20, 12),
          }}
        >
          <div
            style={{
              fontSize: 200,
              filter: `drop-shadow(0 0 32px ${COLORS.warn})`,
              opacity: xBlink,
              transform: `scale(${scaleIn(frame, 30, 14)})`,
            }}
          >
            ❌
          </div>
          <div style={{ height: 16 }} />
          <div
            style={{
              fontFamily: FONT,
              fontSize: 78,
              fontWeight: 900,
              color: COLORS.warn,
              textAlign: "center",
              letterSpacing: "-1.5px",
              lineHeight: 1,
              textShadow: `0 0 24px ${COLORS.warn}, 0 4px 20px rgba(0,0,0,0.95)`,
              opacity: fadeIn(frame, 45, 15),
              transform: `scale(${scaleIn(frame, 45, 15)})`,
            }}
          >
            KHÔNG PHẢI
            <br />
            LÀ MẮT
          </div>
          <div style={{ height: 30 }} />
          <Pill
            text="Hai chấm đen = LỖ MŨI"
            frame={frame}
            appearAt={110}
            bg="rgba(2,11,24,0.85)"
            color={COLORS.cyan}
            size={40}
          />
        </AbsoluteFill>
      )}

      {/* Phase 2 — ✅ ĐÔI MẮT THẬT */}
      {frame >= P2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: fadeIn(frame, P2 + 5, 12),
          }}
        >
          {/* Hai quả cầu xanh phát sáng — icon */}
          <div
            style={{
              display: "flex",
              gap: 60,
              transform: `scale(${eyePulse})`,
              marginBottom: 30,
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${COLORS.glow} 0%, ${COLORS.highlight} 40%, ${COLORS.deep} 80%)`,
                  boxShadow: `0 0 40px ${COLORS.glow}, 0 0 80px ${COLORS.glow}88, inset 0 0 20px ${COLORS.cream}`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 62,
              fontWeight: 900,
              color: COLORS.glow,
              textAlign: "center",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textShadow: `0 0 32px ${COLORS.glow}, 0 4px 20px rgba(0,0,0,0.9)`,
              opacity: fadeIn(frame, P2 + 20, 15),
            }}
          >
            ✅ ĐÔI MẮT THẬT
            <br />
            NẰM BÊN TRONG ĐẦU
          </div>
          <div style={{ height: 24 }} />
          <SubText
            text="Hai quả cầu xanh lá phát sáng"
            frame={frame}
            appearAt={P2 + 60}
            color={COLORS.cyan}
            size={40}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/barreleye-fish/vo-03.wav" />
      <WhisperxCaption captions={whisperxS03 as RemotionCaption[]} />

      {/* SFX reveal — chime nhẹ khi chuyển phase (frame P2) */}
      <SceneSfx scene={sceneData} fromFrame={P2 - 10} volume={0.25} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
