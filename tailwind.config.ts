import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fontFamily: {
          sans: 'var(--font-inter)',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-green': "#69FFD7",
      },
    },
  },
  plugins: [],
  safelist: [
    'text-yellow-500',
    'text-custom-green',
    'text-red-500',
    'border-yellow-500',
    'border-custom-green',
    'border-red-500',
  ],
};
export default config;
