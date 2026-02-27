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

    for (const { note, offset } of BLACK_KEYS) {
      const centerX = ((offset + 0.65) / 14) * rect.width;
      const halfWidth = (rect.width / 14) * 0.3;
      const keyHeight = rect.height * 0.62;
      if (x >= centerX - halfWidth && x <= centerX + halfWidth && y >= 0 && y <= keyHeight) {
        return note;
      }
    }

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
      className="relative shrink-0"
      style={{
        height: '36vh',
        minHeight: '160px',
        maxHeight: '240px',
        background: '#08080d',
        borderTop: '2px solid rgba(0,240,255,0.15)',
      }}
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
        {/* White keys */}
        {WHITE_NOTES.map(note => {
          const isActive = activeNotes.has(note);
          return (
            <div
              key={note}
              role="button"
              aria-label={`Piano key ${note}`}
              className="flex-1 flex items-end justify-center pb-3 transition-colors duration-75"
              style={{
                background: isActive
                  ? 'linear-gradient(to bottom, rgba(0,240,255,0.25), rgba(0,240,255,0.1))'
                  : 'linear-gradient(to bottom, #1a1a2e, #12121f)',
                borderRight: '1px solid rgba(0,240,255,0.08)',
                borderLeft: '1px solid rgba(0,240,255,0.04)',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
                boxShadow: isActive
                  ? 'inset 0 0 15px rgba(0,240,255,0.3), 0 0 10px rgba(0,240,255,0.2)'
                  : 'inset 0 -2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {showLabels && (
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: isActive ? 'rgba(0,240,255,0.8)' : 'rgba(0,240,255,0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {NOTE_TO_KEY[note]}
                </span>
              )}
            </div>
          );
        })}

        {/* Black keys */}
        {BLACK_KEYS.map(({ note, offset }) => {
          const leftPercent = ((offset + 0.65) / 14) * 100;
          const isActive = activeNotes.has(note);
          return (
            <div
              key={note}
              role="button"
              aria-label={`Piano key ${note}`}
              className="absolute top-0 flex items-end justify-center pb-2 pointer-events-none transition-colors duration-75"
              style={{
                left: `${leftPercent}%`,
                width: `${(100 / 14) * 0.6}%`,
                height: '62%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                background: isActive
                  ? 'linear-gradient(to bottom, rgba(255,45,149,0.3), rgba(255,45,149,0.1))'
                  : 'linear-gradient(to bottom, #0a0a12, #060609)',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
                boxShadow: isActive
                  ? '0 0 12px rgba(255,45,149,0.4), inset 0 0 8px rgba(255,45,149,0.2)'
                  : '2px 4px 8px rgba(0,0,0,0.7)',
                borderLeft: '1px solid rgba(255,45,149,0.06)',
                borderRight: '1px solid rgba(255,45,149,0.06)',
              }}
            >
              {showLabels && (
                <span style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.52rem',
                  fontWeight: 400,
                  color: isActive ? 'rgba(255,45,149,0.8)' : 'rgba(255,45,149,0.2)',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                  letterSpacing: '0.03em',
                }}>
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
