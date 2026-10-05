import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          300: '#A4BEFD',
          400: '#7C9BFA',
          500: '#4F6FF5',
          600: '#3451E8',
          700: '#253BCF',
          800: '#1F30A7',
          900: '#1D2B84',
          950: '#11184F',
        },
        slate: {
          850: '#151F32',
          925: '#0B1120',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.06), 0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        'card': '0 4px 6px -1px rgba(16, 24, 40, 0.05), 0 2px 4px -2px rgba(16, 24, 40, 0.05)',
        'elevated': '0 12px 24px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
        'floating': '0 20px 32px -6px rgba(16, 24, 40, 0.12), 0 8px 12px -4px rgba(16, 24, 40, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
