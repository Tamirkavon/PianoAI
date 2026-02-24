// NEO-BRUTALISM SKILL — Spinner.jsx + Alert.jsx
//
// WHY THESE LOOK THIS WAY:
// Loading states in neo-brutalism are not soft spinning circles.
// The spinner uses a hard-bordered square that rotates — mechanical, not fluid.
// Alerts are bordered boxes with thick left accent — ink stamps on paper.
// No soft colors, no rounded corners, no blur. Raw structure.

// ── SPINNER ───────────────────────────────────────────────────────────────────

export function Spinner({ size = "md", label, color = "#FF6B6B" }) {
  const sizes = { sm: 24, md: 36, lg: 52 };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Rotating bordered square — mechanical feel */}
      <div style={{
        width: s, height: s,
        border: `${size === "sm" ? 3 : 4}px solid #000`,
        borderTop: `${size === "sm" ? 3 : 4}px solid ${color}`,
        borderRadius: 0,
        animation: "neo-spin 600ms linear infinite",
      }} />

      {label && (
        <span style={{
          fontWeight: 700, fontSize: 14, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#000",
        }}>
          {label}
        </span>
      )}

      <style>{`
        @keyframes neo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────

export function ProgressBar({ value = 0, label, color = "#FF6B6B", showPercent = true }) {
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {(label || showPercent) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          {label && (
            <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {label}
            </span>
          )}
          {showPercent && (
            <span style={{ fontWeight: 900, fontSize: 13 }}>{value}%</span>
          )}
        </div>
      )}

      {/* Track — bordered rectangle */}
      <div style={{
        height: 20,
        border: "3px solid #000",
        background: "#FFFFFF",
        position: "relative", overflow: "hidden",
      }}>
        {/* Fill — colored block */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          width: `${value}%`,
          background: color,
          borderRight: value < 100 ? "3px solid #000" : "none",
          transition: "width 300ms ease-out",
        }} />
      </div>
    </div>
  );
}

// ── ALERT ─────────────────────────────────────────────────────────────────────
// Bordered alert boxes with thick left accent. No rounded corners.
// The left border is 8px — the accent stripe. Right/top/bottom are 4px.

export function Alert({ type = "info", title, children, onDismiss }) {
  const types = {
    info:    { bg: "#C4B5FD", accent: "#7C3AED", icon: "ℹ" },
    success: { bg: "#BBF7D0", accent: "#16A34A", icon: "✓" },
    warning: { bg: "#FFD93D", accent: "#D97706", icon: "!" },
    error:   { bg: "#FF6B6B", accent: "#DC2626", icon: "✕" },
  };
  const t = types[type] || types.info;

  return (
    <div style={{
      display: "flex", gap: 16,
      background: t.bg,
      borderTop: "4px solid #000",
      borderRight: "4px solid #000",
      borderBottom: "4px solid #000",
      borderLeft: "8px solid #000",
      borderRadius: 0,
      padding: "16px 20px",
      boxShadow: "4px 4px 0px 0px #000",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Icon */}
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        background: "#000", color: t.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, fontWeight: 900,
      }}>
        {t.icon}
      </div>

      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 900, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: children ? 4 : 0 }}>
            {title}
          </div>
        )}
        {children && (
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.5 }}>
            {children}
          </div>
        )}
      </div>

      {onDismiss && (
        <button onClick={onDismiss} style={{
          background: "none", border: "none", cursor: "pointer",
          fontWeight: 900, fontSize: 18, color: "#000", flexShrink: 0,
          padding: 4,
        }}>✕</button>
      )}
    </div>
  );
}

// ── USAGE ─────────────────────────────────────────────────────────────────────
// <Spinner size="md" label="LOADING..." color="#FF6B6B" />
// <Spinner size="lg" color="#FFD93D" />
//
// <ProgressBar value={72} label="STORAGE USED" color="#FF6B6B" />
// <ProgressBar value={100} color="#C4B5FD" showPercent={false} />
//
// <Alert type="success" title="DEPLOYED">Your site is live.</Alert>
// <Alert type="error" title="BUILD FAILED" onDismiss={() => {}}>Check your config.</Alert>
// <Alert type="warning" title="USAGE AT 80%">Upgrade to Pro.</Alert>
