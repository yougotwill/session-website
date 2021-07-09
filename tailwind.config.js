module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['PublicSans, sans-serif'],
    },
    extend: {
      borderWidth: {
        3: '3px',
      },
      colors: {
        primary: '#00f782',
        gray: {
          lighter: '#7A7A7A',
          light: '#55595c',
          DEFAULT: '#3a3a3a',
          dark: '#333132',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['selection'],
      display: ['hover', 'group-hover'],
      transitionDuration: ['group-hover'],
    },
  },
  plugins: [require('tailwindcss-selection-variant')],
};
