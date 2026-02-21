import { useRef, useState, useCallback, useEffect } from 'react';
import { Song, NoteState, ScoreState, HitType } from '../types';

export function useGameEngine(song: Song | null) {
  const noteStatesRef = useRef<NoteState[]>([]);
  const elapsedRef = useRef(0);
  const startTimeRef = useRef(0);
  const rafRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [phase, setPhaseState] = useState<'countdown' | 'playing' | 'finished'>('countdown');
  const phaseRef = useRef('countdown');
  const [countdown, setCountdown] = useState(3);
  const [score, setScore] = useState<ScoreState>({
    points: 0, perfect: 0, good: 0, ok: 0, misses: 0,
    totalNotes: song?.notes.length ?? 0, combo: 0, maxCombo: 0,
  });
  const [lastHit, setLastHit] = useState<{ type: HitType; note: string } | null>(null);

  const setPhase = useCallback((p: 'countdown' | 'playing' | 'finished') => {
    phaseRef.current = p;
    setPhaseState(p);
  }, []);

  useEffect(() => {
    if (song) {
      noteStatesRef.current = song.notes.map(n => ({ ...n, status: 'upcoming' as const }));
      elapsedRef.current = 0;
      setScore({
        points: 0, perfect: 0, good: 0, ok: 0, misses: 0,
        totalNotes: song.notes.length, combo: 0, maxCombo: 0,
      });
    }
  }, [song]);

  const start = useCallback(() => {
    if (!song) return;
    setPhase('countdown');
    setCountdown(3);
    let count = 3;
    intervalRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase('playing');
        startTimeRef.current = performance.now();
        const loop = () => {
          const now = performance.now();
          elapsedRef.current = (now - startTimeRef.current) / 1000;
          let missCount = 0;
          for (const ns of noteStatesRef.current) {
            if (ns.status === 'upcoming' && elapsedRef.current - ns.time > 0.5) {
              ns.status = 'missed';
              missCount++;
            }
          }
          if (missCount > 0) {
            setScore(prev => ({ ...prev, misses: prev.misses + missCount, combo: 0 }));
          }
          const allDone = noteStatesRef.current.every(ns => ns.status !== 'upcoming');
          if (allDone || elapsedRef.current > song.duration + 2) {
            for (const ns of noteStatesRef.current) {
              if (ns.status === 'upcoming') ns.status = 'missed';
            }
            setPhase('finished');
            return;
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [song, setPhase]);

  const handleNoteOn = useCallback((note: string) => {
    if (phaseRef.current !== 'playing') return;
    const currentTime = elapsedRef.current;
    let bestIdx = -1;
    let bestDiff = Infinity;
    for (let i = 0; i < noteStatesRef.current.length; i++) {
      const ns = noteStatesRef.current[i];
      if (ns.status !== 'upcoming' || ns.note !== note) continue;
      const diff = Math.abs(ns.time - currentTime);
      if (diff < bestDiff && diff <= 0.5) {
        bestDiff = diff;
        bestIdx = i;
      }
    }
    if (bestIdx >= 0) {
      let hitType: HitType;
      if (bestDiff <= 0.15) hitType = 'perfect';
      else if (bestDiff <= 0.3) hitType = 'good';
      else hitType = 'ok';
      noteStatesRef.current[bestIdx].status = hitType;
      const pts = hitType === 'perfect' ? 100 : hitType === 'good' ? 75 : 50;
      setScore(prev => {
        const newCombo = prev.combo + 1;
        return {
          ...prev,
          points: prev.points + pts,
          perfect: prev.perfect + (hitType === 'perfect' ? 1 : 0),
          good: prev.good + (hitType === 'good' ? 1 : 0),
          ok: prev.ok + (hitType === 'ok' ? 1 : 0),
          combo: newCombo,
          maxCombo: Math.max(prev.maxCombo, newCombo),
        };
      });
      setLastHit({ type: hitType, note });
      setTimeout(() => setLastHit(null), 600);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const totalProcessed = score.perfect + score.good + score.ok + score.misses;
  const accuracy = totalProcessed > 0
    ? Math.round(((score.perfect + score.good + score.ok) / totalProcessed) * 100)
    : 100;

  return {
    noteStates: noteStatesRef,
    elapsedTime: elapsedRef,
    score, phase, countdown, lastHit,
    start, handleNoteOn, accuracy,
  };
}
