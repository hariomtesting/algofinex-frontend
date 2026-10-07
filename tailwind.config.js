/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080A0D',
        canvas: '#0B0E13',
        surface: {
          DEFAULT: '#101318',
          elevated: '#141820',
          card: '#12161E',
          subtle: '#181E28',
          highlight: '#1E2532',
          glass: 'rgba(16, 19, 24, 0.85)',
        },
        border: {
          DEFAULT: '#20252C',
          subtle: '#1C2128',
          medium: '#2A323D',
          strong: '#3B4654',
          accent: '#C8A96B',
          'accent-muted': 'rgba(200, 169, 107, 0.3)',
        },
        brand: {
          accent: '#C8A96B',
          'accent-hover': '#D8BB80',
          'accent-muted': 'rgba(200, 169, 107, 0.12)',
          gold: '#C8A96B',
        },
        signal: {
          bull: '#6FAF8A',
          'bull-muted': 'rgba(111, 175, 138, 0.14)',
          bear: '#C87878',
          'bear-muted': 'rgba(200, 120, 120, 0.14)',
          alert: '#D4A359',
          neutral: '#8B929C',
        },
        text: {
          primary: '#F3F4F6',
          secondary: '#8B929C',
          muted: '#6B7380',
          dim: '#4B5563',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        snug: '-0.015em',
        normal: '0',
        wide: '0.04em',
        widest: '0.08em',
      },
      boxShadow: {
        'workstation': '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px #20252C',
        'terminal': '0 20px 50px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px #20252C',
        'panel': '0 8px 30px 0 rgba(0, 0, 0, 0.7), 0 0 0 1px #20252C',
        'card-hover': '0 12px 32px 0 rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(200, 169, 107, 0.25)',
        'accent-subtle': '0 0 20px -5px rgba(200, 169, 107, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
