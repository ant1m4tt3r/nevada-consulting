'use client';

import { useTranslation } from 'react-i18next';
import RecruitmentButton from './RecruitmentButton';

export default function RecruitmentOutcomes() {
  const { t } = useTranslation();
  const market = [
    ['41%', t('recrutamento.stats.stat1')],
    ['61%', t('recrutamento.stats.stat2')],
    [
      `${t('recrutamento.stats.stat3prefix')} 213%`,
      t('recrutamento.stats.stat3'),
    ],
  ];
  const outcomes = [
    [
      '98%',
      t('recrutamento.numbers.card1unit'),
      t('recrutamento.numbers.card1desc'),
    ],
    [
      '5',
      t('recrutamento.numbers.card2unit'),
      t('recrutamento.numbers.card2desc'),
    ],
    [
      '3',
      t('recrutamento.numbers.card3unit'),
      t('recrutamento.numbers.card3desc'),
    ],
  ];

  return (
    <>
      <section className='bg-brand-cream py-20 md:py-28'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <h2 className='mb-12 max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
            {t('recrutamento.stats.title')}
          </h2>
          <div className='grid overflow-hidden rounded-[28px] border border-brand-line bg-brand-paper md:grid-cols-3'>
            {market.map(([value, description], index) => (
              <article
                className='border-brand-line p-7 md:min-h-[260px] md:border-r md:p-9 md:last:border-r-0'
                key={value}
              >
                <span className='text-[10px] font-black tracking-[0.15em] text-brand-muted'>
                  0{index + 1}
                </span>
                <strong className='mt-10 block font-editorial text-6xl font-normal tracking-[-0.04em] text-brand-violet'>
                  {value}
                </strong>
                <p className='mt-5 max-w-xs text-sm leading-relaxed text-brand-muted'>
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-brand-ink py-20 text-white md:py-28'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <div className='grid items-end gap-8 md:grid-cols-[1fr_auto]'>
            <h2 className='max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {t('recrutamento.numbers.title')}
            </h2>
            <RecruitmentButton location='numbers'>
              {t('recrutamento.hero.btnWA')}
            </RecruitmentButton>
          </div>
          <div className='mt-14 grid gap-4 md:grid-cols-3'>
            {outcomes.map(([value, unit, description]) => (
              <article
                className='rounded-3xl border border-white/12 bg-white/[0.045] p-7 md:min-h-[260px] md:p-9'
                key={unit}
              >
                <strong className='block font-editorial text-7xl font-normal tracking-[-0.045em] text-brand-lilac'>
                  {value}
                </strong>
                <h3 className='mt-8 text-xl font-bold tracking-[-0.03em]'>
                  {unit}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-white/55'>
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
