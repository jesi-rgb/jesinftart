module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    fontFamily: {
      body: ["Space Mono", "system-ui"],
      titles: ["BioRhyme", "system-ui"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
