"use client";

import { useState } from "react";
import AnimatedStat from "./AnimatedStat";

interface Award {
  id: number;
  icon: string;
  title: string;
  org: string;
  year: string;
  body: string;
  tint: string;
  rank: string;
  image: string;
}

const AWARDS: Award[] = [
  { id: 1, icon: "⭐", title: "Best Performer", org: "Milestone School & College", year: "2025", body: "Recognized as the Best Performer for outstanding discipline and speaking skills in the K.G. class.", tint: "var(--peach)", rank: "Top honor", image: "/images/award-best-performer.png" },
  { id: 2, icon: "💃", title: "Annual Dance Competition", org: "Milestone School & College", year: "2024", body: "Awarded 1st place for performance in the Annual Dance Competition for the Nursery class.", tint: "var(--rose)", rank: "1st Place", image: "/images/award-annual-dance-2024.png" },
  { id: 3, icon: "🌟", title: "Best All Rounder", org: "Milestone School & College", year: "2024", body: "Recognized as the Best All Rounder in the Nursery class for excellence across academics and arts.", tint: "var(--gold)", rank: "All-rounder", image: "/images/award-best-all-rounder.png" },
  { id: 4, icon: "🎤", title: "Poem Recitation", org: "Milestone School & College", year: "2024", body: "Awarded 1st place for poem recitation in the Nursery class.", tint: "var(--lavender)", rank: "1st Place", image: "/images/award-poem-recitation.png" },
  { id: 5, icon: "🎭", title: "Annual Cultural Programme", org: "Milestone School & College", year: "2023", body: "Recognized for rhyme performance in the Annual Cultural Programme for the Play Group.", tint: "var(--sage)", rank: "Featured", image: "/images/award-annual-cultural-programme.png" },
  { id: 6, icon: "🏆", title: "Best Discipline", org: "Milestone School & College", year: "2023", body: "Awarded for Best Discipline in the PG class.", tint: "var(--sky)", rank: "Honor", image: "/images/award-best-discipline.png" },
  { id: 7, icon: "💃", title: "Dance Competition", org: "Milestone School & College", year: "2023", body: "Awarded 1st Prize for performance in the Dance Competition for the Play class.", tint: "var(--rose)", rank: "1st Prize", image: "/images/award-dance-competition-2023.png" },
];

export default function Awards() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="awards" className="section" style={{ position: "relative" }}>
      <div className="shell">
        <div className="section-head">
          <div className="reveal">
            <div className="eyebrow">Awards &amp; recognition</div>
            <h2 className="display">
              My trophy{" "}
              <span style={{ color: "var(--gold)", position: "relative" }}>
                wall 🏆
              </span>
            </h2>
          </div>
          <p className="lede reveal delay-1">
            Tap any certificate to flip it and read the story behind it. Seven
            medals so far — and counting.
          </p>
        </div>

        {/* Stats bar */}
        <div
          className="reveal"
          style={{
            display: "flex",
            gap: 18,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {[
            { n: "7", l: "Total certificates" },
            { n: "4", suffix: "×", l: "1st place finishes" },
            { n: "3", l: "Years of recognition" },
            { n: "1", l: "All-rounder honor" },
          ].map((s) => (
            <div
              key={s.l}
              className="glass"
              style={{
                flex: "1 1 180px",
                padding: 22,
                borderRadius: 22,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <AnimatedStat
                value={s.n}
                suffix={s.suffix ?? ""}
                label={s.l}
                size={40}
              />
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 22,
          }}
        >
          {AWARDS.map((a, i) => (
            <AwardCard
              key={a.id}
              award={a}
              delay={(i % 4) + 1}
              flipped={flipped === a.id}
              onFlip={() => setFlipped(flipped === a.id ? null : a.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({
  award,
  delay,
  flipped,
  onFlip,
}: {
  award: Award;
  delay: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div
      className={`reveal delay-${delay}`}
      style={{ perspective: 1400, height: 360, cursor: "pointer" }}
      onClick={onFlip}
    >
      <div
        className="award-card-wrap"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(.2,.7,.3,1.2)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="glass-strong"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--glass-border)",
              marginBottom: 16,
            }}
          >
            <img
              src={award.image}
              alt={award.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />

            {/* rank badge */}
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                padding: "5px 11px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.14em",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                color: "var(--ink)",
              }}
            >
              {award.rank}
            </div>

            {/* shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shimmer 4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div>
              <div
                className="display"
                style={{ fontSize: 17, lineHeight: 1.1 }}
              >
                {award.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  marginTop: 4,
                }}
              >
                {award.year} · {award.rank}
              </div>
            </div>
            <div
              style={{
                padding: "8px 12px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                borderRadius: 999,
                background: "rgba(255,255,255,0.7)",
                color: "var(--peach-deep)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid var(--glass-border)",
              }}
            >
              FLIP <span>↻</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="glass-strong"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: `linear-gradient(160deg, oklch(0.97 0.02 60) 0%, ${award.tint} 200%)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              background: `linear-gradient(135deg, ${award.tint}, var(--gold))`,
              fontSize: 28,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {award.icon}
          </div>
          <div className="eyebrow" style={{ color: "var(--peach-deep)" }}>
            {award.rank} · {award.year}
          </div>
          <div
            className="display"
            style={{ fontSize: 24, lineHeight: 1.1 }}
          >
            {award.title}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink-soft)",
            }}
          >
            {award.org}
          </div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              marginTop: 4,
            }}
          >
            {award.body}
          </div>
          <div
            style={{
              marginTop: "auto",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink-mute)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>↺</span> Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
