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
      xl: '1440px'
    },
    extend: {
      colors: {
        hint: '#6B8E23',
        shade: '#131519',
        secondary: '#757575',
        primary: '#1C1E24',
        tertiary: '',
        discord: '#6A5ACD',
        github: '#323439'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'os': ['Open Sans', 'sans-serif'],
        'cn': ['Courier New', 'monospace']
      },
      fontSize: {
        '1.375': '1.375rem', //22px
        '1.75': '1.75rem', // 28px
        '2': '2rem' // 32px
      },
      fontWeight: {
        'r': '400',
        'b': '700',
        'eb': '800'
      },
      spacing: {
        '0.312': '0.312rem', // 4.992px
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
        '30': '7.5rem', // 120px
        '34': '34rem' // 544px
      },
      boxShadow: {
        '3xl': '0px 0px 12px 0 #757575',
        inner: 'inset -2px 0px 18px 10px #131519',
        outer: '0px 0px 16px 4px #131519'
      },
      minHeight: {
        'custom-sm': '25vh',
        'custom-md': '50vh'
      },
    },
  },
  plugins: []
}


