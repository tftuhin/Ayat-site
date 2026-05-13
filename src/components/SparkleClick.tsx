"use client";

import { useEffect } from "react";

const COLORS = [
  "oklch(0.78 0.13 35)",
  "oklch(0.62 0.16 30)",
  "oklch(0.8 0.09 295)",
  "oklch(0.82 0.13 85)",
  "oklch(0.78 0.12 10)",
];

export default function SparkleClick() {
  useEffect(() => {
    const spawn = (x: number, y: number) => {
      const count = 5 + Math.floor(Math.random() * 3); // 5–7
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // fan upward like a party popper: -120° to -60° with slight spread
        const angle = (-Math.PI * 0.85 + (Math.PI * 0.7 * i) / (count - 1)) + (Math.random() - 0.5) * 0.3;
        const dist = 50 + Math.random() * 50;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const isConfetti = Math.random() > 0.4;
        const w = isConfetti ? 5 + Math.random() * 4 : 6;
        const h = isConfetti ? 3 + Math.random() * 2 : 6;
        const rot = Math.random() * 360;
        const rotEnd = rot + (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 120);
        const duration = 550 + Math.random() * 300;

        el.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          left: ${x}px;
          top: ${y}px;
          width: ${w}px;
          height: ${h}px;
          border-radius: ${isConfetti ? "2px" : "50%"};
          background: ${color};
          will-change: transform, opacity;
          --dx: ${dx}px;
          --dy: ${dy}px;
          --rot: ${rot}deg;
          --rot-end: ${rotEnd}deg;
          --dur: ${duration}ms;
          animation: popper-fly var(--dur) cubic-bezier(.2,.8,.4,1) forwards;
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
