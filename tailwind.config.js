/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#5624d0",
        black: "#2d2f31",
      },
      boxShadow: {
        footer: "0 -2px 4px rgba(0,0,0,.08), 0 -4px 12px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
