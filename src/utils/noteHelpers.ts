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
    'C': '#ff6b6b', 'C#': '#ff8e8e', 'D': '#ffa94d', 'D#': '#ffc078',
    'E': '#ffd43b', 'F': '#69db7c', 'F#': '#8ce99a', 'G': '#38d9a9',
    'G#': '#63e6be', 'A': '#4dabf7', 'A#': '#748ffc', 'B': '#9775fa',
  };
  return colors[base] || '#818cf8';
}

export function getStarRating(accuracy: number): number {
  if (accuracy >= 95) return 5;
  if (accuracy >= 85) return 4;
  if (accuracy >= 70) return 3;
  if (accuracy >= 50) return 2;
  return 1;
}
