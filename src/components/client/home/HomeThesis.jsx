'use client';

import { useTranslation } from 'react-i18next';
import { FiCheck } from 'react-icons/fi';

export default function HomeThesis() {
  const { t } = useTranslation();
  const points = t('home.thesis.points', { returnObjects: true });

  return (
    <section className='bg-brand-ink py-20 text-white md:py-28'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-12 md:grid-cols-2 md:gap-20'>
        <div>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            {t('home.thesis.eyebrow')}
          </div>
          <h2 className='text-4xl font-black leading-[1] tracking-[-0.05em] md:text-6xl'>
            {t('home.thesis.title')}
          </h2>
        </div>
        <div>
          <p className='font-editorial text-2xl leading-relaxed text-white/85'>
            {t('home.thesis.body')}
          </p>
          <ul className='mt-8 space-y-4 border-t border-white/15 pt-8'>
            {points.map((point) => (
              <li
                className='flex items-start gap-3 text-sm leading-relaxed text-white/70'
                key={point}
              >
                <FiCheck className='mt-0.5 shrink-0 text-brand-mint' />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
