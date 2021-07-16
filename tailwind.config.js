module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['PublicSans', 'sans-serif'],
      helvetica: ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        push: 'push 0.3s linear 1',
      },
      borderWidth: {
        3: '3px',
      },
      colors: {
        primary: { DEFAULT: '#00f782', dark: '#00b35f' },
        gray: {
          lighter: '#7A7A7A',
          light: '#55595c',
          DEFAULT: '#3a3a3a',
          dark: '#333132',
        },
      },
      keyframes: {
        push: {
          '50%': { transform: 'scale(0.8)' },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
      backgroundColor: ['selection'],
      display: ['group-hover', 'hover'],
      transitionDuration: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-selection-variant'),
  ],
};
