/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "reddit-orange": "#ff3c00",
        "bg-gray": "#e5e7eb",
      },
    },
    fontFamily: {
      inter: "Inter",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
