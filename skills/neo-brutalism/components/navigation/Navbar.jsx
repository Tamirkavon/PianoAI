// NEO-BRUTALISM SKILL — Navbar.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// The nav is a thick black bordered strip — not a floating island, not translucent.
// It sits on the page like a printed header band. The logo is a colored bordered
// box (sticker), not just text. Nav links are plain bold text that snap into
// bordered, colored boxes on hover — no smooth transitions, just instant snap.
// The mobile menu is a bordered sheet that drops in from the top.

import { useState } from "react";

const LINK_BASE = {
  padding: "6px 12px",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700, fontSize: 14,
  textTransform: "uppercase", letterSpacing: "0.08em",
  textDecoration: "none", color: "#000",
  border: "3px solid transparent",
  boxShadow: "none",
  transition: "all 100ms linear",
  cursor: "pointer",
  background: "transparent",
  display: "inline-block",
};

const LINK_HOVER = {
  ...LINK_BASE,
  border: "3px solid #000",
  background: "#FF6B6B",
  boxShadow: "3px 3px 0px 0px #000",
};

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={hov ? LINK_HOVER : LINK_BASE}
    >
      {children}
    </a>
  );
}

export function Navbar({ brand = "BRAND", links = [], ctaLabel = "GET STARTED", onCtaClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <>
      <nav style={{
        borderBottom: "4px solid #000",
        background: "#FFFDF5",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1152, margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo — colored sticker box */}
          <a href="/" style={{
            display: "inline-flex", alignItems: "center",
            background: "#FFD93D",
            border: "4px solid #000",
            boxShadow: "4px 4px 0px 0px #000",
            padding: "6px 16px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900, fontSize: 20,
            textTransform: "uppercase", letterSpacing: "-0.02em",
            color: "#000", textDecoration: "none",
            transform: "rotate(-1deg)",
          }}>
            {brand}
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {links.map((l, i) => (
              <NavLink key={i} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onMouseEnter={() => setCtaHov(true)}
              onMouseLeave={() => { setCtaHov(false); setCtaPressed(false); }}
              onMouseDown={() => setCtaPressed(true)}
              onMouseUp={() => setCtaPressed(false)}
              onClick={onCtaClick}
              style={{
                height: 44, padding: "0 20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 13,
                textTransform: "uppercase", letterSpacing: "0.08em",
                background: ctaHov ? "#e85555" : "#FF6B6B",
                color: "#000", border: "4px solid #000",
                borderRadius: 0, cursor: "pointer", outline: "none",
                boxShadow: ctaPressed ? "none" : "4px 4px 0px 0px #000",
                transform: ctaPressed ? "translate(4px,4px)" : "none",
                transition: "all 100ms linear",
              }}
            >
              {ctaLabel}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 44, height: 44,
                background: mobileOpen ? "#000" : "#FFFDF5",
                border: "4px solid #000",
                borderRadius: 0, cursor: "pointer", outline: "none",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 5,
                boxShadow: "4px 4px 0px 0px #000",
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block",
                  width: 18, height: 3,
                  background: mobileOpen ? "#FFF" : "#000",
                  transform: mobileOpen
                    ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                    : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                    : "scaleX(0)"
                    : "none",
                  transition: "all 150ms linear",
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          borderBottom: "4px solid #000",
          background: "#FFFDF5",
          padding: "16px 24px 24px",
          position: "relative", zIndex: 99,
        }}>
          {links.map((l, i) => (
            <a key={i} href={l.href} style={{
              display: "block",
              padding: "14px 0",
              borderBottom: i < links.length - 1 ? "2px solid #000" : "none",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 16,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#000", textDecoration: "none",
            }}>
              {l.label}
            </a>
          ))}
          <button onClick={onCtaClick} style={{
            display: "block", width: "100%",
            marginTop: 20, height: 52,
            background: "#FF6B6B", color: "#000",
            border: "4px solid #000",
            boxShadow: "4px 4px 0px 0px #000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 14,
            textTransform: "uppercase", cursor: "pointer",
          }}>
            {ctaLabel}
          </button>
        </div>
      )}
    </>
  );
}

// ── USAGE ─────────────────────────────────────────────────────────────────────
// <Navbar
//   brand="DRIP"
//   links={[
//     { label: "SKILLS",  href: "/skills" },
//     { label: "PRICING", href: "/pricing" },
//     { label: "DOCS",    href: "/docs" },
//   ]}
//   ctaLabel="GET STARTED"
//   onCtaClick={() => {}}
// />
