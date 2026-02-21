import { Star, RotateCcw, ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getStarRating } from '../utils/noteHelpers';

export function ResultsScreen() {
  const { selectedSong, lastScore, goTo, replay } = useGame();
  if (!selectedSong || !lastScore) return null;

  const total = lastScore.perfect + lastScore.good + lastScore.ok + lastScore.misses;
  const accuracy = total > 0 ? Math.round(((lastScore.perfect + lastScore.good + lastScore.ok) / total) * 100) : 0;
  const stars = getStarRating(accuracy);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 px-4">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/5 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold text-white text-center mb-1 font-display">{selectedSong.title}</h2>
        <p className="text-slate-400 text-center text-sm mb-6">{selectedSong.artist}</p>
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              className={`w-10 h-10 transition-all ${i <= stars
                ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                : 'text-slate-700'}`}
            />
          ))}
        </div>
        <div className="text-center mb-6">
          <span className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-display">
            {accuracy}%
          </span>
          <p className="text-slate-400 text-sm mt-1">Accuracy</p>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{lastScore.perfect}</div>
            <div className="text-xs text-slate-500">Perfect</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{lastScore.good}</div>
            <div className="text-xs text-slate-500">Good</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{lastScore.ok}</div>
            <div className="text-xs text-slate-500">OK</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{lastScore.misses}</div>
            <div className="text-xs text-slate-500">Missed</div>
          </div>
        </div>
        <div className="text-center text-sm text-slate-500 mb-6">
          Score: {lastScore.points} pts · Max Combo: {lastScore.maxCombo}x
        </div>
        <div className="flex gap-3">
          <button
            onClick={replay}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </button>
          <button
            onClick={() => goTo('select')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" /> Songs
          </button>
        </div>
      </div>
    </div>
  );
}
