const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "main-color": "#054d3b",
        "secondary-color": "#799e29"
      },
    }
  },
  plugins: [],
}
