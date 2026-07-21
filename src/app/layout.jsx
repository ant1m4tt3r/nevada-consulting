import { Plus_Jakarta_Sans } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';
import Providers from '../providers/Providers';
import { SITE_URL } from '../lib/seo';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nevada Consulting | Tech Recruiting & Talent Strategy',
    template: '%s | Nevada Consulting',
  },
  description:
    'Recrutamento global e estratégia de talentos para empresas de tecnologia. Pessoas que transformam código em valor de negócio.',
  applicationName: 'Nevada Consulting',
  authors: [
    {
      name: 'Juliana Carvalho',
      url: 'https://www.linkedin.com/in/juliana-carvalhoss/',
    },
  ],
  creator: 'Juliana Carvalho',
  publisher: 'Nevada Consulting',
  category: 'Technology recruiting and talent strategy',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Nevada Consulting | Tech Recruiting & Talent Strategy',
    description: 'Talento técnico que transforma código em valor de negócio.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevada Consulting | Tech Recruiting & Talent Strategy',
    description: 'Talento técnico que transforma código em valor de negócio.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/logo.ico',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang='pt-BR'>
      <head>
        <Script id='home-scroll-restoration' strategy='beforeInteractive'>
          {`if (/^\\/(pt|en)?\\/?$/.test(window.location.pathname) && !window.location.hash) { window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }`}
        </Script>
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className={jakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
