import { serviceItems } from '../lib/servicesConfig';
import {
  getCandidateUrl,
  getLocalizedUrl,
  getTechRecruitmentUrl,
} from '../lib/seo';

const languages = ['pt', 'en'];

function localizedEntry(language, path = '', priority = 0.8) {
  return {
    url: getLocalizedUrl(language, path),
    changeFrequency: 'monthly',
    priority,
    alternates: {
      languages: {
        'pt-BR': getLocalizedUrl('pt', path),
        en: getLocalizedUrl('en', path),
        'x-default': getLocalizedUrl('pt', path),
      },
    },
  };
}

export default function sitemap() {
  const homePages = languages.map((language) =>
    localizedEntry(language, '', 1),
  );
  const servicePages = serviceItems.flatMap((service) =>
    languages.map((language) =>
      localizedEntry(language, `/services/${service.slug}`),
    ),
  );
  const techRecruitmentAlternates = {
    'pt-BR': getTechRecruitmentUrl('pt'),
    en: getTechRecruitmentUrl('en'),
    'x-default': getTechRecruitmentUrl('pt'),
  };
  const techRecruitmentPages = languages.map((language) => ({
    url: getTechRecruitmentUrl(language),
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: { languages: techRecruitmentAlternates },
  }));
  const candidateAlternates = {
    'pt-BR': getCandidateUrl('pt'),
    en: getCandidateUrl('en'),
    'x-default': getCandidateUrl('pt'),
  };
  const candidatePages = languages.map((language) => ({
    url: getCandidateUrl(language),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: { languages: candidateAlternates },
  }));

  return [
    ...homePages,
    ...techRecruitmentPages,
    ...candidatePages,
    ...servicePages,
  ];
}
