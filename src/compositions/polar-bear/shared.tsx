/**
 * Shared components dùng chung cho tất cả scene
 * Polar Bear Video — TikTok 1080×1920
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Easing,
  OffthreadVideo,
  staticFile,
  Audio,
} from "remotion";

// ─── Palette ───────────────────────────────────────────────────────────────
export const COLORS = {
  iceBlue: "#A8D8EA",
  white: "#F5F5F5",
  black: "#0D0D0D",
  orange: "#F4A261",
  red: "#E63946",
  darkBlue: "#0A1628",
  overlay: "rgba(0,0,0,0.45)",
};

// ─── helpers ───────────────────────────────────────────────────────────────
export const fadeIn = (frame: number, start = 0, duration = 10) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

export const fadeOut = (frame: number, start: number, duration = 8) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const slideUp = (frame: number, start = 0, duration = 12) =>
  interpolate(frame, [start, start + duration], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

export const scaleIn = (frame: number, start = 0, duration = 10) =>
  interpolate(frame, [start, start + duration], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

// ─── SceneBg: Full-screen video background ─────────────────────────────────
export const SceneBg: React.FC<{
  src: string;
  startFrom?: number;
  colorOverlay?: string;
}> = ({ src, startFrom = 0, colorOverlay = COLORS.overlay }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={startFrom}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    {/* Dark overlay để text nổi bật */}
    <AbsoluteFill style={{ backgroundColor: colorOverlay }} />
  </AbsoluteFill>
);

// ─── ImageBg: Full-screen image background ─────────────────────────────────
export const ImageBg: React.FC<{
  src: string;
  colorOverlay?: string;
  scale?: number;
}> = ({ src, colorOverlay = COLORS.overlay, scale = 1 }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile(src)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `scale(${scale})`,
      }}
    />
    <AbsoluteFill style={{ backgroundColor: colorOverlay }} />
  </AbsoluteFill>
);

// ─── StatText: Big animated number/stat ────────────────────────────────────
export const StatText: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  color?: string;
  size?: number;
  weight?: number;
}> = ({
  text,
  frame,
  appearAt = 0,
  color = COLORS.white,
  size = 96,
  weight = 900,
}) => {
  const opacity = fadeIn(frame, appearAt, 8);
  const y = slideUp(frame, appearAt, 12);
  const scale = scaleIn(frame, appearAt, 10);

  return (
    <div
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        fontFamily: "'Arial Black', 'Impact', sans-serif",
        textAlign: "center",
        letterSpacing: "-2px",
        lineHeight: 1.0,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        textShadow: "0 4px 24px rgba(0,0,0,0.8)",
        padding: "0 40px",
      }}
    >
      {text}
    </div>
  );
};

// ─── SubText: Smaller supporting text ─────────────────────────────────────
export const SubText: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  color?: string;
  size?: number;
}> = ({ text, frame, appearAt = 0, color = COLORS.iceBlue, size = 40 }) => {
  const opacity = fadeIn(frame, appearAt, 10);
  const y = slideUp(frame, appearAt, 14);

  return (
    <div
      style={{
        color,
        fontSize: size,
        fontWeight: 600,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        lineHeight: 1.3,
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        padding: "0 48px",
      }}
    >
      {text}
    </div>
  );
};

// ─── TopLabel: Small label ở đỉnh màn hình ────────────────────────────────
export const TopLabel: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
}> = ({ text, frame, appearAt = 0 }) => {
  const opacity = fadeIn(frame, appearAt, 8);
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        color: COLORS.orange,
        fontSize: 32,
        fontWeight: 700,
        fontFamily: "Arial, sans-serif",
        letterSpacing: 4,
        textTransform: "uppercase",
        opacity,
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
      }}
    >
      {text}
    </div>
  );
};

// ─── VoiceTrack: Audio giọng đọc ──────────────────────────────────────────
export const VoiceTrack: React.FC<{ src: string }> = ({ src }) => (
  <Audio src={staticFile(src)} />
);

// ─── BlackFade: Fade from/to black ────────────────────────────────────────
export const FadeBlack: React.FC<{
  frame: number;
  totalFrames: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}> = ({ frame, totalFrames, fadeInDuration = 8, fadeOutDuration = 12 }) => {
  const fadeInOpacity = interpolate(frame, [0, fadeInDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOutOpacity = interpolate(
    frame,
    [totalFrames - fadeOutDuration, totalFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.max(fadeInOpacity, fadeOutOpacity);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
