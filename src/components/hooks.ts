"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useParallax() {
  useEffect(() => {
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      document.documentElement.style.setProperty("--px", cur.x.toFixed(3));
      document.documentElement.style.setProperty("--py", cur.y.toFixed(3));
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export function useCountUp(
  target: number,
  { duration = 1600 }: { duration?: number } = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(target * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, display: Math.round(val).toString() };
}

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + length) % length),
    [length]
  );
  return { index, setIndex, go };
}
