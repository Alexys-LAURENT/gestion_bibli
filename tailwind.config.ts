import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|button|card|chip|date-input|date-picker|dropdown|image|input|modal|pagination|popover|skeleton|spinner|table|tabs|user|divider|ripple|listbox|scroll-shadow|calendar|menu|checkbox|spacer|avatar).js"
  ],
  theme: {
    extend: {
      screens:{
        'xs': '480px',
      }
      ,
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gest_primary: '#f2e9e4',
        gest_cta:'#c9ada7'
      },
    },
  },
  plugins: [nextui()],
};
export default config;
