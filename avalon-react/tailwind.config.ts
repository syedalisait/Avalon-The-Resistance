import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#1a1a2e',
        'bg-tertiary': '#16213e',

        // Alignment colors
        'good': '#4ade80',
        'evil': '#ef4444',
        'neutral': '#94a3b8',

        // Role-specific colors
        'merlin': '#60a5fa',
        'morgana': '#a855f7',
        'assassin': '#dc2626',
        'perceival': '#34d399',
        'modred': '#991b1b',
        'oberon': '#7c2d12',

        // UI elements
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'border': '#334155',
        'accent': '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
} satisfies Config
