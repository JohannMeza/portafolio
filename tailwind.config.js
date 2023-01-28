module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    fontFamily: {
      'Comfortaa': 'Comfortaa',
      'Poppins': 'Poppins',
      'OpenSans': 'Open Sans'
    },
    fontSize: {
      'title-1': '35px',
      'title-2': '25px',
      'title-3': '20px',
      
      'button-1': '20px',
      'button-2': '18px',
      'button-3': '14px',

      'paragraph-1': '18px',
      'paragraph-2': '16px',
      'paragraph-3': '14px',
      
      'span-1': '12px',
      'span-2': '10px',
      'span-3': '8px',
    },
    colors: {
      'primary': '#160F6F',
      'secondary': '#88006F',
      'text': '#222222',
      'none': 'transparent',
      'white': '#fff',

      "blue-700": "#160F6F",
      "blue-600": "#00429E",
      "blue-500": "#006BBB",
      "blue-400": "#0093C6",
      "blue-300": "#00BAC5",
      "blue-200": "#30DEC0",
      
      "rose-600": "#88006F",
      "rose-500": "#AF3793",
      "rose-400": "#D85FB8",
      "rose-300": "#FF85DF",
      "rose-200": "#FFACFF",
      
      "white-700": "#222222",
      "white-600": "#5E5E5E",
      "white-500": "#616161",
      "white-400": "#919191",
      "white-300": "#C6C6C6",
      "white-200": "#E8E8E8",
      "white-100": "#FFFFFF",
      
      "yellow-500": "#FFB44B",
      "red-500": "#d90429",
    },
    extend: {
      backgroundImage: theme => ({
        'gradient': 'linear-gradient(90deg, #88006F 0%, #160F6F 89.14%)',
        'banner': 'linear-gradient(90deg, rgba(136, 1, 111, 0.9) 0%, rgba(22, 15, 111, 0.9) 100%), url(./assets/imagenes/banner.png)',
        'banner-tech': 'url(./assets/svg/background-gradient.svg)',
      }),
      backgroundColor: theme => ({
        'loader': 'rgba(22, 15, 111, 0.8)',
      })
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}