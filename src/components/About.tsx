"use client";

import { useRef, useState } from "react";

const SKILLS = [
  {
    icon: "🎤",
    title: "Poem Recitation",
    body: "Excellent memorization with natural rhythm, voice modulation, and expressive facial gestures that bring every verse to life.",
    tint: "var(--peach)",
  },
  {
    icon: "💃",
    title: "Dance",
    body: "Energetic and graceful — comfortable learning choreography and executing stage routines for cultural events.",
    tint: "var(--rose)",
  },
  {
    icon: "📖",
    title: "Storytelling",
    body: "Engaging delivery style. Skilled at narrating traditional Bengali fables and fun children's stories.",
    tint: "var(--lavender)",
  },
  {
    icon: "🎭",
    title: "Stage & Camera",
    body: "Naturally charismatic, unafraid of large audiences, and comfortable taking direction from teachers and directors.",
    tint: "var(--gold)",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="section-head">
          <div className="reveal">
            <div className="eyebrow">About me</div>
            <h2 className="display">
              A little storyteller
              <br />
              with big{" "}
              <span style={{ color: "var(--peach-deep)" }}>dreams ✨</span>
            </h2>
          </div>
          <p className="lede reveal delay-1">
            Four skills woven into every performance — recitation, dance,
            storytelling and the bright stage presence that ties them together.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.title} {...s} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  icon,
  title,
  body,
  tint,
  delay,
}: {
  icon: string;
  title: string;
  body: string;
  tint: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - r.left) / r.width - 0.5) * 10,
          y: ((e.clientY - r.top) / r.height - 0.5) * -10,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`glass reveal delay-${delay}`}
      style={{
        padding: 28,
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.18s ease-out",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tint}, transparent 70%)`,
          opacity: 0.5,
          filter: "blur(8px)",
        }}
      />

      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          display: "grid",
          placeItems: "center",
          fontSize: 30,
          background: `linear-gradient(135deg, ${tint}, rgba(255,255,255,0.6))`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 20px -8px rgba(0,0,0,0.1)",
          marginBottom: 22,
          transform: "translateZ(20px)",
        }}
      >
        {icon}
      </div>

      <h3
        className="display"
        style={{ fontSize: 26, margin: "0 0 10px", transform: "translateZ(15px)" }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          color: "var(--ink-soft)",
          fontSize: 15,
          lineHeight: 1.6,
          transform: "translateZ(10px)",
        }}
      >
        {body}
      </p>
    </div>
  );
}
