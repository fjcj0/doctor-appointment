/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'white',
        'hover-color': '#6930c3',
        'secondary': 'black',
        'opacity-color': '#959396',
        'blue': {
          '1': '#EBF0FF',
          '2': '#5B75FF',
        },
        'green': {
          '1': '#FCFDF9',
          '2': '#ACD4C3',
        },
        'red': {
          '1': '#E9A0A9',
          '2': '#FDF6F6'
        },
        'purple': {
          '1': '#F3F4FF',
          '2': '#6573F7'
        },
      },
      fontFamily: {
        'caprasimo': ['Caprasimo', 'serif'],
        'comic-neue': ['Comic Neue', 'cursive'],
        'hachi-maru-pop': ['Hachi Maru Pop', 'cursive'],
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        'josefin-slab': ['Josefin Slab', 'serif'],
        'kalam': ['Kalam', 'cursive'],
        'kanchenjunga': ['Kanchenjunga', 'serif'],
        'lilita-one': ['Lilita One', 'cursive'],
        'merienda': ['Merienda', 'cursive'],
        'mochiy-pop-p-one': ['Mochiy Pop P One', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
        'parkinsans': ['Parkinsans', 'sans-serif'],
        'patua-one': ['Patua One', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': 900,
      }
    },
  },
  plugins: [],
}