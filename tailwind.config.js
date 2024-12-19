/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'ssm': '320px',
      // => @media (min-width: 320px) { ... }
      'ms': '385px',
      // => @media (min-width: 385px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        ortindig: {
          700: '#9b26b6',
          800: '#761f89',
          900: '#641e71',
          950: '#40084a',
        },
        ortgray: {
          300: '#adafb3',
          400: '#84888c',
          500: '#63666a',
          600: '#5a5c60',
          700: '#4d4e51',
          800: '#434447',
          900: '#3b3c3e',
          950: '#252527',
        }
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      })
    },
  ],
};


