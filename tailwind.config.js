/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      uw: '1920px'
    },
    extend: {
      colors: {
        goldenOchre: '#D7A31A',
        softCharcoal: '#191b20',
        deepCharcoal: '#131519',
        slateOnyx: '#2A2C31',
        charcoalGray: '#33353A',
        charcoalGrayLight: '#7A7E85', 
        stoneGray: '#757575',
        ashGray: '#6B6B6B',
        nightSky: '#1C1E24',
        frostWhite: '#D1D1D1',
        cloudGray: '#E0E0E3',
        softGray: '#F5F5F5',
        midnightSlate: '#25272E',
        'modal-translucent': 'rgb(28, 30, 36, 0.80)'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'os': ['Open Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      fontSize: {
        '1.375': '1.375rem', //22px
        '1.75': '1.75rem', // 28px
      },
      fontWeight: {
        'r': '400',
        'b': '700',
        'eb': '800'
      },
      spacing: {
        '0.21': '0.21rem', // 3.36px
        '0.5': '0.5rem', // 8px
        '[x-pad]': '1rem', // 16px
        '1.875': '1.875rem', // 30px
        '2.375': '2.375rem', // 38px
        '4.1875': '4.1875rem', // 67px
        '4.5': '4.5rem', // 72px
        '6.25': '6.25rem', // 100px
        '10.25': '10.25rem', // 164px
      },
      height: {
        '9.5': '9.5rem', // 152px
      },
      boxShadow: {
        '3xl': '0px 0px 12px 0 #757575',
        inner: 'inset -2px 0px 18px 10px #131519',
        outer: '0px 0px 4px 2px rgba(150, 150, 150, 0.2)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* For modern browsers */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', /* Chrome, Safari, and Opera */
        },
      }, ['responsive', 'hover']);
    },
  ]
}


