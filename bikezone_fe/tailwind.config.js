/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{html,js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'move-right': 'moveRight 10s linear infinite',
        'move-diagonal': 'moveDiagonal 4s ease-in-out infinite',
      },
      keyframes: {
        moveRight: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        moveDiagonal: {
          '0%': {
            transform: 'translate(0, 0)',
          },
          '50%': {
            transform: 'translate(10px, 10px)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),

  ],
  variants: {
    width: ["responsive", "hover", "focus"]
  },
}
)
// module.exports = withMT({
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });