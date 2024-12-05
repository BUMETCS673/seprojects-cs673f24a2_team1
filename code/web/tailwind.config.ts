import type { Config } from 'tailwindcss/types';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
