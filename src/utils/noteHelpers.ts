const WHITE_NOTES = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5'];

const BLACK_OFFSETS: Record<string, number> = {
  'C#4': 0, 'D#4': 1, 'F#4': 3, 'G#4': 4, 'A#4': 5,
  'C#5': 7, 'D#5': 8, 'F#5': 10, 'G#5': 11, 'A#5': 12,
};

export function getNoteX(note: string, width: number): number {
  const wkw = width / 14;
  const wi = WHITE_NOTES.indexOf(note);
  if (wi >= 0) return (wi + 0.5) * wkw;
  const bo = BLACK_OFFSETS[note];
  if (bo !== undefined) return (bo + 0.65) * wkw;
  return width / 2;
}

export function isBlackNote(note: string): boolean {
  return note.includes('#');
}

export function getNoteColor(note: string): string {
  const base = note.replace(/\d/, '');
  const colors: Record<string, string> = {
    'C': '#ff0055', 'C#': '#ff3377', 'D': '#ff6600', 'D#': '#ff8833',
    'E': '#ffcc00', 'F': '#00ff88', 'F#': '#33ffaa', 'G': '#00ffcc',
    'G#': '#33ffdd', 'A': '#00ccff', 'A#': '#5588ff', 'B': '#aa55ff',
  };
  return colors[base] || '#8b5cf6';
}

export function getStarRating(accuracy: number): number {
  if (accuracy >= 95) return 5;
  if (accuracy >= 85) return 4;
  if (accuracy >= 70) return 3;
  if (accuracy >= 50) return 2;
  return 1;
}
