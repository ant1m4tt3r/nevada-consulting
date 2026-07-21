'use client';

import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import TechnologyLogo from './TechnologyLogo';

export default function HomeValueBridge() {
  const { t } = useTranslation();
  const capabilities = t('home.bridge.capabilities', { returnObjects: true });
  const outcomes = t('home.bridge.outcomes', { returnObjects: true });

  return (
    <section className='bg-gradient-to-br from-brand-ink to-[#2a1830] py-20 text-white md:py-28'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]'>
        <div>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            {t('home.bridge.eyebrow')}
          </div>
          <h2 className='text-4xl font-black leading-[1] tracking-[-0.05em] md:text-6xl'>
            {t('home.bridge.title')}
          </h2>
          <p className='mt-7 max-w-lg text-base leading-relaxed text-white/65'>
            {t('home.bridge.body')}
          </p>
        </div>

        <div className='grid grid-cols-[1fr_42px_1fr] items-stretch rounded-3xl border border-white/[0.08] bg-white/[0.035] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] max-[520px]:grid-cols-1 max-[520px]:gap-2.5'>
          <div className='min-h-[270px] rounded-2xl border border-white/[0.08] bg-[#100d12] p-4 max-[520px]:min-h-[235px]'>
            <div className='text-[10px] font-bold uppercase tracking-[0.12em] text-[#bbb1bf]'>
              {t('home.bridge.codeLabel')}
            </div>
            <div className='mt-4 grid gap-2'>
              {capabilities.map(([technology, description]) => (
                <div
                  className='grid min-h-16 grid-cols-[44px_1fr] items-center gap-3 rounded-xl border border-[#332e36] bg-[#171419] px-3 py-2.5'
                  key={technology}
                >
                  <TechnologyLogo technology={technology} />
                  <div className='flex min-w-0 flex-col justify-center gap-1'>
                    <strong className='text-xs leading-tight text-[#f1edf2]'>
                      {technology}
                    </strong>
                    <small className='text-[10px] leading-snug tracking-[0.02em] text-[#b8aeba]'>
                      {description}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center justify-center text-brand-mint max-[520px]:min-h-7 max-[520px]:rotate-90'>
            <FiArrowRight className='nc-nudge-arrow' />
          </div>

          <div className='flex min-h-[270px] flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#f7f4f8] p-4 pt-5 text-brand-ink max-[520px]:min-h-[235px]'>
            <div className='mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#625766]'>
              {t('home.bridge.impactLabel')}
            </div>
            {outcomes.map(([metric, label], index) => (
              <div
                className='grid flex-1 grid-cols-[1fr_70px] items-center rounded-xl border border-[#e5dee7] bg-white p-2.5'
                key={label}
              >
                <div className='flex flex-col gap-1'>
                  <strong className='text-lg tracking-[-0.04em]'>
                    {metric}
                  </strong>
                  <span className='text-[10px] font-semibold uppercase tracking-[0.01em] text-[#625766]'>
                    {label}
                  </span>
                </div>
                <div
                  className='nc-mini-bars'
                  data-positive={index === outcomes.length - 1}
                >
                  {[42, 56, 68, 82].map((height, barIndex) => (
                    <i
                      key={height}
                      style={{
                        height: `${height + index * 3}%`,
                        animationDelay: `${barIndex * 120 + index * 80}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <small className='text-xs text-white/60 lg:col-start-2'>
          {t('home.bridge.note')}
        </small>
      </div>
    </section>
  );
}
