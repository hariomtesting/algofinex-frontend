/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05080E',
        canvas: '#080C16',
        surface: {
          DEFAULT: '#0D1322',
          elevated: '#131B2E',
          card: '#0A0E1A',
          subtle: '#111728',
          warm: '#0E1526',
          blueprint: '#070B14',
          highlight: '#1E293B',
          glass: 'rgba(13, 19, 34, 0.7)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.14)',
          strong: 'rgba(255, 255, 255, 0.24)',
          focus: 'rgba(0, 240, 144, 0.45)',
          neon: 'rgba(0, 240, 144, 0.3)',
          cyan: 'rgba(0, 229, 255, 0.3)',
        },
        brand: {
          blue: '#3B82F6',
          cobalt: '#2563EB',
          accent: '#00F090',
          emerald: '#00F090',
          cyan: '#00E5FF',
          purple: '#A855F7',
          light: '#0A1A1A',
        },
        signal: {
          bull: '#00F090',
          bullTint: 'rgba(0, 240, 144, 0.12)',
          bear: '#FF3B69',
          bearTint: 'rgba(255, 59, 105, 0.12)',
          alert: '#F59E0B',
          neutral: '#94A3B8',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          dim: '#64748B',
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
        'workstation': '0 25px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'terminal': '0 20px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 240, 144, 0.18)',
        'panel': '0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-blue': '0 0 30px -4px rgba(59, 130, 246, 0.35)',
        'glow-emerald': '0 0 30px -4px rgba(0, 240, 144, 0.35)',
        'glow-cyan': '0 0 30px -4px rgba(0, 229, 255, 0.35)',
        'glow-bull': '0 0 25px -4px rgba(0, 240, 144, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
