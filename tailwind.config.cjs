/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'fintech-blue': '#131D49',
        'fintech-yellow': '#D6AD60'
      },
      fontFamily: {
        chakraPetch: ['Chakra Petch'],
        inter: ['Inter'],
        MSGothic: ['MS Gothic'],
      },
      backgroundImage: {
        'landing-page': "url('/landingpage.svg')",
      },
      spacing: {
        '5vh': '5vh',
        '10vh': '10vh',
        '15vh': '15vh',
        '20vh': '20vh',
        '30vh': '30vh',
      }
    },
  },
  plugins: [],
};
