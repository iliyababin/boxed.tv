/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#373737'
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp')
  ],
}
