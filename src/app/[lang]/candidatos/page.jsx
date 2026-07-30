import CandidatePage from '../../../components/client/candidate/CandidatePage';
import JsonLd from '../../../components/seo/JsonLd';
import {
  candidateSeo,
  getCandidateAlternates,
  getCandidateStructuredData,
  getCandidateUrl,
} from '../../../lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  const seo = candidateSeo[language];
  const image =
    language === 'en' ? '/og-candidates-en.png' : '/og-candidates.png';

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: getCandidateAlternates(language),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCandidateUrl(language),
      type: 'website',
      locale: seo.locale,
      alternateLocale: language === 'pt' ? ['en_US'] : ['pt_BR'],
      siteName: 'Nevada Consulting',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export default async function LocalizedCandidatePage({ params }) {
  const { lang } = await params;
  const language = lang === 'en' ? 'en' : 'pt';
  return (
    <>
      <JsonLd data={getCandidateStructuredData(language)} />
      <CandidatePage />
    </>
  );
}
