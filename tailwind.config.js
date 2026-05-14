/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /^bg-(emerald|blue|violet|amber|rose)-(700|900)(-\d+)?$/,
      variants: ['dark'],
    },
    {
      pattern: /^text-(emerald|blue|violet|amber|rose)-(300|400|700)$/,
      variants: ['dark'],
    },
    {
      pattern: /^border-(emerald|blue|violet|amber|rose)-(400|500|600)$/,
      variants: ['dark'],
    },
    'text-white',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#80ed99',
        secondary: '#caf0f8',
        background: {
          light: '#f7f5fb',
          dark: '#0c0612',
        },
        text: {
          light: '#14101c',
          dark: '#f2eef9',
        },
        muted: {
          light: '#5c5568',
          dark: '#a89fc0',
        },
        accent: {
          light: '#059669',
          dark: '#34d399',
        },
        coral: {
          light: '#e11d48',
          dark: '#fb7185',
        },
        purple: {
          light: '#9333ea',
          dark: '#a78bfa',
        },
        'accent-light': '#059669',
        'accent-dark': '#34d399',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        /* Base washes use alpha so the neuron field shows through slightly */
        'hero-shell-light':
          'linear-gradient(180deg, rgba(247,245,251,0.28) 0%, rgba(251,248,250,0.22) 45%, rgba(243,238,245,0.32) 100%), radial-gradient(ellipse 100% 70% at 100% -8%, rgba(225,29,72,0.11), transparent 52%), radial-gradient(ellipse 85% 50% at -5% 42%, rgba(5,150,105,0.09), transparent 48%)',
        'hero-shell-dark':
          'linear-gradient(180deg, rgba(20,10,28,0.35) 0%, rgba(12,6,18,0.3) 50%, rgba(8,5,16,0.42) 100%), radial-gradient(ellipse 110% 75% at 95% -12%, rgba(251,113,133,0.16), transparent 55%), radial-gradient(ellipse 90% 55% at -5% 45%, rgba(52,211,153,0.11), transparent 50%)',
      },
      boxShadow: {
        lift: '0 12px 40px -12px rgba(20, 16, 28, 0.12)',
        'lift-dark': '0 16px 48px -14px rgba(0, 0, 0, 0.45)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
      },
    },
  },
  plugins: [],
}
