/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src///*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8642E5",
        secondary: "#DEDEDE",
        fonts: "#6E7191"
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #8642E5, #4800B3)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
