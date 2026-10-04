/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F8F6',
        canvas: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F3F5',
          warm: '#F4F2EC',
          blueprint: '#EDF2F7',
          highlight: '#E2E8F0',
        },
        border: {
          subtle: 'rgba(15, 23, 42, 0.08)',
          medium: 'rgba(15, 23, 42, 0.14)',
          strong: 'rgba(15, 23, 42, 0.24)',
          focus: 'rgba(29, 78, 216, 0.35)',
        },
        brand: {
          blue: '#1D4ED8',
          cobalt: '#1E40AF',
          accent: '#0284C7',
          light: '#EFF6FF',
        },
        signal: {
          bull: '#059669',
          bullTint: 'rgba(5, 150, 105, 0.08)',
          bear: '#DC2626',
          bearTint: 'rgba(220, 38, 38, 0.08)',
          alert: '#D97706',
          neutral: '#64748B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          dim: '#94A3B8',
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
        'workstation': '0 24px 60px -15px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(15, 23, 42, 0.06)',
        'terminal': '0 20px 50px -12px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.08)',
        'panel': '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.06)',
        'glow-blue': '0 0 24px -4px rgba(29, 78, 216, 0.20)',
        'glow-bull': '0 0 20px -4px rgba(5, 150, 105, 0.20)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
