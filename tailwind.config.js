/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        hint: '#FF5722',
        shade: '#191B20',
        secondary: '#757575',
        primary: '#1C1E24',
        discord: '#6A5ACD',
        github: '#323439',
        mauve: '#9966A2'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'os': ['Open Sans', 'sans-serif'],
        'cn': ['Courier New', 'monospace']
      },
      fontSize: {
        '1.75xl': '1.75rem', // 28px
        '1.375': '1.375rem' //22px
      },
      fontWeight: {
        'r': '400',
        'b': '700',
        'eb': '800'
      },
      spacing: {
        '0.312': '0.312rem', // 1.4px
        '0.21': '0.21rem', // 3.36px
        '0.5': '0.5rem', // 8px
        '1.375': '1.375rem', // 22px
        '1.625': '1.625rem', // 26px
        '1.875': '1.875rem', // 30px
        '2.375': '2.375rem', //38px
        '3.125': '3.125rem', // 50px
        '4.1875': '4.1875rem', // 67px
        '4.5': '4.5rem', // 72px
        '6.25': '6.25rem', // 100px
        '8.375': '8.375rem', // 134px
        '10.25': '10.25rem', // 164px
        '12.5': '12.5rem', // 200px
        '13.5': '13.5rem', // 216px
        '15.75': '15.75rem', // 252px
 
      },
      inset: {
        '26': '26rem',
        '8.625': '8.625rem', // 136px
      },
      height: {
        '4.75': '4.75rem', // 76px
        '9.5': '9.5rem', // 152px
        '34': '34rem'
      },
      boxShadow: {
        '3xl': '0px 0px 12px 0 #FFFFFF',
        inner: 'inset -2px 0px 18px 10px #131519'
      }
    },
  },
  plugins: [],
}

