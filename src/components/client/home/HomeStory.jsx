'use client';

import { useTranslation } from 'react-i18next';

const historyKeys = ['first', 'second', 'third', 'fourth'];

export default function HomeStory() {
  const { t } = useTranslation();

  return (
    <section className='bg-brand-lilac/30 py-20 md:py-28' id='story'>
      <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
        <div className='grid gap-8 border-b border-brand-violet/15 pb-12 md:grid-cols-[0.35fr_0.65fr] md:items-end md:gap-16'>
          <p className='text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            {t('about.title')}
          </p>
          <h2 className='max-w-3xl text-4xl font-black leading-[1] tracking-[-0.05em] md:text-6xl'>
            {t('about.subtitle')}
          </h2>
        </div>

        <div className='mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2'>
          {historyKeys.map((key, index) => (
            <article className='grid grid-cols-[32px_1fr] gap-4' key={key}>
              <span className='pt-1 text-xs font-black text-brand-violet/60'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className='text-sm leading-relaxed text-brand-muted md:text-base'>
                {t(`about.history.${key}`)}
              </p>
            </article>
          ))}
        </div>

        <div className='mt-16 grid gap-10 border-t border-brand-violet/15 pt-12 md:grid-cols-[0.35fr_0.65fr] md:gap-16'>
          <div>
            <p className='text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
              {t('about.description.subtitle')}
            </p>
            <blockquote className='mt-5 font-editorial text-2xl leading-snug text-brand-violet'>
              “{t('about.description.quote')}”
            </blockquote>
          </div>
          <div className='grid gap-5 text-sm leading-relaxed text-brand-muted md:grid-cols-2'>
            {historyKeys.map((key) => (
              <p key={key}>{t(`about.description.${key}`)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
