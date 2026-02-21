export const KEY_TO_NOTE: Record<string, string> = {
  'q': 'C4', 'w': 'D4', 'e': 'E4', 'r': 'F4', 't': 'G4', 'y': 'A4', 'u': 'B4',
  '2': 'C#4', '3': 'D#4', '5': 'F#4', '6': 'G#4', '7': 'A#4',
  'z': 'C5', 'x': 'D5', 'c': 'E5', 'v': 'F5', 'b': 'G5', 'n': 'A5', 'm': 'B5',
  's': 'C#5', 'd': 'D#5', 'g': 'F#5', 'h': 'G#5', 'j': 'A#5',
};

export const NOTE_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_TO_NOTE).map(([k, v]) => [v, k])
);
