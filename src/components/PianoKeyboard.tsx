import React, { useRef, useState, useCallback } from 'react';
import { NOTE_TO_KEY } from '../data/keymap';

interface Props {
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
  showLabels: boolean;
}

const WHITE_NOTES = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5'];
const BLACK_KEYS = [
  { note: 'C#4', offset: 0 }, { note: 'D#4', offset: 1 },
  { note: 'F#4', offset: 3 }, { note: 'G#4', offset: 4 }, { note: 'A#4', offset: 5 },
  { note: 'C#5', offset: 7 }, { note: 'D#5', offset: 8 },
  { note: 'F#5', offset: 10 }, { note: 'G#5', offset: 11 }, { note: 'A#5', offset: 12 },
];

export function PianoKeyboard({ onNoteOn, onNoteOff, showLabels }: Props) {
  const activePointersRef = useRef<Map<number, string>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const addActiveNote = (note: string) =>
    setActiveNotes(prev => new Set(prev).add(note));

  const removeActiveNote = (note: string) =>
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });

  const getNoteAtPoint = useCallback((clientX: number, clientY: number): string | null => {
    const container = containerRef.current;
    if (!container) return null;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Black keys take priority — check them first (same geometry as noteHelpers.getNoteX)
    for (const { note, offset } of BLACK_KEYS) {
      const centerX = ((offset + 0.65) / 14) * rect.width;
      const halfWidth = (rect.width / 14) * 0.3;
      const keyHeight = rect.height * 0.62;
      if (x >= centerX - halfWidth && x <= centerX + halfWidth && y >= 0 && y <= keyHeight) {
        return note;
      }
    }

    // White key — simple column division
    const col = Math.floor((x / rect.width) * 14);
    if (col >= 0 && col < 14) {
      return WHITE_NOTES[col];
    }

    return null;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    const note = getNoteAtPoint(e.clientX, e.clientY);
    if (note) {
      activePointersRef.current.set(e.pointerId, note);
      addActiveNote(note);
      onNoteOn(note);
    }
  }, [getNoteAtPoint, onNoteOn]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(e.pointerId)) return;
    const prevNote = activePointersRef.current.get(e.pointerId)!;
    const newNote = getNoteAtPoint(e.clientX, e.clientY);
    if (newNote && newNote !== prevNote) {
      onNoteOff(prevNote);
      removeActiveNote(prevNote);
      activePointersRef.current.set(e.pointerId, newNote);
      addActiveNote(newNote);
      onNoteOn(newNote);
    }
  }, [getNoteAtPoint, onNoteOn, onNoteOff]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const note = activePointersRef.current.get(e.pointerId);
    if (note) {
      activePointersRef.current.delete(e.pointerId);
      removeActiveNote(note);
      onNoteOff(note);
    }
  }, [onNoteOff]);

  return (
    <div
      className="relative bg-slate-900 border-t border-slate-700 shrink-0"
      style={{ height: '36vh', minHeight: '160px', maxHeight: '240px' }}
    >
      <div
        ref={containerRef}
        className="flex h-full relative"
        style={{ touchAction: 'none', userSelect: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* White keys — visual only, pointer events handled by container */}
        {WHITE_NOTES.map(note => {
          const isActive = activeNotes.has(note);
          return (
            <div
              key={note}
              role="button"
              aria-label={`Piano key ${note}`}
              className={`flex-1 border-x border-slate-300 rounded-b-lg flex items-end justify-center pb-3 transition-colors duration-75 bg-gradient-to-b ${
                isActive ? 'from-indigo-200 to-indigo-400' : 'from-white to-slate-100'
              }`}
              style={isActive ? { boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.25)' } : undefined}
            >
              {showLabels && (
                <span className="text-xs font-bold text-slate-400 uppercase select-none font-body pointer-events-none">
                  {NOTE_TO_KEY[note]}
                </span>
              )}
            </div>
          );
        })}

        {/* Black keys — visual only, pointer events handled by container */}
        {BLACK_KEYS.map(({ note, offset }) => {
          const leftPercent = ((offset + 0.65) / 14) * 100;
          const isActive = activeNotes.has(note);
          return (
            <div
              key={note}
              role="button"
              aria-label={`Piano key ${note}`}
              className={`absolute top-0 rounded-b-lg pointer-events-none flex items-end justify-center pb-2 shadow-lg transition-colors duration-75 bg-gradient-to-b ${
                isActive ? 'from-indigo-700 to-indigo-950' : 'from-slate-800 to-slate-950'
              }`}
              style={{
                left: `${leftPercent}%`,
                width: `${(100 / 14) * 0.6}%`,
                height: '62%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              {showLabels && (
                <span className="text-[10px] font-bold text-slate-400 uppercase select-none font-body">
                  {NOTE_TO_KEY[note]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
