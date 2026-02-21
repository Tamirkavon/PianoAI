# PianoAI

A Simply Piano-inspired web app that teaches piano through falling notes, real-time scoring, and visual feedback. Built for kids — no disqualification, just encouragement.

**Live app:** https://0e417ca4f591456c86.v2.appdeploy.ai/

## Features

- 15 songs across 3 difficulty levels (Easy, Medium, Hard)
- Falling notes visualization with color-coded timing feedback
- Real-time accuracy scoring with combo streaks
- Interactive piano keyboard (desktop keyboard + mobile touch)
- "How to Play" animated tutorial (shown on first visit)
- Star rating system (1-5 stars based on accuracy)
- Works on desktop and mobile browsers

## Tech Stack

- **React 19** + **Vite** (frontend-only)
- **Tailwind CSS** (dark theme, neon accents)
- **Tone.js** PolySynth (piano audio, no sample files)
- **HTML Canvas** + requestAnimationFrame (60fps falling notes)
- **Pointer Events** (unified touch/mouse input)

## Local Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Keyboard Mapping

Two octaves (C4-B5) spatially aligned — left keys on keyboard = left keys on piano:

| Row | Keys | Notes |
|-----|------|-------|
| Number row | `2 3 · 5 6 7` | C#4 D#4 · F#4 G#4 A#4 (black keys) |
| Q row | `Q W E R T Y U` | C4 D4 E4 F4 G4 A4 B4 (white keys) |
| A row | `S D · G H J` | C#5 D#5 · F#5 G#5 A#5 (black keys) |
| Z row | `Z X C V B N M` | C5 D5 E5 F5 G5 A5 B5 (white keys) |

## Song Catalog

### Easy
| Song | Artist |
|------|--------|
| Twinkle Twinkle Little Star | Traditional |
| Happy Birthday | Traditional |
| Baby Shark | Pinkfong |
| Let It Go | Frozen |
| Super Mario Bros | Nintendo |

### Medium
| Song | Artist |
|------|--------|
| The Addams Family | TV Theme |
| Hedwig's Theme | Harry Potter |
| He's a Pirate | Pirates of Caribbean |
| Star Wars | John Williams |
| Sweden | C418 (Minecraft) |

### Hard
| Song | Artist |
|------|--------|
| Paint It Black | Wednesday |
| Fur Elise | Beethoven |
| Believer | Imagine Dragons |
| Stranger Things | Kyle Dixon |
| Interstellar | Hans Zimmer |

## Scoring

- **Perfect** (within 150ms): 100 pts
- **Good** (within 300ms): 75 pts
- **OK** (within 500ms): 50 pts
- **Miss**: 0 pts

Stars: 95%+ = 5 stars, 85%+ = 4, 70%+ = 3, 50%+ = 2, below = 1

## Project Structure

```
src/
├── types/index.ts           # TypeScript types
├── data/
│   ├── songs.ts             # 15 songs as note sequences
│   └── keymap.ts            # Keyboard-to-note mapping
├── hooks/
│   ├── useAudioEngine.ts    # Tone.js synth
│   ├── useGameEngine.ts     # Game loop + hit detection
│   ├── useInputHandler.ts   # Keyboard events
│   └── useIsMobile.ts       # Mobile detection
├── context/
│   └── GameContext.tsx       # Screen routing + game state
├── screens/
│   ├── HomeScreen.tsx        # Landing page
│   ├── TutorialScreen.tsx    # Animated how-to-play demo
│   ├── SongSelectScreen.tsx  # Song catalog
│   ├── PlayScreen.tsx        # Main gameplay
│   └── ResultsScreen.tsx     # Score + star rating
├── components/
│   ├── PianoKeyboard.tsx     # Interactive piano (DOM)
│   └── FallingNotesCanvas.tsx # Falling notes (Canvas)
├── utils/
│   └── noteHelpers.ts       # Note positioning + colors
├── App.tsx                   # App shell
├── main.tsx                  # Entry point
└── index.css                 # Global styles + animations
```
