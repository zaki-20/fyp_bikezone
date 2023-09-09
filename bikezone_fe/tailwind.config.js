/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.{html,js,jsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin'),

  ],
}