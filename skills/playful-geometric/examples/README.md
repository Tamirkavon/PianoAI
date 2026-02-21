# EXAMPLES — README

Read at least one example in full before building any page with this skill.

---

## LandingPage.jsx — THE NORTH STAR

A complete SaaS marketing landing page. What to study:

**Hero section:**
- Large yellow circle behind content (25% opacity) — the main background decoration
- Dot grid pattern overlaid on the section
- Two floating geometric shapes (square + circle) with the float animation
- Spinning asterisk `✦` character
- Eyebrow label in a pill with pop shadow
- Squiggle SVG underline on a key word in the features section heading

**Features grid:**
- Icon circles using the confetti rotation (violet, pink, yellow, mint)
- Wiggle animation on icon circles when card is hovered
- Cards translate + rotate slightly on hover (the "sticker" wiggle)

**Stats bar:**
- Numbers with `text-shadow: 3px 3px 0px #1E293B` — hard text shadow
- Bold border between all four stats
- Each number uses a different confetti accent color

**Pricing section:**
- Middle card scaled up slightly (1.03) and has pink shadow
- MOST POPULAR badge: yellow, rotated -4deg, hard shadow
- Feature checkmarks: each in a small colored circle

**CTA section:**
- Purple background (full accent color section)
- White floating shapes for depth on colored background
- Yellow button (tertiary) on purple — maximum contrast and energy

---

## What Every Page Must Have Before Shipping

- [ ] Background is `#FFFDF5` — never pure white
- [ ] Every section has at least 1 decorative shape or dot pattern
- [ ] All interactive elements have pop shadows `4px 4px 0px #1E293B`
- [ ] Hover states translate AND grow shadow (the lift effect)
- [ ] Buttons are pills (rounded-full), cards are rounded-2xl
- [ ] All borders on interactive elements are 2px, not 1px
- [ ] Icon containers are always circles with colored fills
- [ ] Heading font is Outfit (700 or 800), body is Plus Jakarta Sans
- [ ] Confetti colors rotate — never use same accent for everything
- [ ] Bounce easing `cubic-bezier(0.34,1.56,0.64,1)` on all hover transitions
