/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#101015",
        boxPrimary: "#15151A",
        boxSecondary: "#19191E",
        boxTertiary: "#1f1f25",

        primary: "#4f46e5",

        textPrimary: "#ffffff",
        textSecondary: "#b5b5b5",
        textTertiary: "#8e8e8e",
        textQuaternary: "#66686b",
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
