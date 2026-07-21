'use client';

import {
  FiArrowDown,
  FiCheck,
  FiFileText,
  FiSearch,
  FiUsers,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import RecruitmentButton from './RecruitmentButton';

const stepIcons = [FiFileText, FiSearch, FiUsers];

function SearchBrief({ copy }) {
  return (
    <div className='relative rounded-[28px] border border-white/15 bg-white/[0.055] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur md:p-7'>
      <div className='flex items-center justify-between gap-4 border-b border-white/10 pb-5'>
        <div>
          <span className='text-[10px] font-black uppercase tracking-[0.17em] text-brand-lilac'>
            {copy.searchLabel}
          </span>
          <h2 className='mt-2 text-xl font-bold tracking-[-0.03em] text-white'>
            {copy.role}
          </h2>
        </div>
        <span className='flex shrink-0 items-center gap-2 rounded-full border border-brand-mint/25 bg-brand-mint/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-mint'>
          <i className='h-1.5 w-1.5 rounded-full bg-brand-mint' />
          {copy.active}
        </span>
      </div>

      <p className='mt-5 text-sm leading-relaxed text-white/60'>
        {copy.roleDetail}
      </p>

      <div className='mt-6 space-y-2.5'>
        {copy.steps.map((step, index) => {
          const Icon = stepIcons[index];
          const active = index === 1;
          return (
            <div
              className={`flex items-center gap-4 rounded-2xl border px-4 py-4 ${
                active
                  ? 'border-brand-lilac/35 bg-brand-lilac/[0.08]'
                  : 'border-white/10 bg-white/[0.035]'
              }`}
              key={step.label}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
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

      <div className='mt-5 flex items-center gap-2 text-xs text-white/55'>
        <FiCheck className='shrink-0 text-brand-mint' />
        {copy.signal}
      </div>
    </div>
  );
}

export default function RecruitmentHero() {
  const { t } = useTranslation();
  const copy = t('recrutamento.visual', { returnObjects: true });

  return (
    <section className='relative overflow-hidden bg-brand-ink pb-24 pt-40 text-white md:pb-28 md:pt-44'>
      <div className='absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-brand-violet/15 blur-3xl' />
      <div className='relative mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-14 lg:grid-cols-[minmax(0,1.03fr)_minmax(400px,0.97fr)]'>
        <div className='max-w-2xl'>
          <div className='mb-7 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            <span className='h-px w-8 bg-brand-lilac' />
            {copy.eyebrow}
          </div>
          <h1 className='text-balance text-5xl font-black leading-[0.96] tracking-[-0.058em] sm:text-6xl lg:text-[68px]'>
            {t('recrutamento.hero.h1_before')}{' '}
            <em className='font-editorial font-normal text-brand-lilac'>
              {t('recrutamento.hero.h1_bold1')}
            </em>{' '}
            {t('recrutamento.hero.h1_middle')}{' '}
            <em className='font-editorial font-normal text-brand-lilac'>
              {t('recrutamento.hero.h1_bold2')}
            </em>{' '}
            {t('recrutamento.hero.h1_after')}
          </h1>
          <p className='mt-7 max-w-xl text-lg leading-relaxed text-white/68'>
            {t('recrutamento.hero.subtitle')}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <RecruitmentButton location='hero'>
              {t('recrutamento.hero.btnWA')}
            </RecruitmentButton>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5'
              href='#processo'
            >
              {copy.secondary}
              <FiArrowDown />
            </a>
          </div>
          <div className='mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55'>
            {copy.proof.map((item) => (
              <span className='flex items-center gap-2' key={item}>
                <FiCheck className='text-brand-mint' />
                {item}
              </span>
            ))}
          </div>
        </div>
        <SearchBrief copy={copy} />
      </div>
    </section>
  );
}
