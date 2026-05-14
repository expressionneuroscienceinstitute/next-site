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
      variants: ['dark'],
    },
    {
      pattern: /^text-(emerald|blue|violet|amber)-(300|400|700)$/,
      variants: ['dark'],
    },
    {
      pattern: /^border-(emerald|blue|violet|amber)-(400|500|600)$/,
      variants: ['dark'],
    },
    'text-white',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#80ed99',
        secondary: '#caf0f8',
        background: {
          light: '#fafafa',
          dark: '#10002b',
        },
        text: {
          light: '#1a1a2e',
          dark: '#e8e6ed',
        },
        muted: {
          light: '#5c5c6e',
          dark: '#a39bb3',
        },
        accent: {
          light: '#4CAF50',
          dark: '#38bdf8',
        },
        purple: {
          light: '#c77dff',
          dark: '#7b2cbf',
        },
        'accent-light': '#4CAF50',
        'accent-dark': '#38bdf8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
      },
    },
  },
  plugins: [],
}
