// NEO-BRUTALISM SKILL — Input.jsx + Badge.jsx
//
// WHY INPUTS LOOK THIS WAY:
// Inputs are bold rectangular forms — no rounded corners, heavy black borders.
// Focus state changes BACKGROUND COLOR (to yellow) instead of adding a glow ring.
// This is the neo-brutalism focus mechanic: color change, not light emission.
// The focus transition is instant (100ms) — no slow fade in.
//
// WHY BADGES LOOK THIS WAY:
// Badges are stickers. They have thick borders, hard shadows, and slight rotations.
// They are positioned absolutely to overlap parent elements like stickers layered
// on a surface. They use uppercase text with wide tracking — ink stamps.

import { useState } from "react";

// ── INPUT ─────────────────────────────────────────────────────────────────────

export function Input({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  error,
  hint,
  disabled = false,
  required = false,
  size = "md",
}) {
  const [focused, setFocused] = useState(false);

  const heights = { sm: 48, md: 56, lg: 68 };
  const h = heights[size] || heights.md;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
      {label && (
        <label style={{
          fontSize: 13, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "#000",
        }}>
          {label}
          {required && <span style={{ color: "#FF6B6B", marginLeft: 4 }}>*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: h,
          padding: "0 20px",
          fontSize: 16,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: "#000",
          outline: "none",
          borderRadius: 0,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          // Focus: background turns yellow, shadow appears — no glow ring
          background: error ? "#FFE5E5" : focused ? "#FFD93D" : "#FFFFFF",
          border: error ? "4px solid #FF6B6B" : "4px solid #000",
          boxShadow: focused && !error ? "4px 4px 0px 0px #000" : "none",
          transition: "all 100ms linear",
        }}
      />

      {error && (
        <span style={{
          fontSize: 13, fontWeight: 700, color: "#FF6B6B",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          ✕ {error}
        </span>
      )}
      {hint && !error && (
        <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.5)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

// ── TEXTAREA ──────────────────────────────────────────────────────────────────

export function Textarea({ label, placeholder, value, onChange, rows = 4, error, hint, required }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
      {label && (
        <label style={{
          fontSize: 13, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "#000",
        }}>
          {label}
          {required && <span style={{ color: "#FF6B6B", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "16px 20px",
          fontSize: 16,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: "#000",
          outline: "none",
          borderRadius: 0,
          resize: "vertical",
          background: focused ? "#FFD93D" : "#FFFFFF",
          border: error ? "4px solid #FF6B6B" : "4px solid #000",
          boxShadow: focused ? "4px 4px 0px 0px #000" : "none",
          transition: "all 100ms linear",
        }}
      />
      {error && <span style={{ fontSize: 13, fontWeight: 700, color: "#FF6B6B" }}>✕ {error}</span>}
      {hint && !error && <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.5)" }}>{hint}</span>}
    </div>
  );
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
// Sticker-style badge. Rotated, bordered, hard-shadowed.
// Use rotate prop to tilt like a real sticker.

export function Badge({
  children,
  variant = "accent",
  size = "md",
  rotate = 0,  // degrees — use ±1-3 for sticker effect
  shadow = true,
}) {
  const variants = {
    accent:    { bg: "#FF6B6B", color: "#000" },
    secondary: { bg: "#FFD93D", color: "#000" },
    muted:     { bg: "#C4B5FD", color: "#000" },
    black:     { bg: "#000000", color: "#FFF" },
    white:     { bg: "#FFFFFF", color: "#000" },
    outline:   { bg: "transparent", color: "#000" },
  };

  const sizes = {
    sm: { padding: "3px 10px",  fontSize: 11 },
    md: { padding: "5px 14px",  fontSize: 13 },
    lg: { padding: "8px 20px",  fontSize: 15 },
  };

  const v = variants[variant] || variants.accent;
  const s = sizes[size]      || sizes.md;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: s.padding,
      borderRadius: "9999px",
      border: "3px solid #000",
      background: v.bg,
      color: v.color,
      fontSize: s.fontSize,
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      whiteSpace: "nowrap",
      transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
      boxShadow: shadow ? "3px 3px 0px 0px #000" : "none",
    }}>
      {children}
    </span>
  );
}

// ── USAGE ─────────────────────────────────────────────────────────────────────
// <Input label="Email" type="email" placeholder="you@example.com" required />
// <Input label="Username" error="Already taken" />
// <Input label="Website" hint="Include https://" size="lg" />
// <Textarea label="Message" placeholder="Tell us about your project..." rows={5} />
//
// <Badge>NEW</Badge>
// <Badge variant="secondary" rotate={-2}>POPULAR</Badge>
// <Badge variant="black" size="lg" rotate={3}>FEATURED</Badge>
// <Badge variant="muted" shadow={false}>BETA</Badge>
