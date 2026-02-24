---
name: project-quality-review
description: >
  Comprehensive project health audit for a React 19 + Vite 6 + TypeScript + Tailwind + Tone.js
  piano/music game app deployed via AppDeploy. Use this skill whenever the user asks to review,
  audit, check, or improve the project — from any angle: code quality, bugs, security, UX,
  performance, accessibility, or business readiness. Also trigger when the user asks things like
  "is this production-ready?", "what's broken?", "review my code", "security check", or
  "what should I fix?". Even if they only mention one concern, run the full audit — they almost
  always benefit from the complete picture.
---

# Project Quality Review — Full-Stack Audit Skill

You are acting simultaneously as a senior engineer, product manager, business analyst, and security
reviewer. Your job is to systematically audit this project across all four lenses and produce an
honest, actionable report — no sugar-coating, but no alarmism either.

---

## 1. Project Context

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Build Tool | Vite 6 |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| Fonts | Google Fonts — Poppins (headings) + Inter (body) |
| Audio | Tone.js 14 (PolySynth / triangle oscillator, no audio files) |
| Animation | HTML Canvas API + `requestAnimationFrame` (60fps) |
| Icons | Lucide React |
| Input | Pointer Events API + KeyboardEvent API |
| State | React Context + useState / useCallback / useRef |
| Routing | None — custom `Screen` union type via Context |
| Deployment | AppDeploy (frontend-only static hosting) |
| Storage | `localStorage` (tutorial seen flag) |

---

## 2. How to Run the Audit

Work through each section below in order. For each finding, tag it with:

- **[CRITICAL]** — Breaks the app or exposes users to real harm. Fix immediately.
- **[HIGH]** — Significant UX, security, or correctness issue. Fix before next release.
- **[MEDIUM]** — Noticeable friction or technical debt. Fix in next sprint.
- **[LOW]** — Polish, nice-to-have, or future-proofing. Address when convenient.
- **[PASS]** — Looks good. State why briefly.

At the end, compile a ranked action list grouped by severity.

---

## 3. Developer Lens

### 3.1 TypeScript Strictness
- Is `strict: true` (or equivalent) set in `tsconfig.json`?
- Are there any `any` types, `@ts-ignore`, or `as unknown as X` casts? Note each one.
- Are all React props and Context values fully typed (no implicit `{}` or missing generics)?
- Is the `Screen` union type exhaustive — does every screen variant have a handler?

### 3.2 React Correctness
- Check every `useEffect` for missing or incorrect dependency arrays.
- Check every `useCallback` / `useMemo` — are they actually preventing re-renders, or just adding noise?
- Are there any direct DOM mutations that bypass React's reconciler?
- Does anything read or write `localStorage` inside render (vs. inside effects or event handlers)?
- Is Tone.js initialized inside a user-gesture handler (required by browsers)? Verify `AudioContext` is started only after a user interaction.
- Are Canvas `requestAnimationFrame` loops properly cancelled on component unmount (via `cancelAnimationFrame` in a cleanup function)?
- Are there any memory leaks: event listeners added but not removed, Tone.js synths not disposed?

### 3.3 State & Context
- Is the Context split appropriately (UI state vs. game state vs. audio state) or is one giant Context causing unnecessary re-renders?
- Are `useRef` values used for timing/animation state (not `useState`) to avoid re-renders during the 60fps loop?
- Is the `Screen` navigation logic centralized and easy to follow?

### 3.4 Audio (Tone.js)
- Is the PolySynth properly disposed when the component unmounts or the game ends?
- Are note release/sustain times configured to avoid overlapping ghost notes?
- Is there a maximum polyphony cap to prevent CPU overload on rapid input?
- Does the audio work on iOS Safari (requires `Tone.start()` inside a touch handler)?

### 3.5 Canvas Animation
- Is the canvas resolution set to `devicePixelRatio` for sharp rendering on retina displays?
- Is the animation loop framerate-independent (delta-time based), or will it run faster/slower on high-refresh-rate displays?
- Is the canvas properly resized on window resize events?
- Are draw calls batched efficiently (minimal state changes per frame)?

### 3.6 Input Handling
- Do Pointer Events correctly prevent default browser scroll/zoom on touch devices?
- Is keyboard input guarded against repeat-fire (holding a key shouldn't retrigger note-on repeatedly)?
- Are there edge cases where a `pointerup` is missed (e.g., pointer leaves the key before releasing)?

### 3.7 Build & Bundle
- Run or simulate `vite build` — are there any warnings or errors?
- Check bundle size. For a music game, a reasonable target is <500KB gzipped total.
- Are Google Fonts loaded with `display=swap` and preconnect hints?
- Is Tailwind's `content` glob correct so unused styles are purged in production?
- Are there any unused dependencies in `package.json`?

### 3.8 Code Quality
- Are there any TODO/FIXME/HACK comments that indicate unfinished work?
- Is there consistent error handling (try/catch around Tone.js init, localStorage reads)?
- Is `localStorage` read with a try/catch (private browsing mode throws on access in some browsers)?

---

## 4. Product Manager Lens

### 4.1 Core User Flows
Walk through each flow mentally (or with the running app if accessible):

1. **First-time user** — lands on app, sees tutorial, understands how to play.
2. **Returning user** — tutorial is skipped (localStorage flag), goes straight to game.
3. **Playing the game** — notes fall, piano keys respond to touch/click/keyboard, audio plays.
4. **Scoring / feedback** — player understands how they're doing in real time.
5. **Restarting** — RotateCcw icon works, state fully resets (no ghost notes, no stuck animation).
6. **Navigating back** — ArrowLeft icon works from every screen it appears on.

For each flow: does it work? Is it intuitive? Is the feedback (visual + audio) satisfying?

### 4.2 Onboarding & Tutorial
- Is the tutorial clear enough for someone who has never played?
- Is the "skip tutorial" path obvious for returning users?
- Is the `localStorage` flag correctly set so the tutorial only shows once?

### 4.3 Responsive Design
- Does the layout work on mobile (portrait + landscape)?
- Is the piano keyboard usable on small screens (minimum key width for fat fingers)?
- Does the canvas resize gracefully, or does it overflow/clip?
- Is the font size readable on mobile without zooming?

### 4.4 Performance & Feel
- Does the 60fps animation actually hit 60fps on a mid-range device?
- Is there any visible lag between touch/key input and audio + visual feedback?
- Does the app feel snappy on initial load, or is there a noticeable blank screen?

### 4.5 Feedback & Error States
- What happens if Tone.js fails to initialize (blocked autoplay policy)?
- What happens if the browser doesn't support Pointer Events or Canvas?
- Are there any unhandled promise rejections visible in the console?
- Does the UI show any helpful message when something goes wrong?

### 4.6 Accessibility (a11y)
- Do all interactive elements (piano keys, buttons) have accessible labels (`aria-label`)?
- Is the app usable without a mouse (keyboard-only navigation through menus)?
- Are focus states visible?
- Does the color contrast meet WCAG AA (4.5:1 for text)?
- Is there any reliance on color alone to convey information (e.g., correct/incorrect note)?

---

## 5. Business Analyst Lens

### 5.1 Feature Completeness
Against what a music education / casual game app typically needs:
- [ ] Clear win/lose or scoring condition
- [ ] Difficulty levels or progression
- [ ] Score persistence (localStorage or beyond)
- [ ] Sound feedback for correct vs. incorrect notes (distinct tones)
- [ ] Visual feedback for correct vs. incorrect notes
- [ ] Retry / restart capability
- [ ] Help / instructions accessible at any time (HelpCircle icon?)
- [ ] Works offline (no server dependency — good for static hosting)

Note which are present, missing, or partially implemented.

### 5.2 Analytics & Observability
- Is there any error tracking (Sentry, etc.)? If not, is it needed?
- Is there any usage analytics? For a game, knowing session length, completion rate, and popular keys helps iterate.
- Are there any console.log statements left in production code?

### 5.3 Deployment & Ops
- Is the AppDeploy configuration correct for a Vite static build? (output dir: `dist`)
- Is there a `404.html` fallback or redirect for direct URL access? (Less critical with no routing, but worth checking.)
- Are environment variables handled correctly (no secrets in client-side code — there shouldn't be any for this stack, but verify)?
- Is there a `robots.txt` or `sitemap.xml` if SEO matters?

### 5.4 Browser & Device Support
Define and verify the target matrix:
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge) — required
- iOS Safari 16+ — required (for touch input)
- Android Chrome — required
- Firefox on desktop — Tone.js + Canvas should work, but verify
- Older browsers — not required, but graceful degradation?

### 5.5 Licensing
- Are all dependencies using permissive licenses (MIT, ISC, Apache-2)?
  - React: MIT ✓
  - Vite: MIT ✓
  - Tone.js: MIT ✓
  - Tailwind: MIT ✓
  - Lucide React: ISC ✓
  - Google Fonts (Poppins, Inter): OFL ✓
- Are there any GPL or copyleft licenses that could affect distribution?

---

## 6. Security Lens

### 6.1 Client-Side Data
- `localStorage` only stores a tutorial-seen boolean. Verify no sensitive data (scores, user info) is stored in plaintext.
- Is there any user-generated content that gets rendered as HTML? If so, check for XSS.
- Are there any `dangerouslySetInnerHTML` usages? If yes, flag each one.

### 6.2 Third-Party Dependencies
- Run (or simulate) `npm audit` — are there any known vulnerabilities in the dependency tree?
- Are dependencies pinned to specific versions (no `*` or loose ranges that could pull in a compromised version)?
- Google Fonts: loaded from `fonts.googleapis.com` — this is a third-party network request. Does the privacy policy (if any) mention it?

### 6.3 Content Security Policy (CSP)
- Is there a CSP header or meta tag?
- If not, recommend a strict CSP appropriate for this stack:
  ```
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  connect-src 'none';
  media-src 'none';
  img-src 'self' data:;
  ```
  Note: Tailwind's inline styles may require `'unsafe-inline'` for `style-src`.

### 6.4 Subresource Integrity
- If Google Fonts or any CDN resource is loaded via `<link>` or `<script>`, is SRI used?
  (Google Fonts dynamically serves CSS so SRI isn't directly applicable, but note the trust model.)

### 6.5 Supply Chain
- Is `package-lock.json` or `yarn.lock` committed and up to date?
- Is there a `.npmrc` that pins the registry to the official npm registry?

### 6.6 Deployment Security
- AppDeploy serves over HTTPS — confirm.
- Are there any hardcoded API keys, tokens, or secrets anywhere in the codebase? (There shouldn't be for this stack — verify with a grep for `API_KEY`, `SECRET`, `TOKEN`, `password`.)

---

## 7. Output Format

After completing the audit, present findings in this structure:

```
## Audit Summary

### 🔴 Critical Issues (fix now)
- [description + file/line if known + recommended fix]

### 🟠 High Priority
- ...

### 🟡 Medium Priority
- ...

### 🟢 Low / Polish
- ...

### ✅ Things That Look Good
- ...

### 📋 Recommended Action Plan
1. (highest severity first, grouped by theme)
2. ...
```

Be specific. Reference file names, component names, and hook names when possible.
If you cannot access the codebase directly, ask the user to share relevant files or paste code snippets,
then run the audit on what you receive.

---

## 8. Quick Reference — Common Issues for This Stack

| Issue | Where to Look |
|-------|--------------|
| Tone.js AudioContext not started by user gesture | Audio init handler, first play button click |
| Canvas not cleaned up on unmount | `useEffect` cleanup in animation component |
| `localStorage` crashing in private browsing | Any direct `localStorage.getItem` without try/catch |
| Re-renders during animation loop | Check if animation state uses `useState` instead of `useRef` |
| Tailwind not purging in prod | `content` array in `tailwind.config.js` |
| Google Fonts blocking render | Missing `preconnect` + `display=swap` |
| Pointer events missed on fast swipe | `pointerleave` / `pointercancel` handlers on piano keys |
| TypeScript `any` leaking | Search for `: any`, `as any`, `@ts-ignore` |
