"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedStat from "./AnimatedStat";

function NameWord({
  children,
  color,
  delay = 0,
}: {
  children: React.ReactNode;
  color: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color,
        display: "inline-block",
        transition: `transform 0.35s cubic-bezier(.2,.9,.3,1.4) ${delay}ms, filter 0.3s ease`,
        transform: hovered ? "translateY(-6px) scale(1.06)" : "translateY(0) scale(1)",
        filter: hovered ? "drop-shadow(0 8px 18px oklch(0.62 0.16 30 / 0.35))" : "none",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );
}

interface Props {
  parallax: { x: number; y: number };
}

export default function Hero({ parallax }: Props) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "140px 0 80px",
      }}
    >
      <div className="shell" style={{ width: "100%" }}>
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <div
              className="reveal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-soft)",
                marginBottom: 26,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--peach-deep)",
                  boxShadow: "0 0 0 4px oklch(0.78 0.13 35 / 0.3)",
                  animation: "twinkle 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink-soft)",
                  letterSpacing: "0.02em",
                }}
              >
                Class One · Age 6 · On stage since 4
              </span>
            </div>

            <h1
              className="display reveal delay-1"
              style={{
                fontSize: "clamp(54px, 7.2vw, 104px)",
                margin: 0,
                lineHeight: 0.98,
              }}
            >
              Hi, I&apos;m
              <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <NameWord color="var(--peach-deep)">Tahrin</NameWord>
                <Squiggle />
              </span>{" "}
              <NameWord color="var(--lavender-deep)" delay={40}>Jahan</NameWord>{" "}
              <NameWord color="var(--ink)" delay={80}>Ayat</NameWord>
              <br />
              <span
                className="hand"
                style={{
                  fontSize: "0.55em",
                  color: "var(--lavender-deep)",
                  display: "inline-block",
                  transform: "rotate(-2deg)",
                  marginTop: 8,
                }}
              >
                and I love the stage ♡
              </span>
            </h1>

            <p
              className="reveal delay-2"
              style={{
                marginTop: 28,
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--ink-soft)",
                maxWidth: 520,
              }}
            >
              A bright, expressive young performer with a captivating voice and
              vivid imagination — bringing Bengali poetry, traditional fables,
              and joyful dance to every stage I step on.
            </p>

            <div
              className="reveal delay-3"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 24,
              }}
            >
              {[
                { icon: "🎤", label: "Recitation", color: "var(--peach)" },
                { icon: "📖", label: "Storytelling", color: "var(--lavender)" },
                { icon: "💃", label: "Dance", color: "var(--rose)" },
                { icon: "🎭", label: "Stage", color: "var(--gold)" },
              ].map((c) => (
                <span
                  key={c.label}
                  className="chip"
                  style={{
                    background: `linear-gradient(135deg, ${c.color}, rgba(255,255,255,0.6))`,
                    color: "var(--ink)",
                    border: "1px solid rgba(255,255,255,0.7)",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{c.icon}</span> {c.label}
                </span>
              ))}
            </div>

            <div
              className="reveal delay-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 36,
              }}
            >
              <a href="#stage" className="btn btn-primary">
                See my performances <span>→</span>
              </a>
              <a href="#awards" className="btn btn-ghost">
                View awards
              </a>
            </div>

            <div
              className="reveal delay-4"
              style={{
                marginTop: 56,
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
              }}
            >
              <AnimatedStat value="3" suffix="+" label="Years performing" />
              <AnimatedStat value="2" label="Languages spoken" />
              <AnimatedStat value="12" label="Awards & certificates" />
            </div>
          </div>

          {/* RIGHT */}
          <HeroPortrait parallax={parallax} />
        </div>

        {/* scroll cue */}
        <div
          className="reveal delay-4"
          style={{ display: "flex", justifyContent: "center", marginTop: 80 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "var(--ink-mute)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            scroll to explore
            <div
              style={{
                width: 1,
                height: 36,
                background:
                  "linear-gradient(to bottom, var(--ink-mute), transparent)",
                animation: "float-y 2.6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Squiggle() {
  return (
    <svg
      viewBox="0 0 240 18"
      style={{
        position: "absolute",
        bottom: -8,
        left: 0,
        width: "100%",
        height: 14,
      }}
    >
      <path
        d="M2 9 Q 22 -2, 42 9 T 82 9 T 122 9 T 162 9 T 202 9 T 238 9"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FloatingTag({
  style,
  icon,
  title,
  sub,
  rot = 0,
  delay = 0,
}: {
  style: React.CSSProperties;
  icon: string;
  title: string;
  sub: string;
  rot?: number;
  delay?: number;
}) {
  return (
    <div
      className="glass"
      style={{
        position: "absolute",
        ...style,
        padding: "12px 16px",
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        gap: 12,
        transform: `rotate(${rot}deg)`,
        animation: `float-y 5.5s ease-in-out ${delay}s infinite`,
        minWidth: 170,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, var(--peach), var(--gold))",
          fontSize: 18,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

function HeroPortrait({ parallax }: Props) {
  return (
    <div
      className="reveal delay-2"
      style={{
        position: "relative",
        aspectRatio: "0.9",
        maxWidth: 560,
        justifySelf: "end",
        width: "100%",
      }}
    >
      {/* decorative ring */}
      <div
        style={{
          position: "absolute",
          inset: -28,
          borderRadius: "44% 56% 48% 52% / 52% 44% 56% 48%",
          background:
            "linear-gradient(135deg, oklch(0.85 0.12 35 / 0.5), oklch(0.85 0.1 295 / 0.5))",
          animation: "blob-morph 12s ease-in-out infinite",
          transform: `translate(${parallax.x * 8}px, ${parallax.y * 8}px)`,
          transition: "transform 0.6s ease-out",
          filter: "blur(8px)",
        }}
      />

      {/* portrait */}
      <div
        className="glass-strong"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "44% 56% 48% 52% / 52% 44% 56% 48%",
          overflow: "hidden",
          animation: "blob-morph 12s ease-in-out infinite",
          transform: `translate(${parallax.x * -10}px, ${parallax.y * -6}px)`,
          transition: "transform 0.6s ease-out",
        }}
      >
        <Image
          src="/images/hero.webp"
          alt="Tahrin Jahan Ayat"
          fill
          priority
          sizes="(max-width: 720px) 100vw, 560px"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      <FloatingTag
        style={{ top: "8%", left: "-8%" }}
        icon="🎤"
        title="Recitation"
        sub="Bengali poetry"
        rot={-6}
        delay={0}
      />
      <FloatingTag
        style={{ top: "42%", right: "-12%" }}
        icon="🏆"
        title="1st place"
        sub="Dance Competition"
        rot={5}
        delay={1.4}
      />
      <FloatingTag
        style={{ bottom: "8%", left: "0%" }}
        icon="✨"
        title="Best Performer"
        sub="2025"
        rot={-3}
        delay={2.6}
      />

      <span
        style={{
          position: "absolute",
          top: "-4%",
          right: "20%",
          fontSize: 30,
          color: "var(--gold)",
          animation: "spin-slow 14s linear infinite",
          filter: "drop-shadow(0 4px 12px oklch(0.82 0.13 85 / 0.5))",
        }}
      >
        ✦
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "-2%",
          right: "18%",
          fontSize: 24,
          color: "var(--rose)",
          animation: "twinkle 3s ease-in-out infinite",
        }}
      >
        ♡
      </span>
      <span
        style={{
          position: "absolute",
          top: "55%",
          left: "-6%",
          fontSize: 22,
          color: "var(--lavender-deep)",
          animation: "twinkle 4s ease-in-out 0.5s infinite",
        }}
      >
        ✧
      </span>
    </div>
  );
}
