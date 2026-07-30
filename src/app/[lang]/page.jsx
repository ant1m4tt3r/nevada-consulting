import { redirect } from 'next/navigation';
import RecruitmentPage from '../../components/client/recruitment/RecruitmentPage';
import JsonLd from '../../components/seo/JsonLd';
import { getDictionary } from '../../lib/dictionaries';
import {
  getHomeStructuredData,
  getLanguageAlternates,
  getLocalizedUrl,
  homeSeo,
} from '../../lib/seo';

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
              ? 'Nevada Consulting — recrutamento sênior por success fee'
              : 'Nevada Consulting — founder-led senior recruitment',
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

  const dictionary = getDictionary(lang);
  const faqItems = dictionary.recrutamento.faq.items;

  return (
    <>
      <JsonLd data={getHomeStructuredData(lang, faqItems)} />
      <RecruitmentPage />
    </>
  );
}
