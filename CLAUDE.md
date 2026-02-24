# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
```

No test suite exists — this is a frontend-only app.

## Architecture

### Screen-Based Navigation
The app has five screens managed entirely by `GameContext` (no router library):
`Home → [Tutorial] → SongSelect → Play ↔ Results`

`GameContext` (`src/context/GameContext.tsx`) is the single source of global state: current screen, selected song, last score, best scores (persisted to `localStorage`), and a `gameKey` that increments on replay to force a full remount of `PlayScreen`.

### Game Loop
`useGameEngine` (`src/hooks/useGameEngine.ts`) drives all gameplay:
- Uses `useRef` (not `useState`) for elapsed time and note states to avoid stale closure captures in the `requestAnimationFrame` loop
- Three phases: **countdown** (3s) → **playing** → **finished**
- Hit detection window: ±500ms around expected note time; graded as Perfect (≤150ms, 100pts), Good (≤300ms, 75pts), OK (≤500ms, 50pts)
- Combo multipliers: 1.2× at 5+, 1.5× at 10+, 2.0× at 20+ consecutive hits

### Audio
`useAudioEngine` (`src/hooks/useAudioEngine.ts`) wraps a singleton `Tone.PolySynth` — one global instance reused across screens. Audio must be initialized on a user gesture (`initAudio()`) before notes can play, due to browser Web Audio restrictions.

### Rendering
`FallingNotesCanvas` uses a raw Canvas + `requestAnimationFrame` at 60fps. Notes fall from top to a hit line at 88% of screen height. Only notes within a 4-second look-ahead window are rendered. Canvas is DPR-scaled for retina displays.

The piano keyboard (`PianoKeyboard.tsx`) is DOM-based and uses pointer events for unified mouse/touch input.

### Song Data
Songs live in `src/data/songs.ts` as `SongNote[]` with `{ note: string, time: number, duration: number }` in seconds. 15 songs across easy/medium/hard difficulties. Keyboard-to-note mapping is in `src/data/keymap.ts` — two octaves (C4–B5) on QWERTY rows.

### Key Utilities
- `src/utils/noteHelpers.ts` — note lane positioning, color mapping, star rating calculation
- `src/types/index.ts` — all shared TypeScript interfaces (`Song`, `NoteState`, `ScoreState`, etc.)
