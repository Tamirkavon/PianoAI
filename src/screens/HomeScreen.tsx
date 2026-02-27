interface Props {
  onStart: () => void;
}

export function HomeScreen({ onStart }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {/* Cool radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Piano key silhouette at bottom — neon outlines */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '10vh', opacity: 0.12 }}>
        <div className="flex h-full">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background: 'linear-gradient(to top, rgba(0,240,255,0.15) 0%, transparent 100%)',
                borderRight: '1px solid rgba(10,10,15,0.9)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center animate-fade-in px-6" style={{ maxWidth: '720px' }}>
        {/* Ornament row */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <div style={{ height: '1px', width: '56px', background: 'rgba(0,240,255,0.3)' }} />
          <span style={{ color: '#4a4e6a', fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', fontFamily: '"Space Mono", monospace', fontWeight: 400 }}>
            A New Way to Play
          </span>
          <div style={{ height: '1px', width: '56px', background: 'rgba(0,240,255,0.3)' }} />
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: '"Syncopate", sans-serif',
            fontSize: 'clamp(3.5rem, 12vw, 7.5rem)',
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            marginBottom: '1.75rem',
            color: '#e0e6ff',
          }}
        >
          PIANO<span style={{ color: '#00f0ff', textShadow: '0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2)' }}>AI</span>
        </h1>

        {/* Neon rule */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.55), transparent)',
          margin: '0 auto 1.75rem',
          maxWidth: '300px',
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontWeight: 400,
          fontSize: '0.72rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#4a4e6a',
          marginBottom: '3rem',
        }}>
          Learn piano, note by note
        </p>

        {/* CTA */}
        <button onClick={onStart} className="btn-neon" aria-label="Start playing piano">
          Begin Session
        </button>
      </div>

      {/* Scanline overlay */}
      <div className="scanline-overlay" />
    </div>
  );
}
