export default function Contact() {
  const decor = [
    { t: "12%", l: "8%", s: "✦", c: "var(--peach-deep)", size: 22, d: 0 },
    { t: "20%", l: "92%", s: "♡", c: "var(--rose)", size: 26, d: 0.6 },
    { t: "70%", l: "6%", s: "✧", c: "var(--lavender-deep)", size: 20, d: 1.2 },
    { t: "78%", l: "94%", s: "⭐", c: "var(--gold)", size: 24, d: 1.8 },
    { t: "8%", l: "55%", s: "🦄", c: "currentColor", size: 22, d: 2.2 },
  ];

  return (
    <section
      id="contact"
      className="section"
      style={{ paddingBottom: 60 }}
    >
      <div className="shell">
        <div
          className="glass-strong reveal contact-card"
          style={{
            padding: "72px 56px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {decor.map((p, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                top: p.t,
                left: p.l,
                fontSize: p.size,
                color: p.c,
                animation: `float-slow 6s ease-in-out ${p.d}s infinite`,
                pointerEvents: "none",
              }}
            >
              {p.s}
            </span>
          ))}

          <div
            style={{
              fontSize: 56,
              marginBottom: 12,
              animation: "float-y 3s ease-in-out infinite",
            }}
          >
            🎀
          </div>
          <div className="eyebrow">Get in touch</div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              margin: "12px 0 16px",
            }}
          >
            Let&apos;s create
            <br />
            <span style={{ color: "var(--peach-deep)" }}>magic together</span>
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "0 auto",
              color: "var(--ink-soft)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            For invitations, performance bookings, or just a kind word — say
            hello.
          </p>
          <a
            href="mailto:tuhin59083@gmail.com"
            className="btn btn-primary"
            style={{ marginTop: 28, padding: "16px 28px", fontSize: 16, display: "inline-flex" }}
          >
            ✉ tuhin59083@gmail.com
          </a>
          <div
            className="hand"
            style={{
              marginTop: 32,
              fontSize: 22,
              color: "var(--lavender-deep)",
            }}
          >
            ✦ ♡ 🦄 ♡ ✦
          </div>
        </div>

        <footer
          style={{
            textAlign: "center",
            padding: "48px 0 20px",
            color: "var(--ink-mute)",
            fontSize: 13,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--peach-deep)",
              }}
            />
            © 2026 Tahrin Jahan Ayat · A young storyteller&apos;s stage
          </div>
        </footer>
      </div>
    </section>
  );
}
