export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nevadaconsulting.com.br'
).replace(/\/$/, '');

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#juliana-carvalho`;

export const homeSeo = {
  pt: {
    title: 'Recrutamento Tech e Talent Strategy | Nevada Consulting',
    description:
      'Recrutamento global de profissionais de tecnologia, formação de hiring managers e estratégia de talentos para empresas que buscam transformar código em valor de negócio.',
    locale: 'pt_BR',
  },
  en: {
    title: 'Global Tech Recruiting & Talent Strategy | Nevada Consulting',
    description:
      'Global technology recruiting, hiring manager training and talent strategy for companies seeking engineers who turn code into measurable business value.',
    locale: 'en_US',
  },
};

export const recruitmentSeo = {
  pt: {
    path: '/pt/recrutamento',
    title:
      'Recrutamento Sênior Multissetorial por Success Fee | Nevada Consulting',
    description:
      'Recrutamento boutique para posições sêniores, lideranças e áreas estratégicas em tecnologia, marketing, saúde, fintechs e outros setores, com avaliação pessoal da fundadora.',
    locale: 'pt_BR',
    serviceName: 'Recrutamento sênior multissetorial',
    serviceType: 'Recrutamento sênior e executivo por success fee',
  },
  en: {
    path: '/en/recruitment',
    title: 'Senior Recruitment Across Industries | Nevada Consulting',
    description:
      'Boutique recruitment for senior, leadership and strategic roles across technology, marketing, healthcare, fintech and other industries, personally led by the founder.',
    locale: 'en_US',
    serviceName: 'Senior recruitment across industries',
    serviceType: 'Success-fee senior and executive recruitment',
  },
};

export const getLocalizedUrl = (language, path = '') =>
  `${SITE_URL}/${language}${path}`;

export const getLanguageAlternates = (language, path = '') => ({
  canonical: getLocalizedUrl(language, path),
  languages: {
    'pt-BR': getLocalizedUrl('pt', path),
    en: getLocalizedUrl('en', path),
    'x-default': getLocalizedUrl('pt', path),
  },
});

export const getRecruitmentUrl = (language) =>
  `${SITE_URL}${recruitmentSeo[language === 'en' ? 'en' : 'pt'].path}`;

export const getRecruitmentAlternates = (language) => ({
  canonical: getRecruitmentUrl(language),
  languages: {
    'pt-BR': getRecruitmentUrl('pt'),
    en: getRecruitmentUrl('en'),
    'x-default': getRecruitmentUrl('pt'),
  },
});

export function getHomeStructuredData(language, faqItems) {
  const seo = homeSeo[language] ?? homeSeo.pt;
  const url = getLocalizedUrl(language);
  const isPortuguese = language === 'pt';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Nevada Consulting',
        description:
          'Founder-led technology recruiting and talent strategy consultancy serving companies in Brazil and international markets.',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.webp`,
          contentUrl: `${SITE_URL}/logo.webp`,
          width: 1208,
          height: 929,
        },
        email: 'contato@nevadaconsulting.com.br',
        telephone: '+55 11 99460-7649',
        sameAs: ['https://www.linkedin.com/in/juliana-carvalhoss/'],
        founder: { '@id': PERSON_ID },
        areaServed: [
          { '@type': 'Country', name: 'Brazil' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsAbout: [
          'Technology recruiting',
          'Talent acquisition',
          'Hiring manager training',
          'Software engineering recruitment',
          'Leadership hiring',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'contato@nevadaconsulting.com.br',
          telephone: '+55 11 99460-7649',
          availableLanguage: ['Portuguese', 'English'],
        },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Juliana Carvalho',
        jobTitle: 'Founder & Senior Talent Consultant',
        image: `${SITE_URL}/juliana-carvalho.webp`,
        worksFor: { '@id': ORGANIZATION_ID },
        sameAs: ['https://www.linkedin.com/in/juliana-carvalhoss/'],
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'UFMG' },
          { '@type': 'CollegeOrUniversity', name: 'USP' },
          { '@type': 'CollegeOrUniversity', name: 'University of Akron' },
        ],
        knowsAbout: [
          'Global talent acquisition',
          'Technology recruiting',
          'Hiring strategy',
          'Organizational psychology',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Nevada Consulting',
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: ['pt-BR', 'en'],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: [{ '@id': ORGANIZATION_ID }, { '@id': PERSON_ID }],
        inLanguage: isPortuguese ? 'pt-BR' : 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        inLanguage: isPortuguese ? 'pt-BR' : 'en',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function getServiceStructuredData({
  language,
  slug,
  name,
  description,
  serviceType,
}) {
  const path = `/services/${slug}`;
  const url = getLocalizedUrl(language, path);
  const isPortuguese = language === 'pt';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}/#service`,
        name,
        description,
        serviceType,
        url,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: [
          { '@type': 'Country', name: 'Brazil' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        availableLanguage: ['Portuguese', 'English'],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}/#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isPortuguese ? 'Início' : 'Home',
            item: getLocalizedUrl(language),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isPortuguese ? 'Serviços' : 'Services',
            item: `${getLocalizedUrl(language)}#services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name,
            item: url,
          },
        ],
      },
    ],
  };
}

export function getRecruitmentStructuredData(language, faqItems) {
  const normalizedLanguage = language === 'en' ? 'en' : 'pt';
  const seo = recruitmentSeo[normalizedLanguage];
  const url = getRecruitmentUrl(normalizedLanguage);
  const isPortuguese = normalizedLanguage === 'pt';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Nevada Consulting',
        url: SITE_URL,
        email: 'contato@nevadaconsulting.com.br',
        telephone: '+55 11 99460-7649',
        founder: { '@id': PERSON_ID },
      },
      {
        '@type': 'Service',
        '@id': `${url}/#service`,
        name: seo.serviceName,
        description: seo.description,
        serviceType: seo.serviceType,
        url,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Country', name: 'Brazil' },
        availableLanguage: ['Portuguese', 'English'],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        about: { '@id': `${url}/#service` },
        inLanguage: isPortuguese ? 'pt-BR' : 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        inLanguage: isPortuguese ? 'pt-BR' : 'en',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}/#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isPortuguese ? 'Início' : 'Home',
            item: getLocalizedUrl(normalizedLanguage),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: seo.serviceName,
            item: url,
          },
        ],
      },
    ],
  };
}
