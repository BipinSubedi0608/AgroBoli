/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A7123",
      },
      zIndex: {
        max: 2147483647,
        9999: 9999,
        1000: 1000,
        100: 100,
      },
      maxHeight: {
        144: "36rem",
      },
      height: {
        half: "50%",
      },
      width: {
        half: "50%",
      },
    },
  },
  plugins: [],
};
