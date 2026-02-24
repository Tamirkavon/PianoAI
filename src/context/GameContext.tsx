import React, { createContext, useContext, useState, useCallback } from 'react';
import { Song, Screen, ScoreState } from '../types';

export interface BestScore {
  accuracy: number;
  points: number;
  stars: number;
}

const BEST_SCORES_KEY = 'pianoai-best-scores';

function loadBestScores(): Record<string, BestScore> {
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveBestScore(songId: string, score: BestScore) {
  try {
    const all = loadBestScores();
    const existing = all[songId];
    if (!existing || score.accuracy > existing.accuracy) {
      all[songId] = score;
      localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(all));
    }
  } catch {}
}

interface GameContextType {
  screen: Screen;
  selectedSong: Song | null;
  lastScore: ScoreState | null;
  gameKey: number;
  bestScores: Record<string, BestScore>;
  selectSong: (song: Song) => void;
  goTo: (screen: Screen) => void;
  setLastScore: (score: ScoreState) => void;
  persistBestScore: (songId: string, accuracy: number, points: number, stars: number) => void;
  replay: () => void;
}

const GameContext = createContext<GameContextType>(null!);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [lastScore, setLastScoreState] = useState<ScoreState | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [bestScores, setBestScores] = useState<Record<string, BestScore>>(loadBestScores);

  const selectSong = useCallback((song: Song) => {
    setSelectedSong(song);
    setGameKey(k => k + 1);
    setScreen('play');
  }, []);

  const goTo = useCallback((s: Screen) => setScreen(s), []);

  const setLastScore = useCallback((s: ScoreState) => {
    setLastScoreState(s);
  }, []);

  const persistBestScore = useCallback((songId: string, accuracy: number, points: number, stars: number) => {
    const best: BestScore = { accuracy, points, stars };
    saveBestScore(songId, best);
    setBestScores(loadBestScores());
  }, []);

  const replay = useCallback(() => {
    setGameKey(k => k + 1);
    setScreen('play');
  }, []);

  return (
    <GameContext.Provider value={{ screen, selectedSong, lastScore, gameKey, bestScores, selectSong, goTo, setLastScore, persistBestScore, replay }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
