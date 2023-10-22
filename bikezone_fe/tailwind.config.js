/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{html,js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {

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