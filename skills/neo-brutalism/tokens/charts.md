# TOKENS — CHARTS & GRAPHS

## AGENT RULES FOR EXISTING CHARTS

Read this before touching any chart code.

If the project already contains charts or graphs, your job is to restyle
them — not rewrite them. The data logic, chart type, data structure,
props, and component architecture are all off-limits.

**What you MAY change:** Colors, fonts, border styles, chart container card,
grid line colors, animation timing, tooltip background and text, legend styling.

**What you MUST NOT change:** The chart library, data fetching/transformation,
chart type, component file names, business logic, JSX structure.

**Approach:** Read the component, identify which props accept style values,
apply skill tokens to those props only. Do not refactor the code structure.

---

## Library

**Recommended:** Recharts (React)

```bash
npm install recharts
```

Recharts allows per-element styling of colors, fonts, and strokes — matching
this skill's inline-style approach without fighting the library.

---

## Color Palette for Data

| Token | Value | Usage |
|---|---|---|
| `data-1` | `#FF6B6B` | First series — accent red |
| `data-2` | `#FFD93D` | Second series — vivid yellow |
| `data-3` | `#C4B5FD` | Third series — muted violet |
| `data-4` | `#000000` | Fourth series — black |
| `data-5` | `#22C55E` | Fifth series — green |
| `data-positive` | `#22C55E` | Gains, up trends |
| `data-negative` | `#FF6B6B` | Losses, down trends |
| `data-neutral` | `#C4B5FD` | Flat/unchanged |
| `data-zero-line` | `#000000` | Baseline reference |

**Fill opacity:** Series fills at 60% opacity. Strokes at 100%.

---

## Chart Container

Charts always live inside the standard hard card:

```jsx
{/* Chart card — matches HardCard in this skill */}
<div style={{
  background: "#FFFFFF",
  border: "4px solid #000",
  boxShadow: "8px 8px 0px 0px #000",
  borderRadius: 0,
  padding: "28px",
}}>
  {/* Optional header band */}
  <div style={{
    borderBottom: "4px solid #000",
    marginBottom: 24, paddingBottom: 16,
    display: "flex", justifyContent: "space-between", alignItems: "center",
  }}>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
      CHART TITLE
    </span>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)" }}>
      LAST 30 DAYS
    </span>
  </div>
  {/* Chart goes here */}
</div>
```

---

## Typography in Charts

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Chart title | Space Grotesk | 16px | 900 | `#000` |
| Axis labels | Space Grotesk | 11px | 700 | `rgba(0,0,0,0.5)` |
| Tick values | Space Grotesk | 11px | 700 | `rgba(0,0,0,0.5)` |
| Legend labels | Space Grotesk | 12px | 700 | `#000` |
| Tooltip value | Space Grotesk | 20px | 900 | `#000` |
| Tooltip label | Space Grotesk | 12px | 700 | `rgba(0,0,0,0.5)` |

All uppercase for labels and axis text.

---

## Grid & Axes

```
Grid lines:
  stroke:    rgba(0,0,0,0.12)
  style:     solid
  width:     1px

Axis lines:
  stroke:    rgba(0,0,0,0.3)
  width:     1px
  show X:    yes
  show Y:    yes

Zero baseline:
  stroke:    #000000
  width:     2px
  style:     solid
```

Grid lines should be minimal — the card border is doing structural work.
The grid supports reading, not decorating.

---

## Chart Types — Specific Rules

### Line Chart
```
Stroke width:  3px (thick, visible, matches icon strokeWidth)
Dot:           show on hover only
Dot size:      6px filled, 2px white border
Dot color:     matches series color
Area fill:     series color at 15% opacity
```

### Bar Chart
```
Bar fill:      series color at 90%
Bar radius:    0px — sharp corners, always
Bar gap:       4px between bars in group
Hover fill:    series color at 100% + black outline
```

### Area Chart
```
Stroke:        series color at 100%, 3px wide
Fill gradient: top 60% → bottom 5% opacity of series color
No radius on curves — straight line segments preferred for punk energy
```

### Donut / Pie
```
Segment gap:    4px
Stroke:         4px solid #000 between segments
Center value:   Space Grotesk 900, text-4xl, #000
Center label:   Space Grotesk 700, text-xs uppercase, muted
Hover:          segment shifts out 8px from center
```

### Stat Card with Sparkline
```
Value:          Space Grotesk 900, text-5xl, letter-spacing -0.04em
Delta:          bold, color-coded (green/red), uppercase, small
Sparkline:      height 40px, no axes, no grid, stroke 2px
```

---

## Tooltip

```jsx
{/* Neo-brutalism tooltip */}
<div style={{
  background: "#FFFFFF",
  border: "4px solid #000",
  boxShadow: "6px 6px 0px 0px #000",
  borderRadius: 0,
  padding: "12px 16px",
  fontFamily: "'Space Grotesk', sans-serif",
}}>
  <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", marginBottom: 4 }}>
    {label}
  </div>
  <div style={{ fontWeight: 900, fontSize: 22, color: "#000", letterSpacing: "-0.03em" }}>
    {value}
  </div>
</div>
```

No rounded corners. Hard black shadow. Bold value.

---

## Legend

```
Position:   top-right of chart header
Layout:     horizontal row
Swatch:     12px square (not circle) with 2px border-black
Font:       Space Grotesk 700, 12px, uppercase, tracking-wide
Color:      #000 text
```

Square swatches — circles would break the sharp-corner aesthetic.

---

## Motion

```
Bar entry:      bars grow from 0 height over 400ms ease-out
Line draw:      strokeDasharray animation, 600ms ease-out
Donut spin:     360deg in 500ms ease-out (one-time on mount)
Hover tooltip:  100ms linear (instant — mechanical feel)
```

Recharts has built-in `isAnimationActive` and `animationDuration` props.
Set `animationEasing="ease-out"` — never ease-in-out.

---

## Empty & Loading States

```jsx
{/* Loading skeleton — matches skill's card style */}
<div style={{
  background: "#EEE",
  border: "4px solid #000",
  height: 200,
  animation: "neo-shimmer 1.2s ease-in-out infinite",
}} />

{/* Empty state */}
<div style={{
  border: "4px dashed #000",
  background: "#FFFDF5",
  height: 200,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 900, fontSize: 14,
  textTransform: "uppercase", letterSpacing: "0.1em",
}}>
  NO DATA YET
</div>
```

---

## Quick Reference

| Property | Value |
|---|---|
| Data color 1 (primary) | `#FF6B6B` |
| Data color 2 | `#FFD93D` |
| Data color 3 | `#C4B5FD` |
| Positive/up | `#22C55E` |
| Negative/down | `#FF6B6B` |
| Grid line | `rgba(0,0,0,0.12)` |
| Tooltip bg | `#FFFFFF` |
| Tooltip shadow | `6px 6px 0px 0px #000` |
| Chart card border | `4px solid #000` |
| Chart card shadow | `8px 8px 0px 0px #000` |
| Font | Space Grotesk |
| Bar radius | `0px` — never |
| Tooltip radius | `0px` — never |
