/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        toy: "0 18px 0 rgba(20, 31, 52, 0.08), 0 26px 48px rgba(44, 54, 91, 0.14)",
        button: "0 8px 0 var(--button-depth), 0 14px 24px rgba(30, 42, 72, 0.14)",
      },
      borderRadius: {
        chunky: "28px",
      },
    },
  },
  plugins: [],
};
