import { useRef, useEffect } from 'react';
import { Song, NoteState } from '../types';
import { getNoteX, getNoteColor, isBlackNote } from '../utils/noteHelpers';

interface Props {
  song: Song;
  noteStates: React.MutableRefObject<NoteState[]>;
  elapsedTime: React.MutableRefObject<number>;
}

const LOOK_AHEAD = 4;
const HIT_LINE_Y = 0.88;

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

export function FallingNotesCanvas({ song, noteStates, elapsedTime }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

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
      const now = elapsedTime.current;
      const hitY = h * HIT_LINE_Y;
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
      lineGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.1)');
      lineGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, hitY - 15, w, 30);

      const states = noteStates.current;
      for (let i = 0; i < states.length; i++) {
        const ns = states[i];
        const dt = ns.time - now;
        if (dt > LOOK_AHEAD + 1 || dt < -2) continue;

        const x = getNoteX(ns.note, w);
        const y = hitY - dt * pps;
        const noteH = Math.max(ns.duration * pps, 16);
        const noteW = isBlackNote(ns.note) ? w / 14 * 0.35 : w / 14 * 0.5;
        const color = getNoteColor(ns.note);

        ctx.save();
        if (ns.status === 'upcoming') {
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 15;
          roundRect(ctx, x - noteW / 2, y - noteH, noteW, noteH, 5);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          roundRect(ctx, x - noteW / 2 + 2, y - noteH + 2, noteW - 4, Math.min(noteH / 3, 8), 3);
          ctx.fill();
        } else if (ns.status === 'perfect' || ns.status === 'good' || ns.status === 'ok') {
          ctx.globalAlpha = Math.max(0, 1 - (now - ns.time) * 2.5);
          ctx.fillStyle = ns.status === 'perfect' ? '#22c55e' : ns.status === 'good' ? '#eab308' : '#f97316';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 25;
          roundRect(ctx, x - noteW / 2, y - noteH, noteW, noteH, 5);
          ctx.fill();
        } else if (ns.status === 'missed') {
          ctx.globalAlpha = Math.max(0, 1 - (now - ns.time - 0.5) * 2);
          ctx.fillStyle = '#ef4444';
          roundRect(ctx, x - noteW / 2, y - noteH, noteW, noteH, 5);
          ctx.fill();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [song, noteStates, elapsedTime]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="block" aria-label="Falling notes game area" role="img" />
    </div>
  );
}
