'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiFileText, FiMessageCircle } from 'react-icons/fi';
import { useLanguage } from '../../../providers/LanguageContext';
import { getWhatsappHref } from './constants';

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

export default function HomeCandidateServices({ standalone = false }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const candidateCopy = t('candidatePage', { returnObjects: true });
  const servicesCopy = t('services', { returnObjects: true });
  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const whatsappHref = getWhatsappHref(candidateCopy.whatsappPrefill);

  return (
    <section
      className='border-y border-brand-line bg-brand-paper py-20 md:py-28'
      id={standalone ? 'candidate-services' : 'career-services'}
    >
      <div
        className={`mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-12 ${
          standalone
            ? 'lg:grid-cols-[0.62fr_1.38fr] lg:gap-16'
            : 'lg:grid-cols-[0.72fr_1.28fr] lg:gap-20'
        }`}
      >
        <div>
          <p className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            {servicesCopy.b2cLabel}
          </p>
          <h2 className='max-w-xl text-4xl font-black leading-[1] tracking-[-0.05em] md:text-5xl'>
            {servicesCopy.ctaTitleB2C}
          </h2>
          <p className='mt-6 max-w-md text-base leading-relaxed text-brand-muted'>
            {servicesCopy.ctaSubtitleB2C}
          </p>
          <a
            className='mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-violet'
            href={whatsappHref}
            target='_blank'
            rel='noreferrer'
          >
            {candidateCopy.whatsapp}
            <FiArrowUpRight />
          </a>
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
                  {servicesCopy[service.translationKey].subtitle}
                </h3>
                <p className='mt-4 text-sm leading-relaxed text-brand-muted'>
                  {servicesCopy[service.translationKey].description}
                </p>
                <Link
                  className='mt-auto flex items-center justify-between border-t border-brand-line pt-5 text-xs font-black text-brand-violet'
                  href={`/${language}/services/${service.slug}`}
                >
                  {servicesCopy.viewDetails}
                  <FiArrowUpRight />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
