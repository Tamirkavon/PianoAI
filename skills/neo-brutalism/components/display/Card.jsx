// NEO-BRUTALISM SKILL — Card.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// Cards are physical paper objects on a bulletin board.
// Their shadow is the gap between the paper and the surface behind it.
// On hover, the card lifts (translate up) and the shadow grows.
// The shadow grows because the gap increases as the card moves away from the surface.
//
// Sharp corners always. No border radius.
// White background (not cream) — the card is a piece of paper on the canvas.
// Header areas use colored backgrounds with a border-bottom divider.

import { useState } from "react";

export function Card({
  children,
  headerBg,       // background color for optional header band
  shadow = "base",// xs|sm|md|base|lg|xl
  interactive = true,
  padding = "32px",
  style: ext,
  onClick,
}) {
  const [hov, setHov] = useState(false);

  const shadows = {
    xs:   "2px 2px 0px 0px #000",
    sm:   "4px 4px 0px 0px #000",
    md:   "6px 6px 0px 0px #000",
    base: "8px 8px 0px 0px #000",
    lg:   "12px 12px 0px 0px #000",
    xl:   "16px 16px 0px 0px #000",
  };

  const hoverShadows = {
    xs:   "4px 4px 0px 0px #000",
    sm:   "6px 6px 0px 0px #000",
    md:   "8px 8px 0px 0px #000",
    base: "12px 12px 0px 0px #000",
    lg:   "16px 16px 0px 0px #000",
    xl:   "20px 20px 0px 0px #000",
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        position: "relative",
        background: "#FFFFFF",
        border: "4px solid #000",
        borderRadius: 0,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        boxShadow: interactive && hov ? hoverShadows[shadow] : shadows[shadow],
        transform: interactive && hov ? "translateY(-4px)" : "none",
        transition: "all 200ms ease-out",
        ...ext,
      }}
    >
      {/* Optional colored header band */}
      {headerBg && (
        <div style={{
          background: headerBg,
          borderBottom: "4px solid #000",
          padding: "12px 24px",
        }} />
      )}

      <div style={{ padding }}>
        {children}
      </div>
    </div>
  );
}

// ── FEATURE CARD ──────────────────────────────────────────────────────────────
// Card variant with an icon box, large heading, and body text.
// The icon container uses a vivid colored background with thick border.

export function FeatureCard({ icon: Icon, title, body, accentBg = "#FF6B6B", rotate = 0 }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#FFFFFF",
        border: "4px solid #000",
        borderRadius: 0,
        padding: "28px",
        boxShadow: hov ? "12px 12px 0px 0px #000" : "8px 8px 0px 0px #000",
        transform: hov ? "translateY(-4px)" : rotate ? `rotate(${rotate}deg)` : "none",
        transition: "all 200ms ease-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 56, height: 56,
        background: accentBg,
        border: "4px solid #000",
        boxShadow: "4px 4px 0px 0px #000",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20,
        flexShrink: 0,
      }}>
        {Icon && <Icon size={28} strokeWidth={3} color="#000" />}
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 900, fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        color: "#000", marginBottom: 10,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: 16,
        color: "#000", lineHeight: 1.6,
      }}>
        {body}
      </p>
    </div>
  );
}

// ── STAT CARD ─────────────────────────────────────────────────────────────────
// Large number + label + optional badge. Used in metrics sections.

export function StatCard({ value, label, bg = "#FFD93D", badge, rotate = 0 }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg,
        border: "4px solid #000",
        borderRadius: 0,
        padding: "28px",
        boxShadow: hov ? "12px 12px 0px 0px #000" : "8px 8px 0px 0px #000",
        transform: hov
          ? "translateY(-4px)"
          : rotate
          ? `rotate(${rotate}deg)`
          : "none",
        transition: "all 200ms ease-out",
        position: "relative",
      }}
    >
      {/* Optional floating badge */}
      {badge && (
        <div style={{
          position: "absolute", top: -12, right: -12,
          background: "#FF6B6B", border: "3px solid #000",
          borderRadius: 9999, padding: "4px 12px",
          fontSize: 11, fontWeight: 900,
          textTransform: "uppercase", letterSpacing: "0.1em",
          boxShadow: "3px 3px 0px 0px #000",
          transform: "rotate(3deg)",
        }}>
          {badge}
        </div>
      )}

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 900, fontSize: 56,
        lineHeight: 1, letterSpacing: "-0.04em",
        color: "#000", marginBottom: 8,
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700, fontSize: 14,
        textTransform: "uppercase", letterSpacing: "0.1em",
        color: "#000",
      }}>
        {label}
      </div>
    </div>
  );
}

// ── USAGE ─────────────────────────────────────────────────────────────────────
// <Card>Simple card content</Card>
// <Card headerBg="#FF6B6B" shadow="lg">Card with red header band</Card>
// <Card interactive={false} shadow="sm">Non-interactive card</Card>
//
// <FeatureCard icon={Zap} title="FAST AS HELL" body="No lag, no delay." accentBg="#FFD93D" />
// <FeatureCard icon={Shield} title="SECURE" body="..." accentBg="#C4B5FD" rotate={-1} />
//
// <StatCard value="99%" label="Uptime" bg="#FFD93D" badge="NEW" />
// <StatCard value="12K" label="Users" bg="#C4B5FD" rotate={1} />
