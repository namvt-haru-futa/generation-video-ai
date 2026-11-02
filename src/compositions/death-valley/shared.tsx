/**
 * Shared components & palette — Video Thung Lũng Chết (TikTok 1080×1920)
 * Palette sa mạc theo style guide trong video-script.md.
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Easing,
  OffthreadVideo,
  Img,
  staticFile,
  Audio,
} from "remotion";
import { FONT } from "./fonts";

// ─── Palette sa mạc ─────────────────────────────────────────────────────────
export const COLORS = {
  darkBg: "#1A1206", // nền tối đen nâu
  heat: "#FF6B1A", // cam cháy (nhấn nóng)
  hot: "#FF8C24", // cam sáng (số liệu highlight)
  sand: "#E8B84B", // vàng cát (nhấn phụ)
  cream: "#FFF8EC", // trắng ngà (text chính)
  salt: "#8FB8C9", // xanh tái (muối / lạnh)
  white: "#FFF8EC",
  overlay: "rgba(26,18,6,0.42)",
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

// ─── SceneBg: video nền toàn màn ───────────────────────────────────────────
export const SceneBg: React.FC<{
  src: string;
  startFrom?: number;
  colorOverlay?: string;
  muted?: boolean;
}> = ({ src, startFrom = 0, colorOverlay = COLORS.overlay, muted = true }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={startFrom}
      muted={muted}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill style={{ backgroundColor: colorOverlay }} />
  </AbsoluteFill>
);

// ─── ImageBg: ảnh nền + Ken Burns (zoom chậm) ──────────────────────────────
export const ImageBg: React.FC<{
  src: string;
  frame: number;
  colorOverlay?: string;
  from?: number;
  to?: number;
  duration?: number;
  pan?: "in" | "out";
}> = ({
  src,
  frame,
  colorOverlay = COLORS.overlay,
  from = 1.05,
  to = 1.18,
  duration = 300,
  pan = "in",
}) => {
  const scale = interpolate(
    frame,
    [0, duration],
    pan === "in" ? [from, to] : [to, from],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg, overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: colorOverlay }} />
    </AbsoluteFill>
  );
};

// ─── StatText: số/chữ lớn nhấn mạnh ────────────────────────────────────────
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
  color = COLORS.cream,
  size = 130,
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
        fontFamily: FONT,
        textAlign: "center",
        letterSpacing: "-2px",
        lineHeight: 1.0,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        textShadow: "0 4px 24px rgba(0,0,0,0.9)",
        padding: "0 40px",
      }}
    >
      {text}
    </div>
  );
};

// ─── SubText: chữ phụ (nhiều dòng) ─────────────────────────────────────────
export const SubText: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  color?: string;
  size?: number;
}> = ({ text, frame, appearAt = 0, color = COLORS.sand, size = 46 }) => {
  const opacity = fadeIn(frame, appearAt, 10);
  const y = slideUp(frame, appearAt, 14);
  return (
    <div
      style={{
        color,
        fontSize: size,
        fontWeight: 700,
        fontFamily: FONT,
        textAlign: "center",
        lineHeight: 1.3,
        whiteSpace: "pre-wrap",
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: "0 2px 12px rgba(0,0,0,0.92)",
        padding: "0 60px",
      }}
    >
      {text}
    </div>
  );
};

// ─── TopLabel: nhãn nhỏ ở đỉnh ─────────────────────────────────────────────
export const TopLabel: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  color?: string;
}> = ({ text, frame, appearAt = 0, color = COLORS.sand }) => {
  const opacity = fadeIn(frame, appearAt, 8);
  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 0,
        right: 0,
        textAlign: "center",
        color,
        fontSize: 32,
        fontWeight: 700,
        fontFamily: FONT,
        letterSpacing: 4,
        textTransform: "uppercase",
        opacity,
        textShadow: "0 2px 8px rgba(0,0,0,0.85)",
      }}
    >
      {text}
    </div>
  );
};

// ─── Pill: nhãn keyword bo tròn ────────────────────────────────────────────
export const Pill: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  bg?: string;
  color?: string;
  size?: number;
}> = ({
  text,
  frame,
  appearAt = 0,
  bg = COLORS.heat,
  color = COLORS.cream,
  size = 40,
}) => {
  const opacity = fadeIn(frame, appearAt, 7);
  const scale = scaleIn(frame, appearAt, 9);
  return (
    <div
      style={{
        alignSelf: "center",
        backgroundColor: bg,
        color,
        fontSize: size,
        fontWeight: 800,
        fontFamily: FONT,
        padding: "10px 26px",
        borderRadius: 999,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// ─── VoiceTrack: giọng đọc ──────────────────────────────────────────────────
export const VoiceTrack: React.FC<{ src: string; volume?: number }> = ({
  src,
  volume = 1,
}) => <Audio src={staticFile(src)} volume={volume} />;

// ─── FadeBlack: fade ra/vào đen ────────────────────────────────────────────
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
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.max(fadeInOpacity, fadeOutOpacity);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
