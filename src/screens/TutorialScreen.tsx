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

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Lane guides
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 14; i++) {
        const laneX = (i + 0.5) * (w / 14);
        ctx.beginPath();
        ctx.moveTo(laneX, 0);
        ctx.lineTo(laneX, hitY);
        ctx.stroke();
      }

      // Hit line
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, hitY);
      ctx.lineTo(w, hitY);
      ctx.stroke();

      // Hit zone glow
      const lineGrad = ctx.createLinearGradient(0, hitY - 15, 0, hitY + 15);
      lineGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
      lineGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
      lineGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, hitY - 15, w, 30);

      // "Hit Zone" label
      ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Hit Zone ▸', w - 8, hitY - 6);

      // Mini keyboard outlines at bottom
      const kbTop = hitY + 8;
      const kbH = h - kbTop - 4;
      if (kbH > 10) {
        const wkw = w / 14;
        for (let i = 0; i < 14; i++) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
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
          // Falling note (hasn't reached hit line yet)
          const y = hitY - dt * pps;
          if (y + noteH > 0) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            roundRect(ctx, x - noteW / 2, y - noteH, noteW, noteH, 4);
            ctx.fill();
            ctx.restore();
          }
        } else {
          // Note reached/passed hit line — show result
          const elapsed = -dt;
          if (elapsed < 1.2) {
            const resultColor = RESULT_COLORS[dn.result];
            const label = RESULT_LABELS[dn.result];

            // Fading note
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - elapsed * 1.5);
            ctx.fillStyle = resultColor;
            ctx.shadowColor = resultColor;
            ctx.shadowBlur = 15;
            roundRect(ctx, x - noteW / 2, hitY - noteH, noteW, noteH, 4);
            ctx.fill();
            ctx.restore();

            // Result text floating up
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - elapsed * 1.2);
            ctx.fillStyle = resultColor;
            ctx.font = 'bold 16px Poppins, sans-serif';
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
    localStorage.setItem('pianoai-tutorial-seen', '1');
    goTo('select');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-2 font-display animate-fade-in">How to Play</h2>
      <p className="text-slate-400 text-sm mb-4 text-center max-w-md">
        Press the matching key when a note reaches the hit zone line
      </p>

      <div ref={containerRef} className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: '45vh', minHeight: '220px' }}>
        <canvas ref={canvasRef} className="block" />
      </div>

      <div className="flex items-center gap-6 mt-5 mb-6">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-300">Perfect</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-slate-300">Good</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-xs text-slate-300">OK</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-slate-300">Miss</span>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 font-display"
      >
        Got it, let's play!
      </button>
      <button
        onClick={handleContinue}
        className="text-slate-500 text-sm mt-3 hover:text-slate-300 transition"
      >
        Don't show this again
      </button>
    </div>
  );
}
