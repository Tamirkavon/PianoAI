import { useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useGameEngine } from '../hooks/useGameEngine';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useInputHandler } from '../hooks/useInputHandler';
import { useIsMobile } from '../hooks/useIsMobile';
import { PianoKeyboard } from '../components/PianoKeyboard';
import { FallingNotesCanvas } from '../components/FallingNotesCanvas';

export function PlayScreen() {
  const { selectedSong, goTo, setLastScore } = useGame();
  const isMobile = useIsMobile();
  const { playNote } = useAudioEngine();
  const engine = useGameEngine(selectedSong);

  useEffect(() => {
    engine.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.start]);

  useEffect(() => {
    if (engine.phase === 'finished') {
      setLastScore(engine.score);
      setTimeout(() => goTo('results'), 1200);
    }
  }, [engine.phase, engine.score, setLastScore, goTo]);

  const handleNoteOn = useCallback((note: string) => {
    playNote(note);
    engine.handleNoteOn(note);
  }, [playNote, engine.handleNoteOn]);

  const handleNoteOff = useCallback((_note: string) => {}, []);

  useInputHandler(handleNoteOn, handleNoteOff);

  if (!selectedSong) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden select-none" style={{ background: '#0a0a0f' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: 'rgba(15,15,26,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(0,240,255,0.08)' }}
      >
        <button
          onClick={() => goTo('select')}
          className="transition-colors duration-200"
          style={{ color: '#2a2e4a' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00f0ff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#2a2e4a')}
          aria-label="Back to song list"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span
          className="truncate mx-4"
          style={{ fontFamily: '"Syncopate", sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#007a82', letterSpacing: '0.05em' }}
        >
          {selectedSong.title}
        </span>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 500, fontSize: '1.6rem', color: '#00f0ff', lineHeight: 1, textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
            {engine.accuracy}%
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.72rem', color: '#2a2e4a', fontWeight: 400 }}>
            {engine.score.points} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="shrink-0" style={{ height: '2px', background: '#0f0f1a' }}>
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${Math.min((engine.elapsedTime.current / selectedSong.duration) * 100, 100)}%`,
            background: 'linear-gradient(to right, #007a82, #00f0ff)',
            boxShadow: '0 0 8px rgba(0,240,255,0.3)',
          }}
        />
      </div>

      {/* Canvas area */}
      <div className="flex-1 relative min-h-0">
        <FallingNotesCanvas
          song={selectedSong}
          noteStates={engine.noteStates}
          elapsedTime={engine.elapsedTime}
        />

        {/* Combo */}
        {engine.score.combo > 4 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span style={{
              fontFamily: '"Syncopate", sans-serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#00f0ff',
              textShadow: '0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2)',
            }}>
              {engine.score.combo}× COMBO
            </span>
          </div>
        )}

        {/* Hit feedback */}
        {engine.lastHit && (
          <div className="absolute top-1/3 left-1/2 animate-hit-feedback pointer-events-none">
            <span style={{
              fontFamily: '"Syncopate", sans-serif',
              fontWeight: 700,
              fontSize: '1.6rem',
              color: engine.lastHit.type === 'perfect' ? '#4ade80' : engine.lastHit.type === 'good' ? '#fbbf24' : '#fb923c',
              textShadow: engine.lastHit.type === 'perfect' ? '0 0 15px rgba(74,222,128,0.5)' : engine.lastHit.type === 'good' ? '0 0 15px rgba(251,191,36,0.5)' : '0 0 15px rgba(251,146,60,0.5)',
            }}>
              {engine.lastHit.type === 'perfect' ? 'PERFECT!' : engine.lastHit.type === 'good' ? 'GOOD!' : 'OK'}
            </span>
          </div>
        )}

        {/* Countdown */}
        {engine.phase === 'countdown' && (
          <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: 'rgba(10,10,15,0.85)' }}>
            <span
              className="animate-countdown"
              style={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: '7rem',
                color: '#00f0ff',
                textShadow: '0 0 40px rgba(0,240,255,0.4), 0 0 80px rgba(0,240,255,0.2)',
              }}
            >
              {engine.countdown}
            </span>
          </div>
        )}
      </div>

      <PianoKeyboard
        onNoteOn={handleNoteOn}
        onNoteOff={handleNoteOff}
        showLabels={!isMobile}
      />
    </div>
  );
}
