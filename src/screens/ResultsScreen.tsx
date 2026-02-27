import { useEffect, useMemo } from 'react';
import { RotateCcw, ArrowLeft, Star } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getStarRating } from '../utils/noteHelpers';

export function ResultsScreen() {
  const { selectedSong, lastScore, goTo, replay, persistBestScore } = useGame();

  const { accuracy, stars } = useMemo(() => {
    if (!lastScore) return { accuracy: 0, stars: 0 };
    const total = lastScore.perfect + lastScore.good + lastScore.ok + lastScore.misses;
    const acc = total > 0 ? Math.round(((lastScore.perfect + lastScore.good + lastScore.ok) / total) * 100) : 0;
    return { accuracy: acc, stars: getStarRating(acc) };
  }, [lastScore]);

  useEffect(() => {
    if (selectedSong && lastScore) {
      persistBestScore(selectedSong.id, accuracy, lastScore.points, stars);
    }
  }, [selectedSong, lastScore, accuracy, stars, persistBestScore]);

  if (!selectedSong || !lastScore) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Neon horizontal lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[15, 18.5, 22, 25.5, 29, 71, 74.5, 78, 81.5, 85].map((top, i) => (
          <div key={i} className="absolute w-full" style={{ top: `${top}%`, height: '1px', background: 'rgba(0,240,255,0.03)' }} />
        ))}
      </div>

      {/* Result card */}
      <div
        className="relative w-full animate-fade-in"
        style={{
          maxWidth: '420px',
          background: '#0f0f1a',
          border: '1px solid rgba(0,240,255,0.12)',
          padding: '0',
        }}
      >
        {/* Cyan top bar */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #00f0ff, transparent)' }} />

        <div style={{ padding: '36px 32px 32px' }}>
          {/* Header label */}
          <div className="text-center mb-5">
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#4a4e6a',
              fontWeight: 400,
            }}>
              Performance Results
            </span>
          </div>

          {/* Song title */}
          <h2
            className="text-center"
            style={{
              fontFamily: '"Syncopate", sans-serif',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: '#e0e6ff',
              lineHeight: 1.3,
              marginBottom: '4px',
            }}
          >
            {selectedSong.title}
          </h2>
          <p className="text-center" style={{ fontFamily: '"Space Mono", monospace', fontWeight: 400, fontSize: '0.72rem', color: '#4a4e6a', marginBottom: '24px' }}>
            {selectedSong.artist}
          </p>

          {/* Thin rule */}
          <div style={{ height: '1px', background: 'rgba(0,240,255,0.15)', marginBottom: '24px' }} />

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className="w-7 h-7 transition-all"
                style={{
                  color: i <= stars ? '#00f0ff' : '#1a1a2e',
                  fill: i <= stars ? '#00f0ff' : 'none',
                  filter: i <= stars ? 'drop-shadow(0 0 6px rgba(0,240,255,0.35))' : 'none',
                }}
              />
            ))}
          </div>

          {/* Accuracy — big Orbitron number */}
          <div className="text-center mb-6">
            <span
              style={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 500,
                fontSize: '5.5rem',
                lineHeight: 1,
                color: '#00f0ff',
                letterSpacing: '-0.02em',
                textShadow: '0 0 20px rgba(0,240,255,0.3)',
              }}
            >
              {accuracy}
            </span>
            <span
              style={{
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 400,
                fontSize: '2rem',
                color: '#007a82',
                lineHeight: 1,
              }}
            >
              %
            </span>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4a4e6a', marginTop: '4px' }}>
              Accuracy
            </p>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-4 mb-5"
            style={{ borderTop: '1px solid rgba(0,240,255,0.05)', borderBottom: '1px solid rgba(0,240,255,0.05)', padding: '16px 0' }}
          >
            {[
              { label: 'Perfect', value: lastScore.perfect, color: '#4ade80' },
              { label: 'Good', value: lastScore.good, color: '#fbbf24' },
              { label: 'OK', value: lastScore.ok, color: '#fb923c' },
              { label: 'Missed', value: lastScore.misses, color: '#f87171' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 600, fontSize: '1.75rem', color, lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2a2e4a', marginTop: '4px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Points + combo */}
          <div className="text-center mb-6" style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#2a2e4a', fontWeight: 400, letterSpacing: '0.1em' }}>
            {lastScore.points.toLocaleString()} pts · Max Combo {lastScore.maxCombo}×
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={replay}
              aria-label="Play again"
              className="flex-1 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97]"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '12px',
                background: 'rgba(0,240,255,0.1)',
                border: '1px solid rgba(0,240,255,0.4)',
                color: '#00f0ff',
                cursor: 'pointer',
                outline: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.1)'; }}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Again
            </button>
            <button
              onClick={() => goTo('select')}
              aria-label="Back to song list"
              className="flex-1 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97]"
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '12px',
                background: 'transparent',
                border: '1px solid rgba(0,240,255,0.07)',
                color: '#4a4e6a',
                cursor: 'pointer',
                outline: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.2)'; (e.currentTarget as HTMLElement).style.color = '#00f0ff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,240,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#4a4e6a'; }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Songs
            </button>
          </div>
        </div>

        {/* Cyan bottom bar */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #00f0ff, transparent)' }} />
      </div>
    </div>
  );
}
