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
  }, []);

  useEffect(() => {
    if (engine.phase === 'finished') {
      setLastScore(engine.score);
      setTimeout(() => goTo('results'), 1200);
    }
  }, [engine.phase]);

  const handleNoteOn = useCallback((note: string) => {
    playNote(note);
    engine.handleNoteOn(note);
  }, [playNote, engine.handleNoteOn]);

  const handleNoteOff = useCallback((_note: string) => {}, []);

  useInputHandler(handleNoteOn, handleNoteOff);

  if (!selectedSong) return null;

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur z-10 shrink-0">
        <button onClick={() => goTo('select')} className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-slate-300 font-display truncate mx-4">{selectedSong.title}</span>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-indigo-400 font-display">{engine.accuracy}%</span>
          <span className="text-sm text-slate-500">{engine.score.points} pts</span>
        </div>
      </div>
      <div className="h-1 bg-slate-800 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${Math.min((engine.elapsedTime.current / selectedSong.duration) * 100, 100)}%` }}
        />
      </div>
      <div className="flex-1 relative min-h-0">
        <FallingNotesCanvas
          song={selectedSong}
          noteStates={engine.noteStates}
          elapsedTime={engine.elapsedTime}
        />
        {engine.score.combo > 4 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="text-3xl font-bold text-yellow-400 font-display drop-shadow-lg">
              {engine.score.combo}x Combo!
            </span>
          </div>
        )}
        {engine.lastHit && (
          <div className="absolute top-1/3 left-1/2 animate-hit-feedback pointer-events-none">
            <span className={`text-4xl font-bold font-display ${
              engine.lastHit.type === 'perfect' ? 'text-emerald-400' :
              engine.lastHit.type === 'good' ? 'text-yellow-400' : 'text-orange-400'
            }`}>
              {engine.lastHit.type === 'perfect' ? 'PERFECT!' :
               engine.lastHit.type === 'good' ? 'GOOD!' : 'OK'}
            </span>
          </div>
        )}
        {engine.phase === 'countdown' && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20">
            <span className="text-9xl font-bold text-indigo-400 animate-countdown font-display">
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
