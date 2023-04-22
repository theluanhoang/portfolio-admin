/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:
  {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      screens: {
        'mymd': '991px',
        'mylg': '1142px',
        'sm-[580]': '570px',
        'xs-[320px]': '320px',
        'xs-[333px]': '333px',
      },
      colors: {
        'my-yellow': '#FFB400',
        'light': '#666666'
      }
    }
  },
  plugins: [],
}