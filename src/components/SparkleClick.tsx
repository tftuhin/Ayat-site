"use client";

import { useEffect } from "react";

const COLORS = [
  "oklch(0.78 0.13 35)",
  "oklch(0.62 0.16 30)",
  "oklch(0.8 0.09 295)",
  "oklch(0.6 0.13 295)",
  "oklch(0.82 0.13 85)",
  "oklch(0.78 0.12 10)",
];

const SHAPES = ["✦", "✧", "★", "·", "•"];

export default function SparkleClick() {
  useEffect(() => {
    const spawn = (x: number, y: number) => {
      const count = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
        const dist = 35 + Math.random() * 65;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const size = 10 + Math.random() * 14;
        const duration = 520 + Math.random() * 380;
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

        el.textContent = shape;
        el.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          left: ${x}px;
          top: ${y}px;
          font-size: ${size}px;
          line-height: 1;
          color: ${color};
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
          --dx: ${dx}px;
          --dy: ${dy}px;
          --dur: ${duration}ms;
          animation: sparkle-fly var(--dur) ease-out forwards;
        `;

        document.body.appendChild(el);
        setTimeout(() => el.remove(), duration + 50);
      }
    };

    const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => spawn(t.clientX, t.clientY));
    };

    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return null;
}
