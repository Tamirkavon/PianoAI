// PLAYFUL GEOMETRIC SKILL — Alert.jsx
//
// WHY THIS LOOKS THE WAY IT DOES:
// Alerts use the confetti accent colors as their background tints, with a
// 2px left border accent and the system's chunky typography.
// They're friendly, not clinical — "Oops!" not "Error 400".
// The icon sits in a small colored circle (never floating alone).

import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

const variants = {
  info: {
    bg: "#EDE9FE", border: "#8B5CF6", text: "#4C1D95",
    icon: Info, iconBg: "#8B5CF6",
  },
  success: {
    bg: "#D1FAE5", border: "#34D399", text: "#064E3B",
    icon: CheckCircle, iconBg: "#34D399",
  },
  warning: {
    bg: "#FEF3C7", border: "#FBBF24", text: "#78350F",
    icon: AlertTriangle, iconBg: "#FBBF24",
  },
  error: {
    bg: "#FEE2E2", border: "#F472B6", text: "#831843",
    icon: XCircle, iconBg: "#F472B6",
  },
};

export function Alert({ type = "info", title, children }) {
  const v = variants[type];
  const Icon = v.icon;

  return (
    <div style={{
      display: "flex",
      gap: 14,
      padding: "16px 20px",
      background: v.bg,
      border: "2px solid #1E293B",
      borderLeft: `4px solid ${v.border}`,
      borderRadius: 12,
      boxShadow: "3px 3px 0px 0px #1E293B",
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }}>
      {/* Icon in circle — never floating alone */}
      <div style={{
        width: 36, height: 36,
        borderRadius: "50%",
        background: v.iconBg,
        border: "2px solid #1E293B",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
      }}>
        <Icon size={16} strokeWidth={2.5} color="#FFFFFF" />
      </div>

      <div style={{ flex: 1 }}>
        {title && (
          <div style={{
            fontSize: 14, fontWeight: 700, color: v.text,
            marginBottom: children ? 4 : 0,
            fontFamily: '"Outfit", sans-serif',
          }}>
            {title}
          </div>
        )}
        {children && (
          <div style={{ fontSize: 14, color: v.text, lineHeight: 1.6, opacity: 0.9 }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// ── USAGE EXAMPLES ────────────────────────────────────────────────────────────
// <Alert type="success" title="You're all set!">Your changes have been saved.</Alert>
// <Alert type="warning" title="Heads up">You're approaching your plan limit.</Alert>
// <Alert type="error" title="Oops! Something went wrong">Please try again.</Alert>
// <Alert type="info" title="New feature">Check out what's new this month.</Alert>
