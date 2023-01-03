/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'open':['Open sans','sans serif']
      },
      colors: {
        'primary':"#FB7D0F",
        'light-grey':"#f9f9f9",
        'dark-grey':"#414141",
        'grey':"#dedede"
      }
    },
    screens: {
      'xs':'300px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}
