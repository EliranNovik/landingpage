/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f7f0e6",
          dark: "#f2e6d4",
        },
        accent: {
          DEFAULT: "#7a4434",
          hover: "#683a2d",
          muted: "#9a6b5c",
        },
        charcoal: "#2c2420",
        muted: "#5c524c",
        card: "#ffffff",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
