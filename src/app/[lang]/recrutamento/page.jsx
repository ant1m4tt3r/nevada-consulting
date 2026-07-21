import JsonLd from '../../../components/seo/JsonLd';
import RecruitmentPage from '../../recrutamento/page';
import enTranslations from '../../../locale/en.json';
import ptTranslations from '../../../locale/pt.json';
import {
  getRecruitmentAlternates,
  getRecruitmentStructuredData,
  getRecruitmentUrl,
  recruitmentSeo,
} from '../../../lib/seo';

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  const seo = recruitmentSeo[language];
  const image = language === 'en' ? '/og-en.png' : '/og.png';

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: getRecruitmentAlternates(language),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getRecruitmentUrl(language),
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
              ? 'Nevada Consulting — recrutamento sênior multissetorial'
              : 'Nevada Consulting — senior recruitment across industries',
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
  const translations = language === 'en' ? enTranslations : ptTranslations;
  const faqItems = translations.translation.recrutamento.faq.items;

  return (
    <>
      <JsonLd data={getRecruitmentStructuredData(language, faqItems)} />
      <RecruitmentPage />
    </>
  );
}
