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
          "primary-content": "#FFFFFF",
          secondary: "#0a6e24",
          "secondary-content": "#000000",
          accent: "#5733FF",
          "accent-content": "#FFFFFF",
          neutral: "#CCCCCC",
          "neutral-content": "#000000",
          "base-100": "#FFFFFF",
          "base-200": "#F0F0F0",
          "base-300": "#E0E0E0",
        },
      },
    ],
  },
};
