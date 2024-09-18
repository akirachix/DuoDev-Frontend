import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors :{
        artisticblue : "#002A3D",
        coldsteel : "#F8F7F4",
        forestgreen : "#228B22"
      }
    },
  },
  plugins: [],
};
export default config;
