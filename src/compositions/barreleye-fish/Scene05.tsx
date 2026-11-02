/**
 * Scene 05 — Bí ẩn 70 năm — mắt xoay được · voice vo-05 (~612f)
 * Timeline 1939 → 2004 → 2009 + minh họa mắt xoay 90°.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  COLORS,
  SceneBg,
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
import whisperxS05 from "../../research/barreleye-fish/captions/vo-05.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-05")!;

// Chia timeline: phase 1 = timeline, phase 2 = mắt xoay
const P2 = 320;

const TIMELINE = [
  { year: "1939", label: "Mô tả lần đầu", appearAt: 30 },
  { year: "2004", label: "Quay được cá sống", appearAt: 110 },
  { year: "2009", label: "Giải bí ẩn — mắt XOAY", appearAt: 190 },
];

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Mắt xoay: 0° → 90° trong phase 2
  const eyeRotate = interpolate(
    frame,
    [P2 + 60, P2 + 180],
    [0, 90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* v01 marine-snow 291f — loop cho scene 632f */}
      <SceneBg
        src="assets/video/barreleye-fish/v01-marine-snow.mp4"
        colorOverlay="rgba(2,11,24,0.75)"
        videoDurationInFrames={291}
      />
      <MarineSnow opacity={0.35} />

      {/* Title chung ở đỉnh */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.cyan,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: fadeIn(frame, 10, 12),
          textShadow: `0 0 16px ${COLORS.cyan}, 0 2px 8px rgba(0,0,0,0.9)`,
        }}
      >
        70 năm bí ẩn
      </div>

      {/* Phase 1 — Timeline */}
      {frame < P2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              width: "80%",
              opacity: fadeIn(frame, 20, 15),
            }}
          >
            {TIMELINE.map((t, i) => {
              const active = frame >= t.appearAt;
              const opacity = fadeIn(frame, t.appearAt, 12);
              const scale = scaleIn(frame, t.appearAt, 14);
              const isFinal = i === TIMELINE.length - 1;
              return (
                <div
                  key={t.year}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 30,
                    opacity,
                    transform: `scale(${scale})`,
                  }}
                >
                  {/* Bullet */}
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: isFinal
                        ? `radial-gradient(circle, ${COLORS.glow} 0%, ${COLORS.highlight} 60%, ${COLORS.deep} 100%)`
                        : "rgba(10,37,64,0.9)",
                      border: `3px solid ${isFinal ? COLORS.glow : COLORS.cyan}`,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isFinal && active
                        ? `0 0 32px ${COLORS.glow}, 0 0 60px ${COLORS.glow}88`
                        : `0 0 12px ${COLORS.cyan}44`,
                      fontSize: 44,
                    }}
                  >
                    {isFinal ? "👁️" : i === 1 ? "🎥" : "📝"}
                  </div>

                  {/* Year + label */}
                  <div style={{ flex: 1, fontFamily: FONT }}>
                    <div
                      style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: isFinal ? COLORS.glow : COLORS.cream,
                        lineHeight: 0.95,
                        letterSpacing: "-1px",
                        textShadow: isFinal
                          ? `0 0 24px ${COLORS.glow}, 0 2px 12px rgba(0,0,0,0.9)`
                          : "0 2px 12px rgba(0,0,0,0.9)",
                      }}
                    >
                      {t.year}
                    </div>
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 600,
                        color: COLORS.cyan,
                        marginTop: 4,
                        textShadow: "0 2px 8px rgba(0,0,0,0.85)",
                      }}
                    >
                      {t.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* Phase 2 — Mắt xoay 90° */}
      {frame >= P2 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 60,
            opacity: fadeIn(frame, P2 + 10, 15),
          }}
        >
          {/* Container mô phỏng vòm trong suốt */}
          <div
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: `3px solid ${COLORS.cyan}88`,
              background: `radial-gradient(circle, ${COLORS.deep}66 0%, ${COLORS.deep}22 60%, transparent 100%)`,
              boxShadow: `0 0 40px ${COLORS.cyan}55, inset 0 0 30px ${COLORS.cyan}33`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Mắt: một hình cầu xanh phát sáng, xoay 90° */}
            <div
              style={{
                width: 130,
                height: 200,
                borderRadius: 60,
                background: `linear-gradient(to top, ${COLORS.highlight} 0%, ${COLORS.glow} 60%, ${COLORS.cream} 90%)`,
                boxShadow: `0 0 40px ${COLORS.glow}, 0 0 80px ${COLORS.glow}88`,
                transform: `rotate(-${eyeRotate}deg)`,
                transformOrigin: "center center",
                transition: "none",
              }}
            />
            {/* Mũi tên chỉ hướng xoay */}
            <div
              style={{
                position: "absolute",
                bottom: -50,
                fontSize: 40,
                color: COLORS.glow,
                textShadow: `0 0 20px ${COLORS.glow}`,
                fontWeight: 900,
                fontFamily: FONT,
              }}
            >
              ↺ 90°
            </div>
          </div>

          <div style={{ height: 60 }} />

          <SubText
            text="Nhìn LÊN → Nhìn TRƯỚC khi ăn"
            frame={frame}
            appearAt={P2 + 200}
            color={COLORS.glow}
            size={44}
          />

          <div style={{ height: 20 }} />

          <Pill
            text="MBARI — Robison & Reisenbichler, 2009"
            frame={frame}
            appearAt={P2 + 240}
            bg="rgba(10,37,64,0.85)"
            color={COLORS.cyan}
            size={30}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/barreleye-fish/vo-05.wav" />
      <WhisperxCaption captions={whisperxS05 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={P2 + 60} volume={0.16} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
