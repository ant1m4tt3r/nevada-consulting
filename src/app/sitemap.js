import { serviceItems } from '../lib/servicesConfig';
import { getLocalizedUrl, getRecruitmentUrl } from '../lib/seo';

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
  const recruitmentAlternates = {
    'pt-BR': getRecruitmentUrl('pt'),
    en: getRecruitmentUrl('en'),
    'x-default': getRecruitmentUrl('pt'),
  };
  const recruitmentPages = languages.map((language) => ({
    url: getRecruitmentUrl(language),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: { languages: recruitmentAlternates },
  }));

  return [...homePages, ...servicePages, ...recruitmentPages];
}
