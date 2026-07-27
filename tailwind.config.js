/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Claude coral (primary)
        coral: {
          DEFAULT: '#cc6a44',
          deep: '#b4552f',
          bright: '#e0855f',
          soft: '#f3e2d8',
        },
        // Charter secondaries
        plum: {
          DEFAULT: '#3a1f5c',
          deep: '#28133f',
          soft: '#b9a6cf',
          line: '#4c2d70',
        },
        magenta: { DEFAULT: '#c8266f', soft: '#e79ac0' },
        teal: { DEFAULT: '#2ba0b0', bright: '#3cb9c9' },
        indigo: { DEFAULT: '#3f3a8c', bright: '#5751ad' },
        gold: '#e0a92e',
        grass: { DEFAULT: '#4f8a3a', deep: '#3a6a2a', bg: '#eef4e8' },
        quiz: { DEFAULT: '#7a3ea0', bg: '#f4ecf6' },
        // Neutrals
        ink: { DEFAULT: '#1c1a17', soft: '#4a463f' },
        paper: '#f4f1ea',
        card: '#fffdf8',
        line: { DEFAULT: '#e6e0d4', soft: '#efe9dd' },
        muted: '#6b655c',
        // Reference-architecture layer palette
        L1: { DEFAULT: '#cc6a44', b: '#e0855f' },
        L2: { DEFAULT: '#7a3ea0', b: '#9257bd' },
        L3: { DEFAULT: '#c8266f', b: '#dc4d8c' },
        L4: { DEFAULT: '#2ba0b0', b: '#3cb9c9' },
        L5: { DEFAULT: '#3f3a8c', b: '#5751ad' },
        L6: { DEFAULT: '#6a5170', b: '#836a89' },
        gov: '#28133f',
      },
      fontFamily: {
        head: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Cascadia Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        s: '0 1px 2px rgba(40,19,63,.05),0 2px 8px rgba(40,19,63,.05)',
        m: '0 4px 14px rgba(40,19,63,.08),0 12px 30px rgba(40,19,63,.06)',
        l: '0 10px 30px rgba(40,19,63,.14),0 30px 70px rgba(40,19,63,.10)',
      },
      borderRadius: { xl2: '14px' },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .4s ease both',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
}
