/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FF5733",
          secondary: "#33FF57",
          accent: "#5733FF",
          neutral: "#CCCCCC",
          "base-100": "#FFFFFF",
          "base-200": "#F0F0F0",
          "base-300": "#E0E0E0",
        },
      },
    ],
  },
};
