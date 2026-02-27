import { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getNoteX, getNoteColor, isBlackNote } from '../utils/noteHelpers';

const DEMO_NOTES = [
  { note: 'D4', time: 1.0, result: 'perfect' as const },
  { note: 'F4', time: 2.2, result: 'good' as const },
  { note: 'A4', time: 3.4, result: 'ok' as const },
  { note: 'C5', time: 4.6, result: 'miss' as const },
];
const CYCLE = 7;
const LOOK_AHEAD = 3;
const HIT_Y = 0.78;

const RESULT_COLORS: Record<string, string> = {
  perfect: '#22c55e', good: '#eab308', ok: '#f97316', miss: '#ef4444',
};
const RESULT_LABELS: Record<string, string> = {
  perfect: 'PERFECT!', good: 'GOOD', ok: 'OK', miss: 'MISS',
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function TutorialScreen() {
  const { goTo } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const now = ((performance.now() - startRef.current) / 1000) % CYCLE;
      const hitY = h * HIT_Y;
      const pps = hitY / LOOK_AHEAD;

      ctx.clearRect(0, 0, w, h);

      // Background — deep void
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0a0a0f');
      bgGrad.addColorStop(1, '#0f0f1a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(0,240,255,0.02)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // Lane guides — neon cyan
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 14; i++) {
        const laneX = (i + 0.5) * (w / 14);
        ctx.beginPath();
        ctx.moveTo(laneX, 0);
        ctx.lineTo(laneX, hitY);
        ctx.stroke();
      }

      // Hit line — cyan
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, hitY);
      ctx.lineTo(w, hitY);
      ctx.stroke();

      // Hit zone glow — cyan
      const lineGrad = ctx.createLinearGradient(0, hitY - 15, 0, hitY + 15);
      lineGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      lineGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.12)');
      lineGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, hitY - 15, w, 30);

      // "Hit Zone" label
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.font = '11px "Space Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('Hit Zone ▸', w - 8, hitY - 6);

      // Mini keyboard outlines at bottom
      const kbTop = hitY + 8;
      const kbH = h - kbTop - 4;
      if (kbH > 10) {
        const wkw = w / 14;
        for (let i = 0; i < 14; i++) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.07)';
          ctx.lineWidth = 1;
          roundRect(ctx, i * wkw + 1, kbTop, wkw - 2, kbH, 3);
          ctx.stroke();
        }
      }

      // Demo notes
      for (const dn of DEMO_NOTES) {
        const dt = dn.time - now;
        const x = getNoteX(dn.note, w);
        const noteW = isBlackNote(dn.note) ? w / 14 * 0.35 : w / 14 * 0.5;
        const noteH = 0.4 * pps;
        const color = getNoteColor(dn.note);

        if (dt > 0) {
          const y = hitY - dt * pps;
          if (y + noteH > 0) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 15;
            roundRect(ctx, x - noteW / 2, y - noteH, noteW, noteH, 4);
            ctx.fill();
            ctx.restore();
          }
        } else {
          const elapsed = -dt;
          if (elapsed < 1.2) {
            const resultColor = RESULT_COLORS[dn.result];
            const label = RESULT_LABELS[dn.result];

            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - elapsed * 1.5);
            ctx.fillStyle = resultColor;
            ctx.shadowColor = resultColor;
            ctx.shadowBlur = 20;
            roundRect(ctx, x - noteW / 2, hitY - noteH, noteW, noteH, 4);
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - elapsed * 1.2);
            ctx.fillStyle = resultColor;
            ctx.font = 'bold 15px "Syncopate", sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = resultColor;
            ctx.shadowBlur = 8;
            ctx.fillText(label, x, hitY - noteH - 10 - elapsed * 30);
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleContinue = () => {
    try { localStorage.setItem('pianoai-tutorial-seen', '1'); } catch {}
    goTo('select');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6"
      style={{ background: '#0a0a0f' }}
    >
      <h2
        className="mb-2 animate-fade-in text-center"
        style={{
          fontFamily: '"Syncopate", sans-serif',
          fontWeight: 700,
          fontSize: '1.6rem',
          color: '#e0e6ff',
        }}
      >
        HOW TO PLAY
      </h2>
      <p style={{ fontFamily: '"Space Mono", monospace', fontWeight: 400, fontSize: '0.75rem', color: '#4a4e6a', marginBottom: '20px', textAlign: 'center', maxWidth: '380px', letterSpacing: '0.05em' }}>
        Press the matching key when a note reaches the hit zone
      </p>

      <div
        ref={containerRef}
        className="w-full overflow-hidden"
        style={{ maxWidth: '520px', height: '45vh', minHeight: '220px', border: '1px solid rgba(0,240,255,0.12)' }}
      >
        <canvas ref={canvasRef} className="block" aria-label="Tutorial animation showing how to play" role="img" />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-5 mb-7">
        {[
          { label: 'Perfect', color: '#22c55e' },
          { label: 'Good', color: '#eab308' },
          { label: 'OK', color: '#f97316' },
          { label: 'Miss', color: '#ef4444' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', color: '#4a4e6a', fontWeight: 400, letterSpacing: '0.05em' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <button onClick={handleContinue} className="btn-neon">
        Got it, let's play
      </button>
      <button
        onClick={handleContinue}
        style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.72rem', color: '#2a2e4a', marginTop: '14px', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#4a4e6a')}
        onMouseLeave={e => (e.currentTarget.style.color = '#2a2e4a')}
      >
        Don't show this again
      </button>
    </div>
  );
}
