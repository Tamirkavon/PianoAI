/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          bg: '#0a0a0f',
          surface: '#0f0f1a',
          card: '#12121f',
          border: '#1a1a2e',
          cyan: '#00f0ff',
          'cyan-muted': '#007a82',
          magenta: '#ff2d95',
          'magenta-muted': '#991a5a',
          violet: '#8b5cf6',
          'violet-muted': '#5b3da6',
          text: '#e0e6ff',
          'text-muted': '#4a4e6a',
          'text-dim': '#2a2e4a',
        },
      },
      fontFamily: {
        display: ['"Syncopate"', 'sans-serif'],
        body: ['"Space Mono"', 'monospace'],
        score: ['"Orbitron"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
