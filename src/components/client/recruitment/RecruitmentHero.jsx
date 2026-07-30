'use client';

import { useTranslation } from 'react-i18next';
import {
  FiArrowDown,
  FiCheck,
  FiFileText,
  FiSearch,
  FiUsers,
} from 'react-icons/fi';
import RecruitmentButton from './RecruitmentButton';

const stepIcons = [FiFileText, FiSearch, FiUsers];

function SearchBrief({ copy }) {
  return (
    <div className='relative rounded-[24px] border border-white/15 bg-white/[0.055] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-5'>
      <div className='flex items-center justify-between gap-4 border-b border-white/10 pb-4'>
        <div>
          <span className='text-[10px] font-black uppercase tracking-[0.17em] text-brand-lilac'>
            {copy.searchLabel}
          </span>
          <h2 className='mt-1.5 text-lg font-bold tracking-[-0.03em] text-white'>
            {copy.role}
          </h2>
        </div>
        <span className='flex shrink-0 items-center gap-2 rounded-full border border-brand-mint/25 bg-brand-mint/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-mint'>
          <i className='h-1.5 w-1.5 rounded-full bg-brand-mint' />
          {copy.active}
        </span>
      </div>

      <p className='mt-4 text-[13px] leading-relaxed text-white/60'>
        {copy.roleDetail}
      </p>

      <div className='mt-4 space-y-2'>
        {copy.steps.map((step, index) => {
          const Icon = stepIcons[index];
          const active = index === 1;
          return (
            <div
              className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 ${
                active
                  ? 'border-brand-lilac/35 bg-brand-lilac/[0.08]'
                  : 'border-white/10 bg-white/[0.035]'
              }`}
              key={step.label}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  index === 0
                    ? 'bg-brand-mint/15 text-brand-mint'
                    : 'bg-white/[0.07] text-brand-lilac'
                }`}
              >
                {index === 0 ? <FiCheck /> : <Icon />}
              </span>
              <strong className='min-w-0 flex-1 text-sm text-white'>
                {step.label}
              </strong>
              <span className='text-right text-[9px] font-bold uppercase tracking-[0.08em] text-white/45'>
                {step.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className='mt-4 flex items-center gap-2 text-[11px] text-white/55'>
        <FiCheck className='shrink-0 text-brand-mint' />
        {copy.signal}
      </div>
    </div>
  );
}

export default function RecruitmentHero() {
  const { t } = useTranslation();
  const copy = t('recrutamento', { returnObjects: true });
  const visual = copy.visual;

  return (
    <section className='relative overflow-hidden bg-brand-ink pb-16 pt-32 text-white md:pb-20 md:pt-36 lg:flex lg:h-svh lg:min-h-[680px] lg:items-center lg:pb-8 lg:pt-28'>
      <div className='absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-brand-violet/15 blur-3xl' />
      <div className='relative mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(400px,0.88fr)]'>
        <div className='max-w-3xl'>
          <div className='mb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            <span className='h-px w-8 bg-brand-lilac' />
            {visual.eyebrow}
          </div>
          <h1 className='text-balance text-5xl font-black leading-[0.93] tracking-[-0.058em] sm:text-6xl lg:text-[58px] xl:text-[60px]'>
            {copy.hero.h1_before}{' '}
            <em className='font-editorial font-normal text-brand-lilac'>
              {copy.hero.h1_bold1}
            </em>{' '}
            {copy.hero.h1_middle}{' '}
            <em className='font-editorial font-normal text-brand-lilac'>
              {copy.hero.h1_bold2}
            </em>{' '}
            {copy.hero.h1_after}
          </h1>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-white/68'>
            {copy.hero.subtitle}
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <RecruitmentButton location='hero'>
              {copy.hero.btnWA}
            </RecruitmentButton>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5'
              href='#processo'
            >
              {visual.secondary}
              <FiArrowDown />
            </a>
          </div>
          <div className='mt-5 grid max-w-2xl gap-2 sm:grid-cols-3'>
            {visual.proof.map((item, index) => (
              <div
                className='flex min-h-[72px] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.055] px-4 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] sm:min-h-[62px] sm:gap-2.5 sm:px-3 sm:py-2.5 sm:text-xs'
                key={item}
              >
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-mint/12 text-base text-brand-mint sm:h-7 sm:w-7 sm:text-sm'>
                  <FiCheck />
                </span>
                <span className='min-w-0 leading-snug'>
                  <small className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-brand-lilac sm:mb-0.5 sm:text-[9px]'>
                    0{index + 1}
                  </small>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <SearchBrief copy={visual} />
      </div>
    </section>
  );
}
