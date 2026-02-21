import { useState } from 'react';
import { ArrowLeft, Play, HelpCircle } from 'lucide-react';
import { SONGS } from '../data/songs';
import { Song } from '../types';
import { useGame } from '../context/GameContext';

const DIFFS = ['all', 'easy', 'medium', 'hard'] as const;
const DIFF_COLORS: Record<string, string> = {
  easy: 'bg-emerald-500', medium: 'bg-amber-500', hard: 'bg-red-500',
};
const DIFF_GRADIENTS: Record<string, string> = {
  easy: 'from-emerald-600/20 to-emerald-900/40',
  medium: 'from-amber-600/20 to-amber-900/40',
  hard: 'from-red-600/20 to-red-900/40',
};

export function SongSelectScreen() {
  const { selectSong, goTo } = useGame();
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? SONGS : SONGS.filter(s => s.difficulty === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => goTo('home')} className="text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-white font-display flex-1">Choose a Song</h2>
          <button onClick={() => goTo('tutorial')} className="text-slate-400 hover:text-indigo-400 transition" title="How to Play">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DIFFS.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all whitespace-nowrap ${
                filter === d
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {d === 'all' ? 'All Songs' : d}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(song => (
            <SongCard key={song.id} song={song} onSelect={selectSong} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SongCard({ song, onSelect }: { song: Song; onSelect: (s: Song) => void }) {
  const dur = Math.round(song.duration);
  const mins = Math.floor(dur / 60);
  const secs = dur % 60;
  return (
    <button
      onClick={() => onSelect(song)}
      className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] bg-gradient-to-br ${DIFF_GRADIENTS[song.difficulty]} border border-white/5`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full text-white ${DIFF_COLORS[song.difficulty]}`}>
          {song.difficulty}
        </span>
        <span className="text-xs text-slate-500">{mins}:{secs.toString().padStart(2, '0')}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1 font-display">{song.title}</h3>
      <p className="text-sm text-slate-400">{song.artist}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-slate-500">{song.notes.length} notes</span>
        <Play className="w-4 h-4 text-slate-500" />
      </div>
    </button>
  );
}
