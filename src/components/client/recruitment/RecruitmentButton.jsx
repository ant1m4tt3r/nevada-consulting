'use client';

import { FiArrowUpRight } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { trackEvent } from '../../../lib/gtm';

const WHATSAPP_URL = 'https://wa.me/5511994607649';

export default function RecruitmentButton({ children, location, inverse }) {
  return (
    <a
      className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 text-sm font-bold transition hover:-translate-y-0.5 ${
        inverse
          ? 'bg-brand-ink text-white hover:bg-brand-violet'
          : 'bg-white text-brand-ink hover:bg-brand-lilac'
      }`}
      href={WHATSAPP_URL}
      target='_blank'
      rel='noreferrer'
      onClick={() => {
        trackEvent('whatsapp_click', {
          location,
          page: 'recrutamento',
          destination: WHATSAPP_URL,
        });
        trackEvent('generate_lead', {
          method: 'whatsapp',
          location,
          page: 'recrutamento',
        });
      }}
    >
      <SiWhatsapp className='shrink-0' />
      {children}
      <FiArrowUpRight className='shrink-0' />
    </a>
  );
}
