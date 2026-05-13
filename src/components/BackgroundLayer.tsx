"use client";

import { useMemo } from "react";

interface Props {
  parallax: { x: number; y: number };
}

const GLYPHS = ["✦", "✧", "⋆", "♡", "✨", "★", "♥", "❀"];
const COLORS = [
  "var(--peach-deep)",
  "var(--lavender-deep)",
  "var(--gold)",
  "var(--rose)",
];

export default function BackgroundLayer({ parallax }: Props) {
  const sparkles = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => ({
      g: GLYPHS[i % GLYPHS.length],
      top: ((i * 37 + 11) % 97) + 1.5,
      left: ((i * 53 + 7) % 97) + 1.5,
      size: 12 + ((i * 17) % 22),
      dur: 4 + ((i * 7) % 6),
      delay: (i * 3) % 6,
      color: COLORS[i % 4],
    }));
  }, []);

  const blobs = [
    {
      style: {
        width: 520,
        height: 520,
        top: "-8%",
        left: "-6%",
        background:
          "radial-gradient(circle at 30% 30%, oklch(0.85 0.12 35), transparent 70%)",
      },
      px: 18,
      py: 12,
      delay: "0s",
    },
    {
      style: {
        width: 560,
        height: 560,
        top: "30%",
        right: "-10%",
        background:
          "radial-gradient(circle at 60% 40%, oklch(0.82 0.1 295), transparent 70%)",
      },
      px: -16,
      py: 10,
      delay: "-4s",
    },
    {
      style: {
        width: 480,
        height: 480,
        bottom: "-10%",
        left: "20%",
        background:
          "radial-gradient(circle at 50% 50%, oklch(0.88 0.09 160), transparent 70%)",
      },
      px: 10,
      py: -14,
      delay: "-8s",
    },
    {
      style: {
        width: 400,
        height: 400,
        top: "55%",
        left: "55%",
        background:
          "radial-gradient(circle at 40% 60%, oklch(0.9 0.1 85), transparent 70%)",
      },
      px: -12,
      py: -8,
      delay: "-12s",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{
            ...b.style,
            transform: `translate(${parallax.x * b.px}px, ${parallax.y * b.py}px)`,
            transition: "transform 0.6s ease-out",
            animationDelay: b.delay,
          }}
        />
      ))}

      {sparkles.map((s, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            color: s.color,
            fontSize: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            transform: `translate(${parallax.x * (i % 3 === 0 ? 12 : -8)}px, ${parallax.y * (i % 2 === 0 ? 10 : -6)}px)`,
            transition: "transform 0.8s ease-out",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))",
          }}
        >
          {s.g}
        </span>
      ))}
    </div>
  );
}
