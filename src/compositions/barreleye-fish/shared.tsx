/**
 * Shared components & palette — Video Cá Mắt Vòm (TikTok 1080×1920)
 * Palette biển sâu: xanh đen mực + xanh lá phát sáng (màu mắt cá).
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
  useCurrentFrame,
  Loop,
} from "remotion";
import { FONT } from "./fonts";

// ─── Palette biển sâu ──────────────────────────────────────────────────────
export const COLORS = {
  darkBg: "#020B18", // nền chính (biển sâu tối)
  deep: "#0A2540", // xanh dương lạnh phụ
  glow: "#3DFFB3", // xanh lá phát sáng (mắt cá — nhấn chính)
  cyan: "#7EEBF5", // xanh cyan phụ (bioluminescence)
  highlight: "#00FFA3", // xanh lá highlight số liệu
  cream: "#F5FBFF", // trắng ngà (text chính)
  shell: "#2A1810", // nâu đen (silhouette cá)
  warn: "#FF6B4A", // cam cảnh báo (dùng ít, cho ❌)
  overlay: "rgba(2,11,24,0.55)",
};

// ─── helpers ───────────────────────────────────────────────────────────────
export const fadeIn = (frame: number, start = 0, duration = 10) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
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

// ─── SceneBg: video nền toàn màn — tự loop nếu video ngắn hơn scene ───────
// Nếu truyền `videoDurationInFrames`, wrap trong <Loop> để lặp seamless.
// Nếu không truyền, phát 1 lần bình thường.
export const SceneBg: React.FC<{
  src: string;
  startFrom?: number;
  colorOverlay?: string;
  muted?: boolean;
  playbackRate?: number;
  videoDurationInFrames?: number;
}> = ({
  src,
  startFrom = 0,
  colorOverlay = COLORS.overlay,
  muted = true,
  playbackRate = 1,
  videoDurationInFrames,
}) => {
  const video = (
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={startFrom}
      muted={muted}
      playbackRate={playbackRate}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {videoDurationInFrames ? (
        <Loop durationInFrames={videoDurationInFrames}>{video}</Loop>
      ) : (
        video
      )}
      <AbsoluteFill style={{ backgroundColor: colorOverlay }} />
    </AbsoluteFill>
  );
};

// ─── ImageBg: ảnh nền + Ken Burns ──────────────────────────────────────────
export const ImageBg: React.FC<{
  src: string;
  frame: number;
  colorOverlay?: string;
  from?: number;
  to?: number;
  duration?: number;
  pan?: "in" | "out";
  objectPosition?: string;
}> = ({
  src,
  frame,
  colorOverlay = COLORS.overlay,
  from = 1.05,
  to = 1.18,
  duration = 300,
  pan = "in",
  objectPosition = "center",
}) => {
  const scale = interpolate(
    frame,
    [0, duration],
    pan === "in" ? [from, to] : [to, from],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{ backgroundColor: COLORS.darkBg, overflow: "hidden" }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
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
  glow?: boolean;
}> = ({
  text,
  frame,
  appearAt = 0,
  color = COLORS.cream,
  size = 130,
  weight = 900,
  glow = false,
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
        letterSpacing: "-1.5px",
        lineHeight: 1.0,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        textShadow: glow
          ? `0 0 32px ${color}, 0 0 60px ${color}88, 0 4px 24px rgba(0,0,0,0.9)`
          : "0 4px 24px rgba(0,0,0,0.9)",
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
  weight?: number;
}> = ({
  text,
  frame,
  appearAt = 0,
  color = COLORS.cyan,
  size = 46,
  weight = 700,
}) => {
  const opacity = fadeIn(frame, appearAt, 10);
  const y = slideUp(frame, appearAt, 14);
  return (
    <div
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
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

// ─── TopLabel: nhãn nhỏ trên đỉnh ──────────────────────────────────────────
export const TopLabel: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  color?: string;
  top?: number;
}> = ({ text, frame, appearAt = 0, color = COLORS.glow, top = 220 }) => {
  const opacity = fadeIn(frame, appearAt, 8);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        color,
        fontSize: 30,
        fontWeight: 700,
        fontFamily: FONT,
        letterSpacing: 4,
        textTransform: "uppercase",
        opacity,
        textShadow: `0 0 16px ${color}, 0 2px 8px rgba(0,0,0,0.85)`,
      }}
    >
      {text}
    </div>
  );
};

// ─── Pill: nhãn bo tròn ────────────────────────────────────────────────────
export const Pill: React.FC<{
  text: string;
  frame: number;
  appearAt?: number;
  bg?: string;
  color?: string;
  size?: number;
  glow?: boolean;
}> = ({
  text,
  frame,
  appearAt = 0,
  bg = COLORS.deep,
  color = COLORS.glow,
  size = 40,
  glow = true,
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
        boxShadow: glow
          ? `0 4px 22px rgba(0,0,0,0.5), 0 0 24px ${color}66, inset 0 0 0 1.5px ${color}55`
          : "0 4px 18px rgba(0,0,0,0.45)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

// ─── VoiceTrack ────────────────────────────────────────────────────────────
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

// ─── MarineSnow: hạt tuyết biển trôi (SVG particles) ──────────────────────
// Overlay lơ lửng trên video nền để tăng cảm giác biển sâu ngay cả khi
// video nền không có marine snow.
const SNOW_SEED: { x: number; delay: number; size: number; speed: number }[] =
  Array.from({ length: 40 }).map((_, i) => ({
    x: ((i * 137) % 100),
    delay: (i * 91) % 300,
    size: 2 + ((i * 13) % 5),
    speed: 0.8 + ((i * 7) % 40) / 100,
  }));

export const MarineSnow: React.FC<{ opacity?: number }> = ({
  opacity = 0.35,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {SNOW_SEED.map((p, i) => {
        const t = ((frame + p.delay) * p.speed) % 400;
        const y = -20 + (t / 400) * 2000;
        const alpha = interpolate(
          t,
          [0, 30, 370, 400],
          [0, 0.9, 0.9, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: COLORS.cyan,
              opacity: alpha,
              filter: "blur(0.5px)",
              boxShadow: `0 0 ${p.size * 2}px ${COLORS.cyan}88`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── GlowPulse: khối nhấn phát sáng nhấp nháy ─────────────────────────────
export const GlowPulse: React.FC<{
  frame: number;
  x: number;
  y: number;
  size?: number;
  color?: string;
}> = ({ frame, x, y, size = 200, color = COLORS.glow }) => {
  const t = frame % 40;
  const scale = 1 + (Math.sin((t / 40) * Math.PI * 2) + 1) * 0.15;
  const alpha = 0.5 + (Math.sin((t / 40) * Math.PI * 2) + 1) * 0.2;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
        transform: `scale(${scale})`,
        pointerEvents: "none",
      }}
    />
  );
};
