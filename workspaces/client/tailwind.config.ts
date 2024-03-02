import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'blocked': 'Blocked'
    },
    extend: {
      backgroundImage: {
        'powder-hills-dark':
          'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url("../public/powder-game-background.webp")',
        'powder-hills-light':
          'linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)), url("../public/powder-game-background.webp")',
      },
    },
  },
  darkMode: 'selector',
  plugins: [daisyui],
};

export default config;
