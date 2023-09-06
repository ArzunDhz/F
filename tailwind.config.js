/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "560px" },
      md: { min: "561px" },
      lg: { min: "1280px" },
    },
    extend: {
      colors: {
        "primary-dark": "#000000",
        "secondary-dark": "#070707",
        "primary-light": "#FBF6F6",
        "secondary-light": "#FFFFFF",
        pop: "#9757FF",
        primary: "#9879CB",
      },
    },
  },

  plugins: [require("tailwindcss-debug-screens")],
};
