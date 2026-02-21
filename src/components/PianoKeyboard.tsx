import React, { useRef } from 'react';
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

  const handlePointerDown = (note: string, e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    activePointersRef.current.set(e.pointerId, note);
    onNoteOn(note);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const note = activePointersRef.current.get(e.pointerId);
    if (note) {
      activePointersRef.current.delete(e.pointerId);
      onNoteOff(note);
    }
  };

  return (
    <div className="relative bg-slate-900 border-t border-slate-700 shrink-0" style={{ height: '28vh', minHeight: '130px', maxHeight: '200px' }}>
      <div className="flex h-full">
        {WHITE_NOTES.map(note => (
          <button
            key={note}
            onPointerDown={(e) => handlePointerDown(note, e)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex-1 bg-gradient-to-b from-white to-slate-100 border-x border-slate-300 rounded-b-lg flex items-end justify-center pb-3 transition-colors duration-75 active:from-indigo-200 active:to-indigo-300 hover:from-slate-50 hover:to-white"
            style={{ touchAction: 'none' }}
          >
            {showLabels && (
              <span className="text-xs font-bold text-slate-400 uppercase select-none font-body">
                {NOTE_TO_KEY[note]}
              </span>
            )}
          </button>
        ))}
      </div>
      {BLACK_KEYS.map(({ note, offset }) => {
        const leftPercent = ((offset + 0.65) / 14) * 100;
        return (
          <button
            key={note}
            onPointerDown={(e) => handlePointerDown(note, e)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute top-0 bg-gradient-to-b from-slate-800 to-slate-950 rounded-b-lg flex items-end justify-center pb-2 shadow-lg transition-colors duration-75 active:from-indigo-900 active:to-indigo-950 z-10"
            style={{
              left: `${leftPercent}%`,
              width: `${(100 / 14) * 0.6}%`,
              height: '60%',
              touchAction: 'none',
              transform: 'translateX(-50%)',
            }}
          >
            {showLabels && (
              <span className="text-[10px] font-bold text-slate-400 uppercase select-none font-body">
                {NOTE_TO_KEY[note]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
