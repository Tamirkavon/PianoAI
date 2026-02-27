import { useState } from 'react';
import { ArrowLeft, Play, HelpCircle, Star } from 'lucide-react';
import { SONGS } from '../data/songs';
import { Song } from '../types';
import { useGame } from '../context/GameContext';
import { BestScore } from '../context/GameContext';

const DIFFS = ['all', 'easy', 'medium', 'hard'] as const;

const DIFF_ACCENT: Record<string, string> = {
  easy: '#00ff88',
  medium: '#ffcc00',
  hard: '#ff0055',
};

const DIFF_LABEL_COLOR: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-rose-500',
};

export function SongSelectScreen() {
  const { selectSong, goTo, bestScores } = useGame();
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? SONGS : SONGS.filter(s => s.difficulty === filter);

  return (
    <div
      className="h-full overflow-y-auto px-4 py-6"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => goTo('home')}
            className="transition-colors duration-200"
            style={{ color: '#4a4e6a' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00f0ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a4e6a')}
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2
              style={{
                fontFamily: '"Syncopate", sans-serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#e0e6ff',
                letterSpacing: '0.05em',
              }}
            >
              CHOOSE A SONG
            </h2>
          </div>
          <button
            onClick={() => goTo('tutorial')}
            className="transition-colors duration-200"
            style={{ color: '#4a4e6a' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00f0ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a4e6a')}
            title="How to Play"
            aria-label="How to play"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DIFFS.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className="whitespace-nowrap transition-all duration-200"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '7px 18px',
                border: filter === d
                  ? '1px solid rgba(0,240,255,0.6)'
                  : '1px solid rgba(255,255,255,0.06)',
                background: filter === d ? 'rgba(0,240,255,0.1)' : 'transparent',
                color: filter === d ? '#00f0ff' : '#4a4e6a',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {d === 'all' ? 'All' : d}
            </button>
          ))}
        </div>

        {/* Song grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(song => (
            <SongCard key={song.id} song={song} onSelect={selectSong} best={bestScores[song.id]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SongCard({ song, onSelect, best }: { song: Song; onSelect: (s: Song) => void; best?: BestScore }) {
  const dur = Math.round(song.duration);
  const mins = Math.floor(dur / 60);
  const secs = dur % 60;

  return (
    <button
      onClick={() => onSelect(song)}
      aria-label={`Play ${song.title} by ${song.artist}`}
      className="group relative text-left transition-all duration-250 hover:scale-[1.015] active:scale-[0.99]"
      style={{
        background: '#0f0f1a',
        border: '1px solid rgba(0,240,255,0.05)',
        borderLeft: `3px solid ${DIFF_ACCENT[song.difficulty]}`,
        padding: '18px 20px',
      }}
    >
      {/* Hover neon overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
        style={{ background: 'rgba(0,240,255,0.03)' }}
      />

      {/* Difficulty + duration row */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-[10px] font-body font-medium uppercase tracking-widest ${DIFF_LABEL_COLOR[song.difficulty]}`}
        >
          {song.difficulty}
        </span>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#2a2e4a', fontWeight: 400 }}>
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Song title */}
      <h3
        style={{
          fontFamily: '"Syncopate", sans-serif',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#e0e6ff',
          lineHeight: 1.3,
          marginBottom: '4px',
        }}
      >
        {song.title}
      </h3>

      {/* Artist */}
      <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.72rem', color: '#4a4e6a', fontWeight: 400, marginBottom: '12px' }}>
        {song.artist}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.68rem', color: '#2a2e4a', fontWeight: 400 }}>
          {song.notes.length} notes
        </span>
        {best ? (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${i <= best.stars ? 'text-neon-cyan fill-neon-cyan' : 'text-neon-border'}`}
                />
              ))}
            </div>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.68rem', color: '#007a82', fontWeight: 400 }}>
              {best.accuracy}%
            </span>
          </div>
        ) : (
          <Play className="w-3.5 h-3.5" style={{ color: '#2a2e4a' }} />
        )}
      </div>
    </button>
  );
}
