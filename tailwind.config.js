/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /^bg-(emerald|blue|violet|amber)-(700|900)(-\d+)?$/,
      variants: ['dark']
    },
    {
      pattern: /^text-(emerald|blue|violet|amber)-(300|400|700)$/,
      variants: ['dark']
    },
    {
      pattern: /^border-(emerald|blue|violet|amber)-(400|500|600)$/,
      variants: ['dark']
    },
    'text-white',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        primary: '#80ed99',
        secondary: '#caf0f8',
        background: {
          light: '#fafafa',
          dark: '#0a0014',
        },
        surface: {
          light: '#ffffff',
          dark: '#160030',
        },
        text: {
          light: '#0f0a1f',
          dark: '#f4f0ff',
        },
        muted: {
          light: '#4b4760',
          dark: '#b9a8d9',
        },
        accent: {
          light: '#7c3aed',
          dark: '#a855f7',
        },
        neon: {
          pink: '#ff2bd6',
          cyan: '#00f5d4',
          lime: '#c8ff00',
          violet: '#9d4edd',
        },
        purple: {
          light: '#c77dff',
          dark: '#7b2cbf',
        },
        'accent-light': '#7c3aed',
        'accent-dark': '#a855f7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-light':
          'linear-gradient(to right, rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.08) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.12) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(168, 85, 247, 0.35)',
        'glow-cyan': '0 0 30px rgba(0, 245, 212, 0.35)',
        'glow-pink': '0 0 30px rgba(255, 43, 214, 0.35)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
      },
      keyframes: {
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
