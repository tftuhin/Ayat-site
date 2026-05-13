"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  CSSProperties,
} from "react";

interface GalleryItem {
  id: number;
  cat: string;
  title: string;
  year: number;
  video?: boolean;
  tint: string;
  image: string;
  videoSrc?: string;
}

const GALLERY: GalleryItem[] = [
  { id: 1, cat: "DANCE", title: "Preparation for school program 2026", year: 2026, video: true, tint: "var(--rose)", image: "/images/preparation-school-2026.png", videoSrc: "/videos/preparation-school-2026.mp4" },
  { id: 2, cat: "NATIONAL", title: "Pahela Boishakh at Muktijuddho Jadughor", year: 2026, tint: "var(--peach)", image: "/images/pahela-boishakh-2026-jadughor.png" },
  { id: 3, cat: "RECITATION", title: "Poem Recitation in Pohela Boishakh", year: 2026, video: true, tint: "var(--lavender)", image: "/images/poem-recitation-pohela-boishakh-2026.png", videoSrc: "/videos/poem-recitation-pohela-boishakh-2026.mp4" },
  { id: 4, cat: "NATIONAL", title: "Pohela Boishakh event at School", year: 2026, tint: "var(--gold)", image: "/images/pohela-boishakh-2026-school.png" },
  { id: 5, cat: "RECITATION", title: "Receiving award · Robindro Utsob", year: 2025, tint: "var(--peach)", image: "/images/award-robindro-utsob-2025.png" },
  { id: 6, cat: "RECITATION", title: "Robindro Utsob 2025", year: 2025, tint: "var(--lavender)", image: "/images/robindro-utsob-2025.png" },
  { id: 7, cat: "STORY", title: "Ayat's Birthday Party 2025", year: 2025, tint: "var(--rose)", image: "/images/birthday-party-2025.png" },
  { id: 8, cat: "STORY", title: "With her teacher · Birthday at School", year: 2025, tint: "var(--sage)", image: "/images/teacher-birthday-school-2025.png" },
  { id: 9, cat: "RECITATION", title: "Poem Recitation · 21 Feb 2025", year: 2025, video: true, tint: "var(--lavender)", image: "/images/poem-recitation-21-feb-2025.png", videoSrc: "/videos/poem-recitation-21-feb-2025.mp4" },
  { id: 10, cat: "STORY", title: "Receiving All-rounder award", year: 2024, tint: "var(--gold)", image: "/images/all-rounder-award-2024.png" },
  { id: 11, cat: "DANCE", title: "Annual Dance Competition 2024", year: 2024, video: true, tint: "var(--rose)", image: "/images/annual-dance-competition-2024.png", videoSrc: "/videos/annual-dance-competition-2024.mp4" },
  { id: 12, cat: "NATIONAL", title: "21 February 2024", year: 2024, tint: "var(--peach)", image: "/images/21-february-2024.png" },
  { id: 13, cat: "RECITATION", title: "Music Competition 2023", year: 2023, tint: "var(--lavender)", image: "/images/music-competition-2023.png" },
  { id: 14, cat: "RECITATION", title: "Poem Recitation · Robindro Utsob", year: 2023, video: true, tint: "var(--peach)", image: "/images/poem-recitation-robindro-2023.png", videoSrc: "/videos/poem-recitation-robindro-2023.mp4" },
  { id: 15, cat: "NATIONAL", title: "Bosonto Utsob 2023", year: 2023, tint: "var(--gold)", image: "/images/bosonto-utsob-2023.png" },
  { id: 16, cat: "NATIONAL", title: "Falgun Utsob award", year: 2023, tint: "var(--sage)", image: "/images/award-falgun-utsob-2023.png" },
];

const CATS = [
  { key: "ALL", label: "All", icon: "✦" },
  { key: "RECITATION", label: "Recitation", icon: "🎤" },
  { key: "DANCE", label: "Dance", icon: "💃" },
  { key: "STORY", label: "Storytelling", icon: "📖" },
  { key: "NATIONAL", label: "National Days", icon: "🇧🇩" },
];

export default function Gallery() {
  const [active, setActive] = useState("ALL");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (active === "ALL" ? GALLERY : GALLERY.filter((g) => g.cat === active)),
    [active]
  );

  useEffect(() => { setIndex(0); }, [active]);

  const n = filtered.length;
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + n) % n);
  }, [n]);

  useEffect(() => {
    if (!autoplay || open) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [autoplay, go, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, open]);

  const dragRef = useRef({ x: 0, dragging: false });
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, dragging: true };
    setAutoplay(false);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.dragging = false;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="gallery"
      className="section"
      style={{ position: "relative", paddingTop: 60, paddingBottom: 80 }}
    >
      <div className="shell">
        <div className="section-head">
          <div className="reveal">
            <div className="eyebrow">My performances</div>
            <h2 className="display">
              The stage{" "}
              <span style={{ color: "var(--lavender-deep)" }}>album</span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 12,
                  fontSize: "0.55em",
                  verticalAlign: "middle",
                  animation: "spin-slow 8s linear infinite",
                  color: "var(--gold)",
                }}
              >
                ✦
              </span>
            </h2>
          </div>
          <p className="lede reveal delay-1">
            A scrapbook of cultural programs, rehearsals, and standout moments
            from Milestone School &amp; College.
          </p>
        </div>

        {/* Category tabs + controls */}
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(18px)",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {CATS.map((c) => {
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "12px 18px",
                    borderRadius: 999,
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: isActive ? "white" : "var(--ink-soft)",
                    background: isActive
                      ? "linear-gradient(135deg, var(--peach-deep), var(--lavender-deep))"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 10px 26px -10px oklch(0.62 0.16 30 / 0.55), inset 0 1px 0 rgba(255,255,255,0.4)"
                      : "none",
                    transition: "all 0.3s cubic-bezier(.2,.9,.3,1.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <span>{c.icon}</span>
                  {c.label}
                  <span style={{ fontSize: 11, opacity: 0.7 }}>
                    {c.key === "ALL"
                      ? GALLERY.length
                      : GALLERY.filter((g) => g.cat === c.key).length}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setAutoplay((a) => !a)}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid var(--glass-border)",
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(14px)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                color: "var(--ink)",
                fontSize: 14,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {autoplay ? "❚❚" : "▶"}
            </button>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--glass-border)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink-soft)",
                fontVariantNumeric: "tabular-nums",
                minWidth: 70,
                textAlign: "center",
              }}
            >
              <span style={{ color: "var(--peach-deep)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span style={{ opacity: 0.4, margin: "0 4px" }}>/</span>
              <span>{String(n).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Coverflow stage */}
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="reveal coverflow-stage"
          style={{
            position: "relative",
            height: 540,
            perspective: 1800,
            overflow: "hidden",
            cursor: "grab",
            touchAction: "pan-y",
          }}
        >
          {filtered.map((item, i) => {
            let offset = i - index;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            return (
              <CoverflowCard
                key={item.id}
                item={item}
                offset={offset}
                onClick={() =>
                  offset === 0 ? setOpen(item) : setIndex(i)
                }
              />
            );
          })}

          <SlideArrow side="left" onClick={() => { setAutoplay(false); go(-1); }} />
          <SlideArrow side="right" onClick={() => { setAutoplay(false); go(1); }} />

          {/* progress dots */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); setIndex(i); }}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === index ? 26 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === index
                      ? "linear-gradient(90deg, var(--peach-deep), var(--lavender-deep))"
                      : "rgba(255,255,255,0.7)",
                  boxShadow:
                    i === index
                      ? "0 4px 10px -4px oklch(0.62 0.16 30 / 0.5)"
                      : "inset 0 0 0 1px var(--glass-border)",
                  transition:
                    "width 0.35s cubic-bezier(.2,.9,.3,1.4), background 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* title strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 18,
            padding: "0 12px",
          }}
        >
          <div
            className="glass current-strip"
            style={{
              padding: "12px 18px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              maxWidth: "100%",
              transition: "all 0.4s",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                padding: "5px 11px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.16em",
                background: filtered[index]?.tint,
                color: "var(--ink)",
              }}
            >
              {filtered[index]?.cat}
            </span>
            <span
              className="display"
              style={{ fontSize: 17, color: "var(--ink)" }}
            >
              {filtered[index]?.title}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--ink-mute)",
              }}
            >
              · {filtered[index]?.year}
            </span>
            <button
              onClick={() => setOpen(filtered[index])}
              className="btn btn-primary"
              style={{ padding: "8px 14px", fontSize: 12, marginLeft: 8 }}
            >
              {filtered[index]?.video ? "Watch ▶" : "Open"}
            </button>
          </div>
        </div>

        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 28,
          }}
        >
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              color: "var(--ink-mute)",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              className="hand"
              style={{ fontSize: 20, color: "var(--peach-deep)" }}
            >
              📌
            </span>
            More memories added after every cultural program · use ← → or drag
          </div>
        </div>
      </div>

      {open && (
        <Lightbox
          item={open}
          onClose={() => setOpen(null)}
          all={filtered}
          onNav={setOpen}
        />
      )}
    </section>
  );
}

function CoverflowCard({
  item,
  offset,
  onClick,
}: {
  item: GalleryItem;
  offset: number;
  onClick: () => void;
}) {
  const abs = Math.abs(offset);
  const isCenter = offset === 0;
  if (abs > 3) return null;

  const mobile = typeof window !== "undefined" && window.innerWidth < 720;
  const cardW = mobile ? Math.min(280, (typeof window !== "undefined" ? window.innerWidth : 320) - 60) : 380;
  const cardH = mobile ? 380 : 480;
  const shift = mobile ? 200 : 280;

  const translateX = offset * shift;
  const translateZ = -abs * (mobile ? 140 : 180);
  const rotateY = offset * -18;
  const scale = isCenter ? 1 : 0.95 - abs * 0.04;
  const opacity = abs > 2 ? 0 : 1 - abs * 0.18;

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        transformStyle: "preserve-3d",
        transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        transition:
          "transform 0.7s cubic-bezier(.2,.7,.3,1), opacity 0.6s, filter 0.6s",
        opacity,
        filter: isCenter
          ? "none"
          : `brightness(${1 - abs * 0.1}) saturate(0.9)`,
        cursor: "pointer",
        zIndex: 10 - abs,
        pointerEvents: abs > 2 ? "none" : "auto",
      }}
    >
      <div
        className="glass-strong"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: isCenter
            ? "0 40px 80px -30px oklch(0.4 0.08 40 / 0.5), 0 0 0 1px var(--glass-border)"
            : "0 20px 40px -20px oklch(0.4 0.08 40 / 0.35)",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(20,15,10,0.78) 0%, rgba(20,15,10,0.2) 38%, transparent 60%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            right: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <span
            style={{
              padding: "7px 13px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.18em",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              color: "var(--ink)",
            }}
          >
            {item.cat}
          </span>
          {item.video && (
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 6px 16px -6px rgba(0,0,0,0.25)",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "var(--peach-deep)",
                  marginLeft: 2,
                }}
              >
                ▶
              </span>
            </span>
          )}
        </div>

        {isCenter && item.video && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(14px)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 16px 40px -10px rgba(0,0,0,0.3)",
                animation: "twinkle 2.5s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  color: "var(--peach-deep)",
                  marginLeft: 5,
                }}
              >
                ▶
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            bottom: 20,
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              opacity: 0.85,
              letterSpacing: "0.12em",
              marginBottom: 6,
            }}
          >
            {item.year}
          </div>
          <div
            className="display"
            style={{
              fontSize: 22,
              lineHeight: 1.15,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            {item.title}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

function SlideArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className="slide-arrow"
      style={{
        position: "absolute",
        top: "50%",
        [side]: 18,
        transform: "translateY(-50%)",
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: "1px solid var(--glass-border)",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 14px 30px -10px oklch(0.4 0.08 40 / 0.3)",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        zIndex: 20,
        fontSize: 18,
        color: "var(--ink)",
        transition:
          "transform 0.25s cubic-bezier(.2,.9,.3,1.4), background 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `translateY(-50%) scale(1.1) translateX(${side === "left" ? -4 : 4}px)`;
        e.currentTarget.style.background = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        e.currentTarget.style.background = "rgba(255,255,255,0.85)";
      }}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}

function Lightbox({
  item,
  onClose,
  all,
  onNav,
}: {
  item: GalleryItem;
  onClose: () => void;
  all: GalleryItem[];
  onNav: (item: GalleryItem) => void;
}) {
  const idx = all.findIndex((g) => g.id === item.id);
  const prev = () => onNav(all[(idx - 1 + all.length) % all.length]);
  const next = () => onNav(all[(idx + 1) % all.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(30, 20, 15, 0.65)",
        backdropFilter: "blur(20px)",
        display: "grid",
        placeItems: "center",
        padding: 24,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong"
        style={{
          width: "min(960px, 100%)",
          maxHeight: "90vh",
          padding: 18,
          display: "grid",
          gridTemplateRows: "1fr auto",
          gap: 16,
          animation: "slideUp 0.4s cubic-bezier(.2,.9,.3,1.4)",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 22,
            overflow: "hidden",
            aspectRatio: "16/10",
            background: `linear-gradient(135deg, ${item.tint}, oklch(0.92 0.04 60))`,
          }}
        >
          {item.videoSrc ? (
            <video
              src={item.videoSrc}
              controls
              playsInline
              preload="none"
              poster={item.image}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <div
          style={{
            padding: "4px 14px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.18em",
                color: "var(--peach-deep)",
              }}
            >
              {item.cat} · {item.year}
            </div>
            <div className="display" style={{ fontSize: 28, marginTop: 6 }}>
              {item.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={prev}
              className="btn btn-ghost"
              style={{ padding: "12px 16px" }}
            >
              ←
            </button>
            <button
              onClick={next}
              className="btn btn-ghost"
              style={{ padding: "12px 16px" }}
            >
              →
            </button>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: "12px 18px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
