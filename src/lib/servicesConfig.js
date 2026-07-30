export const slugToKey = {
  'recruitment-training': 'third',
  'resume-linkedin-portfolio': 'fifth',
  'interview-preparation': 'sixth',
};

export const WHATSAPP_NUMBER = '5511994607649';

export const serviceItems = [
  {
    id: 3,
    slug: 'recruitment-training',
    translationKey: 'third',
    duration: 90,
    b2b: true,
    name: { pt: 'Treinamento de Recrutamento', en: 'Recruitment Training' },
  },
  {
    id: 5,
    slug: 'resume-linkedin-portfolio',
    translationKey: 'fifth',
    duration: 45,
    b2b: false,
    name: {
      pt: 'Currículo, LinkedIn e Portfólio',
      en: 'Resume, LinkedIn & Portfolio',
    },
  },
  {
    id: 6,
    slug: 'interview-preparation',
    translationKey: 'sixth',
    duration: 60,
    b2b: false,
    name: { pt: 'Preparação para Entrevistas', en: 'Interview Preparation' },
  },
];
