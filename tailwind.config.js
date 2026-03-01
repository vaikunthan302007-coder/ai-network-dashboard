/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        secondary: "#facc15",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
}