import { redirect } from 'next/navigation';
import HomePage from '../../components/client/HomePage';
import JsonLd from '../../components/seo/JsonLd';
import ptTranslations from '../../locale/pt.json';
import enTranslations from '../../locale/en.json';
import {
  getHomeStructuredData,
  getLanguageAlternates,
  getLocalizedUrl,
  homeSeo,
} from '../../lib/seo';

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  const seo = homeSeo[language];
  const image = language === 'en' ? '/og-en.png' : '/og.png';

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: getLanguageAlternates(language),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: getLocalizedUrl(language),
      siteName: 'Nevada Consulting',
      locale: seo.locale,
      alternateLocale: language === 'pt' ? ['en_US'] : ['pt_BR'],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            language === 'pt'
              ? 'Nevada Consulting — recrutamento tech e estratégia de talentos'
              : 'Nevada Consulting — tech recruiting and talent strategy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export default async function LangPage({ params }) {
  const { lang } = await params;

  if (!['pt', 'en'].includes(lang)) redirect('/pt');

  const translations = lang === 'en' ? enTranslations : ptTranslations;
  const faqItems = translations.translation.home.faq.items;

  return (
    <>
      <JsonLd data={getHomeStructuredData(lang, faqItems)} />
      <HomePage />
    </>
  );
}
