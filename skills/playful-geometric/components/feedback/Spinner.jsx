// PLAYFUL GEOMETRIC SKILL — Spinner.jsx + ProgressBar.jsx
//
// WHY THESE LOOK THE WAY THEY DO:
// Loading states in this system are cheerful, not anxious.
// The spinner bounces. The progress bar has a pop shadow and fills with
// the accent color. Even waiting feels on-brand.

import { useState, useEffect } from "react";

// ── SPINNER ───────────────────────────────────────────────────────────────────
// Three bouncing dots — friendlier than a spinning circle for this aesthetic.
// WHY: Bouncing dots match the elastic/springy motion philosophy of the skill.

export function Spinner({ size = "md", color = "#8B5CF6" }) {
  const sizes = { sm: 6, md: 10, lg: 14 };
  const dotSize = sizes[size];

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: dotSize * 0.8,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: color,
          border: "2px solid #1E293B",
          animation: `bounceDot 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s infinite alternate`,
        }} />
      ))}
      <style>{`
        @keyframes bounceDot {
          from { transform: translateY(0); }
          to   { transform: translateY(-${dotSize * 1.5}px); }
        }
      `}</style>
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────
// Chunky progress bar with hard shadow and rounded track.
// WHY: The border + shadow treatment makes it feel like a physical object —
// like a loading bar from a toy dashboard.

export function ProgressBar({
  value = 0,
  label,
  showPercent = true,
  color = "#8B5CF6",
  animated = true,
}) {
  const [displayed, setDisplayed] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) { setDisplayed(value); return; }
    const start = displayed;
    const diff = value - start;
    const duration = 700;
    const startTime = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      // WHY: ease-out so it slows as it approaches the target — satisfying
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {(label || showPercent) && (
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 10,
        }}>
          {label && (
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1E293B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {label}
            </span>
          )}
          {showPercent && (
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>
              {displayed}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div style={{
        height: 20,
        background: "#F1F5F9",
        border: "2px solid #1E293B",
        borderRadius: 9999,
        boxShadow: "3px 3px 0px 0px #1E293B",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Fill */}
        <div style={{
          height: "100%",
          width: `${displayed}%`,
          background: color,
          borderRadius: 9999,
          transition: "width 100ms ease",
          position: "relative",
          // WHY: Small shine effect at the right edge of fill
          // makes it feel polished without being soft
        }} />
      </div>
    </div>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Spinner size="md" color="#8B5CF6" />
// <Spinner size="lg" color="#F472B6" />
//
// <ProgressBar value={72} label="Upload Progress" />
// <ProgressBar value={100} color="#34D399" showPercent={false} />
