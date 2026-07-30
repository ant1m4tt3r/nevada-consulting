'use client';

import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';
import RecruitmentButton from './RecruitmentButton';

export default function RecruitmentOutcomes() {
  const { t } = useTranslation();
  const copy = t('recrutamento', { returnObjects: true });
  const market = copy.stats.items;
  const outcomes = [
    ['98%', copy.numbers.card1unit, copy.numbers.card1desc],
    ['5', copy.numbers.card2unit, copy.numbers.card2desc],
    ['3', copy.numbers.card3unit, copy.numbers.card3desc],
  ];

  return (
    <>
      <section className='bg-brand-cream py-16 md:py-20'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <h2 className='mb-9 max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-5xl'>
            {copy.stats.title}
          </h2>
          <div className='grid overflow-hidden rounded-[28px] border border-brand-line bg-brand-paper md:grid-cols-3'>
            {market.map((item, index) => (
              <article
                className='flex min-h-[235px] flex-col border-brand-line p-6 md:border-r md:p-7 md:last:border-r-0'
                key={item.value}
              >
                <span className='text-[10px] font-black tracking-[0.15em] text-brand-muted'>
                  0{index + 1}
                </span>
                <strong className='mt-6 block font-editorial text-5xl font-normal tracking-[-0.04em] text-brand-violet md:text-6xl'>
                  {item.value}
                </strong>
                <p className='mt-4 max-w-xs text-sm leading-relaxed text-brand-muted'>
                  {item.description}
                </p>
                <a
                  className='mt-auto inline-flex items-center gap-1.5 pt-5 text-[10px] font-black uppercase tracking-[0.1em] text-brand-violet transition hover:text-purple-primary'
                  href={item.href}
                  target='_blank'
                  rel='noreferrer'
                >
                  {item.source}
                  <FiArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-brand-ink py-16 text-white md:py-20'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <div className='grid items-end gap-8 md:grid-cols-[1fr_auto]'>
            <h2 className='max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {copy.numbers.title}
            </h2>
            <RecruitmentButton location='numbers'>
              {copy.hero.btnWA}
            </RecruitmentButton>
          </div>
          <div className='mt-10 grid gap-4 md:grid-cols-3'>
            {outcomes.map(([value, unit, description]) => (
              <article
                className='rounded-3xl border border-white/12 bg-white/[0.045] p-7 md:min-h-[220px] md:p-8'
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
