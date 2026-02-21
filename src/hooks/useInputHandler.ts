import { useEffect, useRef } from 'react';
import { KEY_TO_NOTE } from '../data/keymap';

export function useInputHandler(
  onNoteOn: (note: string) => void,
  onNoteOff: (note: string) => void
) {
  const noteOnRef = useRef(onNoteOn);
  const noteOffRef = useRef(onNoteOff);
  noteOnRef.current = onNoteOn;
  noteOffRef.current = onNoteOff;
  const activeKeysRef = useRef(new Set<string>());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = KEY_TO_NOTE[e.key.toLowerCase()];
      if (note && !activeKeysRef.current.has(note)) {
        activeKeysRef.current.add(note);
        noteOnRef.current(note);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const note = KEY_TO_NOTE[e.key.toLowerCase()];
      if (note) {
        activeKeysRef.current.delete(note);
        noteOffRef.current(note);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);
}
