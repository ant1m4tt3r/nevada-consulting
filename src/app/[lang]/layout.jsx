import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import '../globals.css';
import { jakartaSans } from '../fonts';
import { SITE_URL } from '../../lib/seo';
import LocalizedProviders from '../../providers/LocalizedProviders';

const locales = ['pt', 'en'];

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isEnglish = lang === 'en';
  const title = isEnglish
    ? 'Nevada Consulting | Senior Recruitment & Talent Strategy'
    : 'Nevada Consulting | Recrutamento Sênior e Talent Strategy';
  const description = isEnglish
    ? 'Founder-led senior recruitment for technology and strategic business functions.'
    : 'Recrutamento sênior por success fee para tecnologia e funções estratégicas, com avaliação pessoal da fundadora.';
  const image = isEnglish ? '/og-en.png' : '/og.png';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | Nevada Consulting',
    },
    description,
    applicationName: 'Nevada Consulting',
    authors: [
      {
        name: 'Juliana Carvalho',
        url: 'https://www.linkedin.com/in/juliana-carvalhoss/',
      },
    ],
    creator: 'Juliana Carvalho',
    publisher: 'Nevada Consulting',
    category: 'Senior recruiting and talent strategy',
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
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'pt_BR',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
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
}

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;

  if (!locales.includes(lang)) notFound();

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang={lang === 'en' ? 'en' : 'pt-BR'}>
      <head>
        <Script id='home-scroll-restoration' strategy='beforeInteractive'>
          {`if (/^\\/(pt|en)?\\/?$/.test(window.location.pathname) && !window.location.hash) { window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }`}
        </Script>
      </head>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className={jakartaSans.className}>
        <LocalizedProviders language={lang}>{children}</LocalizedProviders>
      </body>
    </html>
  );
}
