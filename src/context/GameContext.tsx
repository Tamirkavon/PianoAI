import React, { createContext, useContext, useState, useCallback } from 'react';
import { Song, Screen, ScoreState } from '../types';

interface GameContextType {
  screen: Screen;
  selectedSong: Song | null;
  lastScore: ScoreState | null;
  gameKey: number;
  selectSong: (song: Song) => void;
  goTo: (screen: Screen) => void;
  setLastScore: (score: ScoreState) => void;
  replay: () => void;
}

const GameContext = createContext<GameContextType>(null!);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [lastScore, setLastScoreState] = useState<ScoreState | null>(null);
  const [gameKey, setGameKey] = useState(0);

  const selectSong = useCallback((song: Song) => {
    setSelectedSong(song);
    setGameKey(k => k + 1);
    setScreen('play');
  }, []);

  const goTo = useCallback((s: Screen) => setScreen(s), []);

  const setLastScore = useCallback((s: ScoreState) => setLastScoreState(s), []);

  const replay = useCallback(() => {
    setGameKey(k => k + 1);
    setScreen('play');
  }, []);

  return (
    <GameContext.Provider value={{ screen, selectedSong, lastScore, gameKey, selectSong, goTo, setLastScore, replay }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
