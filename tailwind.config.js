module.exports = {
  purge: ['./pages/**/*.{jsx,js,ts,,tsx}', './components/**/*.{jsx,js,ts,,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        amazon_blue:{
          light:'#232F3E',
          DEFAULT:'#131921'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
