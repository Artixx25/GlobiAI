/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    backgroundSize: {
      '200%': '200%',
    },
    extend: {
      flexGrow: {
        3: '3'
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px #53a71755',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px #53a717',
        lightMain: 'inset 0px 0px 15px 5px rgba(255, 255, 255, 1)',
        profile: 'inset 0px 50px 50px 50px rgba(0, 0, 0, .6)'
      },
    },
  },
  plugins: [],
};