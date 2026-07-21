/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#8D519E',
        'purple-secondary': '#6366F1',
        'brand-ink': '#17131B',
        'brand-muted': '#675F6C',
        'brand-cream': '#F8F6F2',
        'brand-paper': '#FFFDF9',
        'brand-line': '#DED7E1',
        'brand-violet': '#62306D',
        'brand-lilac': '#E7D8ED',
        'brand-mint': '#B8F3D2',
      },
      fontFamily: {
        editorial: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
