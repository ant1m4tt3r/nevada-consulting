export default function manifest() {
  return {
    name: 'Nevada Consulting',
    short_name: 'Nevada',
    description:
      'Senior recruitment and talent strategy across technology and strategic business functions.',
    start_url: '/pt',
    display: 'standalone',
    background_color: '#f8f6f2',
    theme_color: '#17131b',
    icons: [
      {
        src: '/logo.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
