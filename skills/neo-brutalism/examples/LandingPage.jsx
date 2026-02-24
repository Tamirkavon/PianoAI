// NEO-BRUTALISM SKILL — LandingPage.jsx (North Star Example)
//
// This is the reference implementation. Every pattern in this skill lives here.
// Before building anything, read this file completely.
//
// CHECKLIST — If any of these are missing, the design is incomplete:
// [ ] Cream canvas #FFFDF5
// [ ] Hard black borders on EVERY element (border-4 border-black)
// [ ] Hard shadows with zero blur everywhere
// [ ] Space Grotesk Black headings, UPPERCASE
// [ ] Button push mechanic (active translate covers shadow)
// [ ] Card lift mechanic (hover translate up + shadow grows)
// [ ] Textured backgrounds (halftone, grid, or noise)
// [ ] At least one text-stroke display heading
// [ ] Rotating sticker badges
// [ ] Color-blocked sections (cream → yellow → black → violet → red)
// [ ] Marquee or scrolling ticker
// [ ] Spinning star decorations
// [ ] No rounded corners on any interactive element
// [ ] No soft shadows anywhere

import { useState } from "react";
import {
  ArrowRight, Star, Zap, Shield, Globe, Code, Terminal,
  CheckCircle, Users, TrendingUp, Award, Menu, X,
} from "lucide-react";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const C = {
  canvas:    "#FFFDF5",
  ink:       "#000000",
  accent:    "#FF6B6B",
  secondary: "#FFD93D",
  muted:     "#C4B5FD",
  white:     "#FFFFFF",
};

const SHADOW = {
  xs:   "2px 2px 0px 0px #000",
  sm:   "4px 4px 0px 0px #000",
  md:   "6px 6px 0px 0px #000",
  base: "8px 8px 0px 0px #000",
  lg:   "12px 12px 0px 0px #000",
  xl:   "16px 16px 0px 0px #000",
  xxl:  "20px 20px 0px 0px #000",
};

const FONT = "'Space Grotesk', system-ui, sans-serif";

// ── REUSABLE MICRO-COMPONENTS ─────────────────────────────────────────────────

function PushButton({ children, bg = C.accent, textColor = C.ink, onClick, size = "md", fullWidth }) {
  const [pressed, setPressed] = useState(false);
  const [hov, setHov]         = useState(false);
  const heights = { sm: 44, md: 52, lg: 60, xl: 72 };
  const fonts   = { sm: 12, md: 14, lg: 16, xl: 18 };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        height: heights[size], padding: "0 " + (heights[size] * 0.6) + "px",
        background: hov ? (bg === C.accent ? "#e85555" : bg) : bg,
        color: textColor, border: "4px solid #000", borderRadius: 0,
        fontFamily: FONT, fontWeight: 700, fontSize: fonts[size],
        textTransform: "uppercase", letterSpacing: "0.08em",
        cursor: "pointer", userSelect: "none", outline: "none",
        display: "inline-flex", alignItems: "center", gap: 8,
        width: fullWidth ? "100%" : undefined, justifyContent: fullWidth ? "center" : undefined,
        boxShadow: pressed ? "none" : SHADOW.md,
        transform: pressed ? "translate(6px,6px)" : "none",
        transition: "all 100ms linear",
      }}
    >
      {children}
    </button>
  );
}

function HardCard({ children, style: ext, bg = C.white, shadow = "base", hoverLift = true }) {
  const [hov, setHov] = useState(false);
  const shadowMap = { sm: SHADOW.sm, base: SHADOW.base, lg: SHADOW.lg, xl: SHADOW.xl };
  const hoverShadowMap = { sm: SHADOW.md, base: SHADOW.lg, lg: SHADOW.xl, xl: SHADOW.xxl };
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg, border: "4px solid #000", borderRadius: 0,
        boxShadow: hoverLift && hov ? hoverShadowMap[shadow] : shadowMap[shadow],
        transform: hoverLift && hov ? "translateY(-4px)" : "none",
        transition: "all 200ms ease-out",
        ...ext,
      }}
    >
      {children}
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [ctaP, setCtaP] = useState(false);

  return (
    <>
      <nav style={{ borderBottom: "4px solid #000", background: C.canvas, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo sticker */}
          <a href="/" style={{
            background: C.secondary, border: "4px solid #000", boxShadow: SHADOW.sm,
            padding: "6px 16px", fontFamily: FONT, fontWeight: 900, fontSize: 20,
            textTransform: "uppercase", color: "#000", textDecoration: "none",
            transform: "rotate(-1.5deg)", display: "inline-block",
          }}>
            ★ GETDRIP
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {["SKILLS", "PRICING", "DOCS", "BLOG"].map(label => (
              <NavLink key={label} href={`/${label.toLowerCase()}`}>{label}</NavLink>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onMouseDown={() => setCtaP(true)}
              onMouseUp={() => setCtaP(false)}
              onMouseLeave={() => setCtaP(false)}
              style={{
                height: 44, padding: "0 20px", background: C.accent, color: "#000",
                border: "4px solid #000", borderRadius: 0, cursor: "pointer",
                fontFamily: FONT, fontWeight: 700, fontSize: 13, textTransform: "uppercase",
                letterSpacing: "0.08em", outline: "none",
                boxShadow: ctaP ? "none" : SHADOW.sm,
                transform: ctaP ? "translate(4px,4px)" : "none",
                transition: "all 100ms linear",
              }}
            >
              GET STARTED
            </button>
            <button
              onClick={() => setOpen(!open)}
              style={{
                width: 44, height: 44, background: open ? "#000" : C.canvas,
                border: "4px solid #000", borderRadius: 0, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 5, boxShadow: SHADOW.sm,
              }}
            >
              {open
                ? <X size={20} color="#FFF" strokeWidth={3} />
                : <Menu size={20} color="#000" strokeWidth={3} />
              }
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ borderBottom: "4px solid #000", background: C.canvas, padding: "16px 24px 24px", zIndex: 99 }}>
          {["SKILLS", "PRICING", "DOCS", "BLOG"].map((label, i, arr) => (
            <a key={label} href={`/${label.toLowerCase()}`} style={{
              display: "block", padding: "14px 0",
              borderBottom: i < arr.length - 1 ? "2px solid #000" : "none",
              fontFamily: FONT, fontWeight: 700, fontSize: 16,
              textTransform: "uppercase", color: "#000", textDecoration: "none",
            }}>{label}</a>
          ))}
          <div style={{ marginTop: 16 }}>
            <PushButton fullWidth>GET STARTED FREE</PushButton>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: hov ? "6px 12px" : "6px 12px",
        fontFamily: FONT, fontWeight: 700, fontSize: 14,
        textTransform: "uppercase", letterSpacing: "0.08em",
        textDecoration: "none", color: "#000",
        border: hov ? "3px solid #000" : "3px solid transparent",
        background: hov ? C.accent : "transparent",
        boxShadow: hov ? SHADOW.xs : "none",
        transition: "all 100ms linear",
      }}
    >{children}</a>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────

function Ticker() {
  const items = ["★ DESIGN SKILLS", "★ ONE COMMAND", "★ ANY PLATFORM", "★ AI-READY", "★ OPEN SOURCE", "★ 5 SKILLS NOW"];
  const doubled = [...items, ...items];
  return (
    <div style={{ borderBottom: "4px solid #000", background: "#000", overflow: "hidden", height: 44, display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: FONT, fontWeight: 900, fontSize: 14,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: i % 2 === 0 ? C.secondary : C.accent,
            marginRight: 48,
          }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{
      background: C.canvas, borderBottom: "4px solid #000",
      backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
      backgroundSize: "20px 20px",
      padding: "80px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

        {/* Left — text */}
        <div>
          {/* Eyebrow badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: C.muted, border: "3px solid #000",
            boxShadow: SHADOW.xs, padding: "4px 14px", marginBottom: 24,
            fontFamily: FONT, fontWeight: 900, fontSize: 12,
            textTransform: "uppercase", letterSpacing: "0.15em",
            transform: "rotate(-1deg)",
          }}>
            <Star size={12} strokeWidth={3} fill="#000" /> NOW IN BETA
          </div>

          {/* Hero headline — text stroke technique */}
          <h1 style={{ fontFamily: FONT, fontWeight: 900, lineHeight: 0.9, marginBottom: 24, letterSpacing: "-0.04em" }}>
            <span style={{ display: "block", fontSize: "clamp(52px, 7vw, 96px)", textTransform: "uppercase", color: "#000" }}>
              STOP
            </span>
            <span style={{
              display: "block", fontSize: "clamp(52px, 7vw, 96px)", textTransform: "uppercase",
              WebkitTextStroke: "3px #000", color: "transparent",
            }}>
              SHIPPING
            </span>
            <span style={{ display: "block", fontSize: "clamp(52px, 7vw, 96px)", textTransform: "uppercase", color: C.accent }}>
              GENERIC
            </span>
            <span style={{ display: "block", fontSize: "clamp(52px, 7vw, 96px)", textTransform: "uppercase", color: "#000" }}>
              UIs.
            </span>
          </h1>

          <p style={{
            fontFamily: FONT, fontWeight: 700, fontSize: 18, lineHeight: 1.6,
            color: "#000", marginBottom: 32, maxWidth: 480,
          }}>
            One terminal command. Your AI agent gets a complete design system
            and transforms your UI into something people actually remember.
          </p>

          {/* Command pill */}
          <div style={{
            display: "inline-flex", alignItems: "center",
            background: "#000", border: "4px solid #000",
            boxShadow: SHADOW.base, marginBottom: 32,
            fontFamily: "'Courier New', monospace", overflow: "hidden",
          }}>
            <span style={{ color: C.secondary, padding: "14px 16px", fontWeight: 700, fontSize: 16, borderRight: "4px solid #555" }}>$</span>
            <span style={{ color: "#FFF", padding: "14px 20px", fontWeight: 700, fontSize: 16 }}>npx getdrip add retro-terminal</span>
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PushButton size="lg" bg={C.accent}>
              BROWSE SKILLS <ArrowRight size={18} strokeWidth={3} />
            </PushButton>
            <PushButton size="lg" bg={C.white}>
              VIEW ON GITHUB
            </PushButton>
          </div>

          {/* Social proof row */}
          <div style={{ display: "flex", gap: 24, marginTop: 32, alignItems: "center" }}>
            {["5 SKILLS", "2K INSTALLS", "MIT LICENSE"].map((t, i) => (
              <div key={i} style={{ fontFamily: FONT, fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6 }}>
                <Star size={12} strokeWidth={0} fill={C.accent} /> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual chaos zone */}
        <div style={{ position: "relative", height: 520 }}>
          {/* Main big card */}
          <div style={{
            position: "absolute", top: 40, left: 40, right: 0,
            background: C.secondary, border: "4px solid #000",
            boxShadow: SHADOW.xl, padding: 32, transform: "rotate(2deg)",
          }}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              BEFORE GETDRIP
            </div>
            {["bg-gray-100", "rounded-lg", "shadow-sm", "text-gray-600"].map(cls => (
              <div key={cls} style={{ background: "#E5E7EB", padding: "8px 12px", marginBottom: 8, fontSize: 13, fontFamily: "'Courier New', monospace", color: "#666" }}>
                className="{cls}"
              </div>
            ))}
          </div>

          {/* Second card underneath */}
          <div style={{
            position: "absolute", top: 200, left: 0, right: 40,
            background: C.accent, border: "4px solid #000",
            boxShadow: SHADOW.xl, padding: 32, transform: "rotate(-1.5deg)",
          }}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, color: "#000" }}>
              AFTER GETDRIP ✓
            </div>
            {["border-4 border-black", "shadow-[8px_8px_0_#000]", "font-black uppercase", "bg-neo-accent"].map(cls => (
              <div key={cls} style={{ background: "rgba(0,0,0,0.12)", border: "2px solid #000", padding: "8px 12px", marginBottom: 8, fontSize: 13, fontFamily: "'Courier New', monospace", color: "#000" }}>
                className="{cls}"
              </div>
            ))}
          </div>

          {/* Floating star badge */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            background: "#000", border: "4px solid #000",
            boxShadow: SHADOW.md, padding: "12px 16px",
            fontFamily: FONT, fontWeight: 900, fontSize: 12,
            textTransform: "uppercase", color: C.secondary,
            transform: "rotate(6deg)", animation: "spin-slow 10s linear infinite",
          }}>
            <Star size={24} color={C.secondary} strokeWidth={0} fill={C.secondary} />
          </div>

          {/* Floating "ONE CMD" sticker */}
          <div style={{
            position: "absolute", bottom: 60, right: 0,
            background: C.muted, border: "3px solid #000",
            boxShadow: SHADOW.sm, padding: "6px 14px", borderRadius: 9999,
            fontFamily: FONT, fontWeight: 900, fontSize: 11,
            textTransform: "uppercase", letterSpacing: "0.1em",
            transform: "rotate(-3deg)",
          }}>
            ONE CMD
          </div>

          <style>{`@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────────────────────

function Stats() {
  const stats = [
    { value: "5",    label: "Design Skills",   bg: C.accent },
    { value: "2K+",  label: "npm Installs",    bg: C.secondary },
    { value: "1",    label: "Command to Use",  bg: C.muted },
    { value: "MIT",  label: "Open Source",     bg: "#000", textColor: C.secondary },
  ];

  return (
    <section style={{ borderBottom: "4px solid #000" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {stats.map((s, i) => (
          <StatBlock key={i} {...s} last={i === stats.length - 1} />
        ))}
      </div>
    </section>
  );
}

function StatBlock({ value, label, bg, textColor = "#000", last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? (bg === "#000" ? "#111" : bg) : bg,
        borderRight: last ? "none" : "4px solid #000",
        padding: "40px 32px",
        transition: "transform 150ms ease-out",
        transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 56, lineHeight: 1, color: textColor, letterSpacing: "-0.04em", marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: textColor }}>
        {label}
      </div>
    </div>
  );
}

// ── FEATURES ─────────────────────────────────────────────────────────────────

function Features() {
  const features = [
    { icon: Terminal, title: "ONE COMMAND",      body: "npx getdrip add retro-terminal. That's it. Skill downloads, dependencies install, agent prompt is printed.", bg: C.accent },
    { icon: Code,     title: "AI-NATIVE",        body: "Skills are structured for AI agents to read, parse, and implement accurately. Not prompts — full design systems.", bg: C.secondary },
    { icon: Globe,    title: "ANY PLATFORM",     body: "Lovable, Cursor, Bolt, Claude Code — if it has a terminal panel, getdrip works. No exceptions.", bg: C.muted },
    { icon: Shield,   title: "YOUR CODE STAYS",  body: "getdrip never touches your app code. It drops a design system folder. The agent does the applying.", bg: C.white },
    { icon: Zap,      title: "INSTANT STYLE",    body: "From bland defaults to a full design personality in one agent session. Not templates — actual design systems.", bg: C.accent },
    { icon: Users,    title: "CONSISTENT",       body: "Every page, every component, every new feature — styled automatically in the same system. No drift.", bg: C.secondary },
  ];

  return (
    <section style={{ borderBottom: "4px solid #000", padding: "80px 24px", background: C.canvas }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: "inline-block", background: C.secondary, border: "3px solid #000",
            boxShadow: SHADOW.xs, padding: "4px 14px", marginBottom: 16,
            fontFamily: FONT, fontWeight: 900, fontSize: 12,
            textTransform: "uppercase", letterSpacing: "0.15em", transform: "rotate(-1deg)",
          }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "#000", lineHeight: 0.9 }}>
            DESIGN SKILLS,<br />
            <span style={{ WebkitTextStroke: "2px #000", color: "transparent" }}>NOT TEMPLATES.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {features.map((f, i) => (
            <FeatureCell key={i} {...f} idx={i} total={features.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ icon: Icon, title, body, bg, idx, total }) {
  const [hov, setHov] = useState(false);
  const cols = 3;
  const isLastRow = idx >= total - cols;
  const isLastCol = (idx + 1) % cols === 0;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? bg : C.white,
        borderRight: !isLastCol ? "4px solid #000" : "none",
        borderBottom: !isLastRow ? "4px solid #000" : "none",
        border: `4px solid #000`,
        padding: "36px 32px",
        transition: "background 150ms linear, transform 150ms ease-out",
        transform: hov ? "translateY(-2px)" : "none",
        position: "relative",
      }}
    >
      <div style={{
        width: 52, height: 52, background: bg, border: "4px solid #000",
        boxShadow: SHADOW.sm, display: "flex", alignItems: "center",
        justifyContent: "center", marginBottom: 20,
      }}>
        <Icon size={24} strokeWidth={3} color="#000" />
      </div>
      <h3 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#000", marginBottom: 12 }}>
        {title}
      </h3>
      <p style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, lineHeight: 1.6, color: "#000" }}>
        {body}
      </p>
    </div>
  );
}

// ── SKILLS SHOWCASE ───────────────────────────────────────────────────────────

function SkillsShowcase() {
  const skills = [
    { name: "RETRO TERMINAL",    mood: "Dark / Hacker",    badge: "V1.0", bg: "#000", fg: "#39FF14", accentBg: "#39FF14" },
    { name: "PLAYFUL GEOMETRIC", mood: "Light / Bouncy",   badge: "V1.0", bg: C.accent, fg: "#000", accentBg: C.secondary },
    { name: "LINEAR MODERN",     mood: "Dark / Premium",   badge: "V1.0", bg: "#0A0A0F", fg: "#FFF", accentBg: "#6366F1" },
    { name: "MINIMALIST MONO",   mood: "Light / Editorial", badge: "V1.0", bg: "#FFF", fg: "#000", accentBg: "#000" },
    { name: "CLAY PREMIUM",      mood: "Light / Tactile",  badge: "V1.0", bg: "#F4F1FA", fg: "#332F3A", accentBg: "#7C3AED" },
  ];

  return (
    <section style={{ background: "#000", borderBottom: "4px solid #000", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: C.secondary, lineHeight: 0.9, marginBottom: 16 }}>
            5 SKILLS.<br />UNLIMITED STYLES.
          </h2>
          <p style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: "#999", maxWidth: 480 }}>
            Each skill is a complete design system. Components, tokens, typography, motion — everything an AI agent needs.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, border: "4px solid #FFF" }}>
          {skills.map((s, i) => (
            <SkillCard key={i} {...s} last={i === skills.length - 1} />
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <PushButton bg={C.secondary} size="lg">
            BROWSE ALL SKILLS <ArrowRight size={18} strokeWidth={3} />
          </PushButton>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ name, mood, badge, bg, fg, accentBg, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? (bg === "#000" ? "#111" : bg) : bg,
        borderRight: !last ? "4px solid #FFF" : "none",
        padding: "24px 20px",
        transition: "transform 150ms ease-out",
        transform: hov ? "translateY(-4px)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Mini preview swatch */}
      <div style={{ height: 80, background: accentBg, border: `3px solid ${fg}`, marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 6, border: `2px solid ${fg}`, opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 40, height: 8, background: fg, opacity: 0.6 }} />
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "-0.01em", color: fg, marginBottom: 6 }}>
        {name}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: fg, opacity: 0.6, marginBottom: 12 }}>
        {mood}
      </div>
      <div style={{ display: "inline-block", background: accentBg, border: `2px solid ${fg}`, padding: "2px 8px", borderRadius: 9999, fontFamily: FONT, fontWeight: 900, fontSize: 10, color: fg, textTransform: "uppercase" }}>
        {badge}
      </div>
    </div>
  );
}

// ── HOW TO USE ────────────────────────────────────────────────────────────────

function HowToUse() {
  const steps = [
    { num: "01", title: "BROWSE SKILLS",      body: "Pick a design personality from the getdrip library. Preview it. Copy the command.", icon: Globe },
    { num: "02", title: "RUN THE COMMAND",    body: "npx getdrip add <skill-name>. The skill folder downloads into your project root.", icon: Terminal },
    { num: "03", title: "PASTE THE PROMPT",   body: "The CLI prints an agent prompt. Paste it into Cursor, Lovable, Bolt, or Claude Code.", icon: Code },
    { num: "04", title: "WATCH IT TRANSFORM", body: "The agent reads the skill and redesigns your UI to match. Every page, automatically.", icon: TrendingUp },
  ];

  return (
    <section style={{ borderBottom: "4px solid #000", background: C.secondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "#000", lineHeight: 0.9, marginBottom: 48 }}>
          HOW IT<br />WORKS.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "4px solid #000" }}>
          {steps.map((s, i) => (
            <StepCell key={i} {...s} last={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCell({ num, title, body, icon: Icon, last }) {
  return (
    <div style={{
      background: C.white, borderRight: !last ? "4px solid #000" : "none",
      padding: "32px 28px",
    }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 48, color: C.accent, lineHeight: 1, marginBottom: 16, letterSpacing: "-0.04em" }}>{num}</div>
      <h3 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#000", marginBottom: 12 }}>{title}</h3>
      <p style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, lineHeight: 1.6, color: "#000" }}>{body}</p>
    </div>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────

function Pricing() {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      sub: "FOREVER",
      bg: C.white,
      features: ["5 free skills", "npx getdrip add", "Open source CLI", "Community support"],
      cta: "START FREE", ctaBg: C.accent, popular: false,
    },
    {
      name: "PRO",
      price: "$12",
      sub: "PER MONTH",
      bg: C.accent,
      features: ["All free skills", "Premium skills (coming)", "Priority updates", "Email support"],
      cta: "GET PRO", ctaBg: "#000", popular: true,
    },
    {
      name: "TEAM",
      price: "$49",
      sub: "PER MONTH",
      bg: C.white,
      features: ["Everything in Pro", "Team skill sharing", "Custom skill creation", "Slack support"],
      cta: "CONTACT US", ctaBg: C.secondary, popular: false,
    },
  ];

  return (
    <section style={{ borderBottom: "4px solid #000", background: C.canvas, padding: "80px 24px",
      backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "#000", lineHeight: 0.9 }}>
            SIMPLE<br />PRICING.
          </h2>
          <div style={{ background: C.muted, border: "3px solid #000", boxShadow: SHADOW.xs, padding: "6px 14px", transform: "rotate(2deg)", fontFamily: FONT, fontWeight: 900, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            NO HIDDEN FEES
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "4px solid #000" }}>
          {plans.map((p, i) => (
            <PricingCard key={i} {...p} last={i === plans.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, sub, bg, features, cta, ctaBg, popular, last }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{ background: bg, borderRight: !last ? "4px solid #000" : "none", padding: "40px 32px", position: "relative" }}>
      {popular && (
        <div style={{
          position: "absolute", top: -16, left: "50%", transform: "translateX(-50%) rotate(-2deg)",
          background: "#000", border: "3px solid #000", boxShadow: SHADOW.xs,
          padding: "4px 16px", borderRadius: 9999,
          fontFamily: FONT, fontWeight: 900, fontSize: 11,
          textTransform: "uppercase", letterSpacing: "0.1em", color: C.secondary,
          whiteSpace: "nowrap",
        }}>★ MOST POPULAR</div>
      )}
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", color: "#000", marginBottom: 8 }}>{name}</div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 56, letterSpacing: "-0.04em", color: "#000", lineHeight: 1, marginBottom: 4 }}>{price}</div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "#000", marginBottom: 32 }}>{sub}</div>
      <div style={{ borderTop: "3px solid #000", paddingTop: 24, marginBottom: 32 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            <CheckCircle size={16} strokeWidth={3} color="#000" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: "#000" }}>{f}</span>
          </div>
        ))}
      </div>
      <button
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: "100%", height: 52,
          background: ctaBg, color: ctaBg === "#000" ? C.secondary : "#000",
          border: "4px solid #000", borderRadius: 0, cursor: "pointer",
          fontFamily: FONT, fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em",
          boxShadow: pressed ? "none" : SHADOW.md,
          transform: pressed ? "translate(6px,6px)" : "none",
          transition: "all 100ms linear",
        }}
      >{cta}</button>
    </div>
  );
}

// ── CTA BANNER ────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section style={{ background: C.accent, borderBottom: "4px solid #000", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <div>
          <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: "clamp(36px, 5vw, 64px)", textTransform: "uppercase", letterSpacing: "-0.03em", color: "#000", lineHeight: 0.9, marginBottom: 16 }}>
            READY TO<br />
            <span style={{ WebkitTextStroke: "2px #000", color: "transparent" }}>DRIP?</span>
          </h2>
          <p style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: "#000" }}>
            One command away from a design system.
          </p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <PushButton bg="#000" textColor={C.secondary} size="xl">
            GET STARTED FREE <ArrowRight size={20} strokeWidth={3} />
          </PushButton>
          <PushButton bg={C.white} size="xl">
            VIEW DOCS
          </PushButton>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "4px solid #000", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div style={{
          background: C.secondary, border: "4px solid #FFF",
          boxShadow: "4px 4px 0 0 #FFF", padding: "8px 18px",
          fontFamily: FONT, fontWeight: 900, fontSize: 18,
          textTransform: "uppercase", color: "#000", transform: "rotate(-1deg)",
        }}>
          ★ GETDRIP
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["GITHUB", "NPM", "TWITTER", "DOCS"].map(l => (
            <a key={l} href="#" style={{
              padding: "6px 12px", border: "2px solid #555",
              fontFamily: FONT, fontWeight: 700, fontSize: 12,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#FFF", textDecoration: "none",
              transition: "all 100ms linear",
            }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          © 2025 GETDRIP · MIT LICENSE
        </div>
      </div>
    </footer>
  );
}

// ── PAGE COMPOSITION ──────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ background: C.canvas, fontFamily: FONT }}>
      <Navbar />
      <Ticker />
      <Hero />
      <Stats />
      <Features />
      <SkillsShowcase />
      <HowToUse />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
