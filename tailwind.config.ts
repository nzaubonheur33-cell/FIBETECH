import type { Config } from 'tailwindcss'

// Couleurs de la marque Fibetech : encre, cuivre (Lubumbashi, capitale du cuivre)
// et malachite (pierre verte du Katanga).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#121614',
          soft: '#3A433F',
          muted: '#5B6661',
        },
        stone: '#F1F4F1',
        line: '#DCE3DE',
        copper: {
          DEFAULT: '#B4532A',
          dark: '#9C4521',
          light: '#E8A07A',
          soft: '#FCEBDD',
          deep: '#8A3A17',
          pale: '#F3C3A5',
        },
        mal: {
          DEFAULT: '#0E5A45',
          deep: '#0A1F19',
          panel: '#0F2A22',
          glow: '#3FBF8E',
          soft: '#DDF2E9',
          mist: '#A9BDB4',
          fog: '#C9D6D0',
        },
        mustard: '#E0A93B',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Figtree Variable"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: {
        wrap: '1240px',
      },
    },
  },
  plugins: [],
} satisfies Config
