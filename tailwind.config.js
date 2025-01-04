/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customRed: "#FF2929", // Custom red color
        customBlue: "#3D3BF3", // Custom blue color
        customLightBlue :"#0589ff",
        customYellow: "#F59E0B", // Tailwind's yellow-600 equivalent
        customWhite: "#FBFBFB", // Custom red color
        customGreen: "#4CAF50", // Custom green color
      },
    },
  },
  plugins: [],
};
