'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../providers/LanguageContext.jsx';
import {
  PiBuildingOfficeThin,
  PiPresentationChart,
  PiStrategy,
} from 'react-icons/pi';
import { FaChartLine } from 'react-icons/fa';
import React from 'react';

const B2C_SLUGS = ['resume-linkedin-portfolio', 'interview-preparation'];
const B2B_SLUGS = ['high-performance-team', 'recruitment-training'];

export default function ServiceSelectorModal({ isOpen, onClose, filter }) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const language = currentLanguage === 'en' ? 'en' : 'pt';

  const allItems = [
    {
      slug: 'high-performance-team',
      icon: <PiBuildingOfficeThin />,
      label: t('services.first.subtitle'),
    },
    {
      slug: 'recruitment-training',
      icon: <FaChartLine />,
      label: t('services.third.subtitle'),
    },
    {
      slug: 'resume-linkedin-portfolio',
      icon: <PiStrategy />,
      label: t('services.fifth.subtitle'),
    },
    {
      slug: 'interview-preparation',
      icon: <PiPresentationChart />,
      label: t('services.sixth.subtitle'),
    },
  ];

  const items =
    filter === 'b2c'
      ? allItems.filter((i) => B2C_SLUGS.includes(i.slug))
      : filter === 'b2b'
        ? allItems.filter((i) => B2B_SLUGS.includes(i.slug))
        : allItems;

  const handleSelect = (slug) => {
    onClose();
    router.push(`/${language}/services/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/65 px-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='w-full max-w-lg rounded-3xl border border-brand-line bg-brand-paper p-6 text-brand-ink shadow-[0_24px_80px_rgba(23,19,27,0.2)] md:p-8'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{t('services.selectService')}</h2>
          <button
            onClick={onClose}
            className='cursor-pointer text-2xl leading-none text-brand-muted transition-colors hover:text-brand-ink'
            aria-label={t('services.close')}
          >
            ×
          </button>
        </div>

        <ul className='flex flex-col gap-2'>
          {items.map(({ slug, icon, label }) => (
            <li key={slug}>
              <button
                onClick={() => handleSelect(slug)}
                className='group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-transparent px-4 py-3 text-left text-brand-muted transition-colors duration-200 hover:border-brand-line hover:bg-brand-cream hover:text-brand-ink'
              >
                <span className='flex-shrink-0 text-xl text-purple-primary'>
                  {React.cloneElement(icon, { className: 'w-5 h-5' })}
                </span>
                <span className='text-sm font-medium leading-snug'>
                  {label}
                </span>
                <span className='ml-auto text-brand-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-violet'>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className='mt-5 border-t border-brand-line pt-5 text-center'>
          <span className='text-sm text-brand-muted'>
            {t('services.needHelp')}{' '}
            <a
              href={`https://wa.me/5511994607649?text=${encodeURIComponent(t('services.helpPrefill'))}`}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-1 font-bold text-purple-primary underline underline-offset-2 transition-opacity duration-200 hover:opacity-70'
            >
              {t('services.talkToMe')}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
