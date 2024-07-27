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
        fadeInSlow: "fadeInSlow 0.6s ease-in-out",
        showDialog: "showDialog 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInSlow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        showDialog: {
          "0%": { opacity: 0, top: "-100%" },
          "100%": { opacity: 1, top: "50%" },
        },
      },
      boxShadow: {
        primary: "0 0 15px -7px #4f46e5",
      },
    },
  },
  plugins: [],
};
