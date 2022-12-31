/** @type {import('tailwindcss').Config} */
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
  },
  plugins: [],
}
