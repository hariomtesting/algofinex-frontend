/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF7',
        canvas: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F1F4FF',
          elevated: '#FFFFFF',
          card: '#FFFFFF',
          subtle: '#F6F6F2',
          highlight: '#F0F3FA',
        },
        border: {
          DEFAULT: '#EAEAE5',
          subtle: '#F0F1EE',
          medium: '#D8D8D2',
          strong: '#B8B8B0',
          accent: '#4F6BFF',
        },
        brand: {
          accent: '#4F6BFF',
          'accent-hover': '#4059E0',
          'accent-subtle': '#EEF2FF',
          blue: '#4F6BFF',
          violet: '#8B5CF6',
          coral: '#FF6B6B',
          mint: '#35C99A',
          yellow: '#F4C95D',
        },
        signal: {
          bull: '#35C99A',
          'bull-muted': '#ECFBF6',
          bear: '#FF6B6B',
          'bear-muted': '#FEF2F2',
          alert: '#F4C95D',
          neutral: '#666B76',
        },
        text: {
          primary: '#17181C',
          secondary: '#666B76',
          muted: '#9CA3AF',
          dim: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(79, 107, 255, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 12px 30px rgba(0, 0, 0, 0.08)',
        'workstation': '0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'terminal': '0 8px 24px rgba(0, 0, 0, 0.05)',
        'panel': '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
