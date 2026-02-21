export interface SongNote {
  note: string;
  time: number;
  duration: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bpm: number;
  notes: SongNote[];
  duration: number;
}

export type NoteStatus = 'upcoming' | 'perfect' | 'good' | 'ok' | 'missed';

export interface NoteState extends SongNote {
  status: NoteStatus;
}

export type HitType = 'perfect' | 'good' | 'ok';

export type Screen = 'home' | 'tutorial' | 'select' | 'play' | 'results';

export interface ScoreState {
  points: number;
  perfect: number;
  good: number;
  ok: number;
  misses: number;
  totalNotes: number;
  combo: number;
  maxCombo: number;
}
