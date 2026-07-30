import JsonLd from '../../../components/seo/JsonLd';
import HomePage from '../../../components/client/HomePage';
import { getDictionary } from '../../../lib/dictionaries';
import {
  getTechRecruitmentAlternates,
  getTechRecruitmentStructuredData,
  getTechRecruitmentUrl,
  techRecruitmentSeo,
} from '../../../lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  const seo = techRecruitmentSeo[language];
  const image = language === 'en' ? '/og-tech-en.png' : '/og-tech.png';

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: getTechRecruitmentAlternates(language),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getTechRecruitmentUrl(language),
      type: 'website',
      locale: seo.locale,
      alternateLocale: language === 'pt' ? ['en_US'] : ['pt_BR'],
      siteName: 'Nevada Consulting',
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

export default async function LocalizedRecruitmentPage({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  const dictionary = getDictionary(language);
  const faqItems = dictionary.home.faq.items;

  return (
    <>
      <JsonLd data={getTechRecruitmentStructuredData(language, faqItems)} />
      <HomePage />
    </>
  );
}
