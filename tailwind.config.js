/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        moderateBlue: { DEFAULT: "hsl(238, 40%, 52%)" },
        softRed: { DEFAULT: "hsl(358, 79%, 66%)" },
        lightGrayishBlue: { DEFAULT: "hsl(239, 57%, 85%)" },
        paleRed: { DEFAULT: "hsl(357, 100%, 86%)" },
        darkBlue: { DEFAULT: "hsl(212, 24%, 26%)" },
        grayishBlue: { DEFAULT: "hsl(211, 10%, 45%)" },
        lightGray: { DEFAULT: "hsl(223, 19%, 93%)" },
        veryLightGray: { DEFAULT: "hsl(228, 33%, 97%)" },
      },
    },
  },
  plugins: [],
};
