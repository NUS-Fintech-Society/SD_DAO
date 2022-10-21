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
    },
  },
  plugins: [],
};
