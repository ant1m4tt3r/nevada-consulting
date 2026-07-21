'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiFileText, FiMessageCircle } from 'react-icons/fi';
import { useLanguage } from '../../../providers/LanguageContext';
import ServiceSelectorModal from '../ServiceSelectorModal';

const candidateServices = [
  {
    number: '01',
    translationKey: 'fifth',
    slug: 'resume-linkedin-portfolio',
    icon: FiFileText,
  },
  {
    number: '02',
    translationKey: 'sixth',
    slug: 'interview-preparation',
    icon: FiMessageCircle,
  },
];

export default function HomeCandidateServices() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <>
      <section
        className='border-y border-brand-line bg-brand-paper py-20 md:py-28'
        id='career-services'
      >
        <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20'>
          <div>
            <p className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
              {t('services.b2cLabel')}
            </p>
            <h2 className='max-w-xl text-4xl font-black leading-[1] tracking-[-0.05em] md:text-5xl'>
              {t('services.ctaTitleB2C')}
            </h2>
            <p className='mt-6 max-w-md text-base leading-relaxed text-brand-muted'>
              {t('services.ctaSubtitleB2C')}
            </p>
            <button
              className='mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-violet'
              onClick={() => setSelectorOpen(true)}
            >
              {t('services.ctaButton')}
              <FiArrowUpRight />
            </button>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {candidateServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className='flex min-h-[330px] flex-col rounded-3xl border border-brand-line bg-brand-cream p-7 transition-[border-color,box-shadow] duration-300 hover:border-purple-primary/40 hover:shadow-[0_18px_50px_rgba(23,19,27,0.08)]'
                  key={service.slug}
                >
                  <div className='flex items-center justify-between text-xs font-black text-brand-muted'>
                    <span>{service.number}</span>
                    <span className='flex h-11 w-11 items-center justify-center rounded-full bg-brand-lilac text-xl text-brand-violet'>
                      <Icon />
                    </span>
                  </div>
                  <h3 className='mt-10 text-2xl font-bold leading-tight tracking-[-0.035em]'>
                    {t(`services.${service.translationKey}.subtitle`)}
                  </h3>
                  <p className='mt-4 text-sm leading-relaxed text-brand-muted'>
                    {t(`services.${service.translationKey}.description`)}
                  </p>
                  <Link
                    className='mt-auto flex items-center justify-between border-t border-brand-line pt-5 text-xs font-black text-brand-violet'
                    href={`/${language}/services/${service.slug}`}
                  >
                    {t('services.viewDetails')}
                    <FiArrowUpRight />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ServiceSelectorModal
        isOpen={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        filter='b2c'
      />
    </>
  );
}
