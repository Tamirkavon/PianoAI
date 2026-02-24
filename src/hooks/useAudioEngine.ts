import { useCallback, useState } from 'react';
import * as Tone from 'tone';

let synth: Tone.PolySynth<Tone.Synth> | null = null;
let audioReady = false;

export function useAudioEngine() {
  const [isReady, setIsReady] = useState(audioReady);

  const initAudio = useCallback(async () => {
    if (synth) { setIsReady(true); return; }
    try {
      await Tone.start();
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.set({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.4, sustain: 0.1, release: 1.2 },
        volume: -6,
      });
      synth.triggerAttackRelease('C4', 0.01, undefined, 0.001);
      audioReady = true;
      setIsReady(true);
    } catch (err) {
      console.warn('Audio init failed:', err);
    }
  }, []);

  const playNote = useCallback((note: string, duration = 0.3) => {
    synth?.triggerAttackRelease(note, duration);
  }, []);

  return { initAudio, playNote, isReady };
}
