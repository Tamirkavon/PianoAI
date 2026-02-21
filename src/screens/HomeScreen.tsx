import { Music } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export function HomeScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 px-4">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative">
          <Music className="w-20 h-20 mx-auto text-indigo-400 animate-glow-pulse" />
          <div className="absolute inset-0 blur-xl bg-indigo-500/20 rounded-full" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-display">
          PianoAI
        </h1>
        <p className="text-xl text-slate-400 font-body">
          Learn piano, note by note
        </p>
        <button
          onClick={onStart}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 font-display"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}
