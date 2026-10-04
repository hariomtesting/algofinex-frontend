/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080B10',
        canvas: '#0B0F17',
        surface: {
          DEFAULT: '#111723',
          elevated: '#161E2E',
          card: '#192234',
          highlight: '#202C42',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          medium: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.20)',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        brand: {
          blue: '#3B82F6',
          cobalt: '#2563EB',
          accent: '#60A5FA',
        },
        signal: {
          bull: '#10B981',
          bullGlow: 'rgba(16, 185, 129, 0.15)',
          bear: '#EF4444',
          bearGlow: 'rgba(239, 68, 68, 0.15)',
          alert: '#F59E0B',
          neutral: '#94A3B8',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
          dim: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter Display"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
        snug: '-0.015em',
        wide: '0.04em',
        widest: '0.08em',
      },
      boxShadow: {
        'terminal': '0 30px 90px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'panel': '0 12px 36px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'glow-blue': '0 0 32px -4px rgba(59, 130, 246, 0.25)',
        'glow-bull': '0 0 24px -4px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}
