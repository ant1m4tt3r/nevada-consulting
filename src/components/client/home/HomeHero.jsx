'use client';

import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import TalentScorecard from './TalentScorecard';
import { getWhatsappHref } from './constants';

export default function HomeHero() {
  const { t } = useTranslation();
  const visual = t('home.visual', { returnObjects: true });

  return (
    <section
      className='relative flex min-h-[860px] items-center bg-brand-ink pb-24 pt-40 text-white md:min-h-screen md:pb-28 md:pt-36'
      id='home'
    >
      <div className='nc-hero-noise' />
      <div className='relative z-10 mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)]'>
        <div className='max-w-2xl'>
          <div className='mb-7 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            <span className='h-px w-8 bg-brand-lilac' />
            {t('home.hero.eyebrow')}
          </div>
          <h1 className='text-balance text-5xl font-black leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-7xl'>
            {t('home.hero.titleStart')}{' '}
            <em className='font-editorial font-normal text-brand-lilac'>
              {t('home.hero.titleAccent')}
            </em>
          </h1>
          <p className='mt-7 max-w-xl text-lg leading-relaxed text-white/70'>
            {t('home.hero.body')}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-bold text-brand-ink transition hover:-translate-y-0.5 hover:bg-brand-lilac'
              href={getWhatsappHref(t('home.contact.prefill'))}
              target='_blank'
              rel='noreferrer'
            >
              {t('home.hero.primary')}
              <FiArrowUpRight />
            </a>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5'
              href='#method'
            >
              {t('home.hero.secondary')}
              <FiArrowRight />
            </a>
          </div>
          <div className='mt-8 flex items-start gap-2 text-xs leading-relaxed text-white/55'>
            <FiCheck className='mt-0.5 shrink-0 text-brand-mint' />
            {t('home.hero.footnote')}
          </div>
        </div>
        <TalentScorecard copy={visual} />
      </div>
    </section>
  );
}
