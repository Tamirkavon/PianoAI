// PLAYFUL GEOMETRIC SKILL — Input.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// Inputs in this system have a distinctive focus state — the border turns accent
// violet AND a hard shadow appears in the same color. This is the "pop shadow
// focus ring" pattern. It replaces the standard browser outline with something
// that fits the system's personality.
//
// Labels are uppercase, bold, small with wide tracking — they feel like
// form field labels from a well-designed toy or game interface.
//
// The error state uses the same pop shadow pattern but in red.

import { useState } from "react";

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
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = error ? "#DC2626" : focused ? "#8B5CF6" : "#CBD5E1";
  const shadowColor = error ? "#DC2626" : focused ? "#8B5CF6" : "transparent";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }}>
      {label && (
        <label style={{
          fontSize: 12,
          fontWeight: 700,     // WHY: Bold labels match the system's typographic weight
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: error ? "#DC2626" : "#1E293B",
        }}>
          {label}{required && <span style={{ color: "#8B5CF6", marginLeft: 3 }}>*</span>}
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
          background: "#FFFFFF",
          // WHY: 2px border is chunky — matches the rest of the component system
          border: `2px solid ${borderColor}`,
          borderRadius: 8,    // radius-sm for inputs
          padding: "12px 16px",
          fontSize: 15,
          color: "#1E293B",
          fontFamily: "inherit",
          outline: "none",
          width: "100%",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          // WHY: Hard shadow on focus matches the button focus pattern
          // Creates visual consistency across all interactive elements
          boxShadow: `4px 4px 0px 0px ${shadowColor}`,
          transition: [
            "border-color 150ms ease",
            "box-shadow 200ms cubic-bezier(0.34,1.56,0.64,1)",
          ].join(", "),
        }}
      />

      {error && (
        <span style={{ fontSize: 13, color: "#DC2626", fontWeight: 500 }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span style={{ fontSize: 13, color: "#64748B" }}>{hint}</span>
      )}
    </div>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Input label="Email address" type="email" placeholder="you@example.com" required />
// <Input label="Username" error="This username is already taken" />
// <Input label="Bio" hint="Max 160 characters" />
