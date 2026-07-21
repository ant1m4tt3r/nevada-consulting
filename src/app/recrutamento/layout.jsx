import { SITE_URL } from '../../lib/seo';

export const metadata = {
  title: {
    absolute: 'Recrutamento Especializado por Success Fee | Nevada Consulting',
  },
  description:
    'Recrutamento especializado para posições de tecnologia, liderança e áreas estratégicas, com busca ativa, avaliação aprofundada e modelo success fee.',
  alternates: {
    canonical: `${SITE_URL}/recrutamento`,
  },
  openGraph: {
    title: 'Recrutamento Especializado por Success Fee | Nevada Consulting',
    description:
      'Busca ativa e avaliação aprofundada para contratações estratégicas no Brasil.',
    url: `${SITE_URL}/recrutamento`,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Nevada Consulting',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
};

export default function RecruitmentLayout({ children }) {
  return children;
}
