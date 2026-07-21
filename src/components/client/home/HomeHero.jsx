'use client';

import { useTranslation } from 'react-i18next';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiCheck,
} from 'react-icons/fi';
import TechnologyLogo from './TechnologyLogo';
import { getWhatsappHref } from './constants';

function TalentScorecard({ copy }) {
  const metrics = [
    [copy.velocity, copy.velocityGoal],
    [copy.time, copy.timeGoal],
    [copy.quality, copy.qualityGoal],
  ];

  return (
    <div
      className='relative w-full rounded-[22px] border border-[#3d3740] bg-[#19161b] p-[18px] text-white shadow-[0_24px_60px_rgba(0,0,0,0.24)] max-[520px]:p-3'
      aria-label='Code to business value illustration'
    >
      <div className='flex items-start justify-between px-1 pb-4 pt-2'>
        <div className='flex flex-col gap-1.5'>
          <span className='text-[9px] font-bold uppercase tracking-[0.16em] text-[#a69aaa]'>
            {copy.label}
          </span>
          <strong className='text-sm tracking-[-0.015em]'>{copy.role}</strong>
        </div>
        <span className='flex items-center gap-1.5 rounded-full border border-brand-mint/20 bg-brand-mint/[0.07] px-2.5 py-2 text-[9px] uppercase tracking-[0.1em] text-brand-mint'>
          <i className='nc-live-dot h-1.5 w-1.5 rounded-full bg-brand-mint' />
          {copy.live}
        </span>
      </div>

      <div className='grid min-h-[114px] grid-cols-[1fr_70px_105px] items-center gap-2 rounded-[17px] border border-white/[0.07] bg-white/[0.035] p-4 max-[1050px]:grid-cols-[1fr_45px_92px] max-[520px]:grid-cols-[1fr_30px_78px] max-[520px]:p-3'>
        <div>
          <span className='text-[9px] font-bold uppercase tracking-[0.12em] text-[#9f94a3]'>
            {copy.sources}
          </span>
          <div className='mt-3 flex items-center gap-2'>
            <TechnologyLogo technology='TypeScript' />
            <TechnologyLogo technology='Python' />
            <TechnologyLogo technology='Go' />
          </div>
        </div>
        <div className='nc-flow-line'>
          <i />
          <i />
          <i />
        </div>
        <div className='flex flex-col gap-1 rounded-xl border border-[#4b444e] bg-[#211e23] px-3 py-3.5 max-[520px]:px-2'>
          <strong className='flex items-center gap-1.5 text-[17px] text-[#d9f8e7] max-[520px]:text-sm'>
            <FiCheck className='h-4 w-4 rounded-full bg-brand-mint p-[3px] text-[#173e2d]' />
            {copy.validated}
          </strong>
          <span className='text-[7px] font-bold uppercase tracking-[0.08em] text-[#a89eaa]'>
            {copy.validatedLabel}
          </span>
        </div>
      </div>

      <div className='mt-2.5 rounded-[17px] bg-[#f8f5f9] p-4 text-brand-ink'>
        <div className='flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-[#786d7c]'>
          <span>{copy.outcome}</span>
          <strong className='flex items-center gap-1'>
            <FiBarChart2 /> {copy.direction}
          </strong>
        </div>
        <div className='nc-chart' aria-hidden='true'>
          {[28, 38, 34, 53, 62, 78, 92].map((height, index) => (
            <span
              key={height}
              style={{
                '--bar-height': `${height}%`,
                '--bar-delay': `${index * 90}ms`,
              }}
            />
          ))}
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {metrics.map(([label, goal]) => (
            <div
              className='rounded-lg border border-[#ddd4e0] bg-white p-2.5'
              key={label}
            >
              <span className='block min-h-[28px] text-[9px] font-bold uppercase leading-[1.25] tracking-[0.03em] text-[#625666]'>
                {label}
              </span>
              <strong className='text-[11px] font-black uppercase tracking-[0.04em] text-[#352b39]'>
                {goal}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
