'use client';

import { useTranslation } from 'react-i18next';
import { FiBarChart2 } from 'react-icons/fi';

export default function HomeMethod() {
  const { t } = useTranslation();
  const steps = t('home.method.steps', { returnObjects: true });

  return (
    <section className='bg-brand-paper py-20 md:py-28' id='method'>
      <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
        <div className='max-w-3xl'>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            {t('home.method.eyebrow')}
          </div>
          <h2 className='text-4xl font-black leading-[1] tracking-[-0.05em] md:text-6xl'>
            {t('home.method.title')}
          </h2>
          <p className='mt-8 text-lg text-brand-muted'>
            {t('home.method.body')}
          </p>
        </div>

        <div className='mt-14 grid gap-px overflow-hidden rounded-3xl border border-brand-line bg-brand-line md:grid-cols-2 lg:grid-cols-4'>
          {steps.map(([title, text], index) => (
            <article className='bg-brand-paper p-7 md:p-8' key={title}>
              <div className='flex items-center gap-3 text-xs font-black text-purple-primary'>
                <span>0{index + 1}</span>
                <i className='h-px flex-1 bg-brand-line' />
              </div>
              <h3 className='mt-10 text-xl font-bold'>{title}</h3>
              <p className='mt-4 text-sm leading-relaxed text-brand-muted'>
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className='mt-8 flex items-center gap-4 rounded-2xl bg-brand-lilac/60 px-6 py-5 text-brand-violet'>
          <FiBarChart2 className='shrink-0 text-xl' />
          <span>{t('home.method.metric')}</span>
          <i className='hidden h-px flex-1 bg-purple-primary/25 sm:block' />
        </div>
      </div>
    </section>
  );
}
