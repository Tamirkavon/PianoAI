// PLAYFUL GEOMETRIC SKILL — Navbar.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// The nav is clean and structured — it's part of the "stable grid" in the
// "Stable Grid, Wild Decoration" principle. The navigation itself is readable
// and professional. The personality comes from the logo mark (a colored shape),
// the pill CTA button with its hard shadow, and subtle hover states.
//
// The logo area uses a colored geometric shape (square or circle) as a mark —
// this is more interesting than a text-only logo and reinforces the aesthetic.

import { useState } from "react";

export function Navbar({
  brand = "Drip",
  links = [],
  ctaLabel = "Get started",
  onCtaClick,
  sticky = true,
}) {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);

  const ctaShadow = ctaActive
    ? "2px 2px 0px 0px #1E293B"
    : ctaHovered
    ? "6px 6px 0px 0px #1E293B"
    : "4px 4px 0px 0px #1E293B";

  const ctaTransform = ctaActive
    ? "translate(2px, 2px)"
    : ctaHovered
    ? "translate(-2px, -2px)"
    : "translate(0, 0)";

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 48px",
      background: "#FFFDF5",
      borderBottom: "2px solid #1E293B",
      position: sticky ? "sticky" : "static",
      top: 0,
      zIndex: 100,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }}>

      {/* LOGO — geometric mark + brand name */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* WHY: The colored square logo mark is a primitive shape —
            it signals the geometric aesthetic immediately */}
        <div style={{
          width: 28, height: 28,
          background: "#8B5CF6",
          border: "2px solid #1E293B",
          boxShadow: "2px 2px 0px 0px #1E293B",
          borderRadius: 6,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 18,
          fontWeight: 800,
          fontFamily: '"Outfit", sans-serif',
          color: "#1E293B",
          letterSpacing: "-0.01em",
        }}>
          {brand}
        </span>
      </div>

      {/* NAV LINKS */}
      {links.length > 0 && (
        <div style={{ display: "flex", gap: 8 }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: hoveredLink === i ? "#1E293B" : "#64748B",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: 9999,
                background: hoveredLink === i ? "#F1F5F9" : "transparent",
                transition: "all 150ms ease",
                cursor: "pointer",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* CTA — the candy button, smaller size */}
      <button
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => { setCtaHovered(false); setCtaActive(false); }}
        onMouseDown={() => setCtaActive(true)}
        onMouseUp={() => setCtaActive(false)}
        onClick={onCtaClick}
        style={{
          background: "#8B5CF6",
          color: "#FFFFFF",
          border: "2px solid #1E293B",
          borderRadius: 9999,
          padding: "9px 22px",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "inherit",
          boxShadow: ctaShadow,
          transform: ctaTransform,
          cursor: "pointer",
          transition: [
            "transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
            "box-shadow 200ms cubic-bezier(0.34,1.56,0.64,1)",
          ].join(", "),
          outline: "none",
          whiteSpace: "nowrap",
        }}
      >
        {ctaLabel}
      </button>
    </nav>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Navbar
//   brand="Drip"
//   links={[
//     { label: "Skills", href: "/skills" },
//     { label: "Docs", href: "/docs" },
//     { label: "Pricing", href: "/pricing" },
//   ]}
//   ctaLabel="Get started free"
//   onCtaClick={() => router.push("/signup")}
// />
