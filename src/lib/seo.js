export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nevadaconsulting.com.br'
).replace(/\/$/, '');

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#juliana-carvalho`;

export const homeSeo = {
  pt: {
    title: 'Recrutamento Sênior por Success Fee | Nevada Consulting',
    description:
      'Recrutamento boutique para posições sêniores e estratégicas em tecnologia, marketing, saúde, fintechs e liderança, com shortlist em 5 dias úteis e garantia de 3 meses.',
    locale: 'pt_BR',
  },
  en: {
    title: 'Senior Recruitment Across Industries | Nevada Consulting',
    description:
      'Founder-led boutique recruitment for senior and strategic roles across technology, marketing, healthcare, fintech and leadership, with a 5-day shortlist SLA.',
    locale: 'en_US',
  },
};

export const techRecruitmentSeo = {
  pt: {
    path: '/pt/recrutamento',
    title: 'Recrutamento Tech e Talent Strategy | Nevada Consulting',
    description:
      'Recrutamento global de profissionais de tecnologia, formação de hiring managers e estratégia de talentos para empresas que buscam transformar código em valor de negócio.',
    locale: 'pt_BR',
    serviceName: 'Recrutamento tech global',
    serviceType: 'Recrutamento de tecnologia e liderança técnica',
  },
  en: {
    path: '/en/recruitment',
    title: 'Global Tech Recruiting & Talent Strategy | Nevada Consulting',
    description:
      'Global technology recruiting, hiring manager training and talent strategy for companies seeking engineers who turn code into measurable business value.',
    locale: 'en_US',
    serviceName: 'Global tech recruiting',
    serviceType: 'Technology and technical leadership recruitment',
  },
};

export const candidateSeo = {
  pt: {
    path: '/pt/candidatos',
    title: 'Consultoria para Candidatos | Nevada Consulting',
    description:
      'Consultoria de currículo e LinkedIn, posicionamento para ATS e preparação para entrevistas com uma recrutadora global.',
    locale: 'pt_BR',
  },
  en: {
    path: '/en/candidates',
    title: 'Career Consulting for Candidates | Nevada Consulting',
    description:
      'Resume and LinkedIn consulting, ATS positioning and interview preparation with an experienced global recruiter.',
    locale: 'en_US',
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

export const getTechRecruitmentUrl = (language) =>
  `${SITE_URL}${techRecruitmentSeo[language === 'en' ? 'en' : 'pt'].path}`;

export const getTechRecruitmentAlternates = (language) => ({
  canonical: getTechRecruitmentUrl(language),
  languages: {
    'pt-BR': getTechRecruitmentUrl('pt'),
    en: getTechRecruitmentUrl('en'),
    'x-default': getTechRecruitmentUrl('pt'),
  },
});

export const getCandidateUrl = (language) =>
  `${SITE_URL}${candidateSeo[language === 'en' ? 'en' : 'pt'].path}`;

export const getCandidateAlternates = (language) => ({
  canonical: getCandidateUrl(language),
  languages: {
    'pt-BR': getCandidateUrl('pt'),
    en: getCandidateUrl('en'),
    'x-default': getCandidateUrl('pt'),
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
          'Founder-led senior recruiting and talent strategy consultancy serving companies across technology and strategic business functions in Brazil and international markets.',
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
          name: item.question ?? item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer ?? item.a,
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
  collectionName,
  collectionUrl,
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
            name: collectionName ?? (isPortuguese ? 'Serviços' : 'Services'),
            item: collectionUrl ?? `${getLocalizedUrl(language)}#services`,
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

export function getTechRecruitmentStructuredData(language, faqItems) {
  const normalizedLanguage = language === 'en' ? 'en' : 'pt';
  const seo = techRecruitmentSeo[normalizedLanguage];
  const url = getTechRecruitmentUrl(normalizedLanguage);
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
        areaServed: [
          { '@type': 'Country', name: 'Brazil' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
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
          name: item.question ?? item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer ?? item.a,
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

export function getCandidateStructuredData(language) {
  const normalizedLanguage = language === 'en' ? 'en' : 'pt';
  const seo = candidateSeo[normalizedLanguage];
  const url = getCandidateUrl(normalizedLanguage);
  const isPortuguese = normalizedLanguage === 'pt';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}/#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: isPortuguese ? 'pt-BR' : 'en',
        about: { '@id': PERSON_ID },
        mainEntity: [
          { '@id': `${url}/#resume-linkedin` },
          { '@id': `${url}/#interview-preparation` },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}/#resume-linkedin`,
        name: isPortuguese
          ? 'Revisão de currículo e LinkedIn'
          : 'Resume and LinkedIn review',
        serviceType: 'Career consulting',
        provider: { '@id': ORGANIZATION_ID },
        url: getLocalizedUrl(
          normalizedLanguage,
          '/services/resume-linkedin-portfolio',
        ),
      },
      {
        '@type': 'Service',
        '@id': `${url}/#interview-preparation`,
        name: isPortuguese
          ? 'Preparação para entrevistas'
          : 'Interview preparation',
        serviceType: 'Career consulting',
        provider: { '@id': ORGANIZATION_ID },
        url: getLocalizedUrl(
          normalizedLanguage,
          '/services/interview-preparation',
        ),
      },
    ],
  };
}
