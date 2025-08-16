import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx,css}',
    './.storybook/**/*.{ts,tsx,mdx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config