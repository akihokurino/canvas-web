module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        content: "1180px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
