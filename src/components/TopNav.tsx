export default function TopNav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 8,
        borderRadius: 999,
        background: "rgba(255, 250, 245, 0.75)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 14px 40px -18px oklch(0.4 0.08 40 / 0.3)",
        whiteSpace: "nowrap",
      }}
    >
      <a
        href="#top"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px 8px 12px",
          fontFamily: "var(--font-display)",
          fontSize: 18,
          color: "var(--ink)",
          textDecoration: "none",
          borderRadius: 999,
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            display: "inline-grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--peach), var(--gold))",
            color: "white",
            fontSize: 12,
          }}
        >
          ✦
        </span>
        <span>Ayat</span>
      </a>

      {(["About", "Stage", "Awards", "Contact"] as const).map((label) => (
        <a
          key={label}
          href={`#${label.toLowerCase()}`}
          style={{
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink-soft)",
            textDecoration: "none",
            borderRadius: 999,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.6)";
            e.currentTarget.style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--ink-soft)";
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
