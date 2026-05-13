"use client";

import { useCountUp } from "./hooks";

interface Props {
  value: string;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: string;
  size?: number;
}

export default function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  label,
  color = "var(--peach-deep)",
  size = 38,
}: Props) {
  const isNumeric = /^\d+(\.\d+)?$/.test(value);
  const { ref, display } = useCountUp(isNumeric ? parseFloat(value) : 0);

  return (
    <div ref={ref}>
      <div
        className="display"
        style={{
          fontSize: size,
          color,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {isNumeric ? `${prefix}${display}${suffix}` : value}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--ink-mute)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}
