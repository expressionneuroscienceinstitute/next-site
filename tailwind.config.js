/** @type {import('@tailwindcss/postcss7-compat').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    options: {
      safelist: [
        /^bg-(emerald|blue|violet|amber)/,
        /^text-(emerald|blue|violet|amber)/,
        /^border-(emerald|blue|violet|amber)/,
        'text-white',
      ],
    },
  },
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
      colors: {
        // Light mode colors
        'primary': '#80ed99',
        'secondary': '#caf0f8',
        'background': {
          light: '#ffffff',
          dark: '#10002b'
        },
        'text': {
          light: '#1a1a2e',
          dark: '#e0e0e0'
        },
        'accent': {
          light: '#4CAF50',
          dark: '#00f5d4'
        },
        'purple': {
          light: '#c77dff',
          dark: '#7b2cbf'
        },
        // Define the specific colors used by the classes in Timeline.tsx
        'accent-light': '#4CAF50', // Your light accent color
        'accent-dark': '#00f5d4',  // Your dark accent color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'theme-transition': 'theme 0.5s ease-in-out',
      },
      keyframes: {
        theme: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 