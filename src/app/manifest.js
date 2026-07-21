export default function manifest() {
  return {
    name: 'Nevada Consulting',
    short_name: 'Nevada',
    description:
      'Global tech recruiting and talent strategy for technology companies.',
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
