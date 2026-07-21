'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiSearch, FiTarget, FiUsers } from 'react-icons/fi';
import { useLanguage } from '../../../providers/LanguageContext';

const icons = [FiSearch, FiUsers, FiTarget];

export default function HomeServices() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const cards = t('home.solutions.cards', { returnObjects: true });

  return (
    <section className='bg-brand-cream py-20 md:py-28' id='services'>
      <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
        <div className='grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] md:gap-16'>
          <div>
            <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
              {t('home.solutions.eyebrow')}
            </div>
            <h2 className='max-w-3xl text-4xl font-black leading-[1] tracking-[-0.055em] md:text-6xl'>
              {t('home.solutions.title')}
            </h2>
          </div>
          <p className='text-base leading-relaxed text-brand-muted'>
            {t('home.solutions.body')}
          </p>
        </div>

        <div className='mt-14 grid gap-4 md:grid-cols-3'>
          {cards.map((card, index) => {
            const Icon = icons[index];
            const href = card.slug
              ? `/${language}/services/${card.slug}`
              : card.href;

            return (
              <article
                className='group flex min-h-[430px] flex-col rounded-3xl border border-brand-line bg-brand-paper p-7 transition-[border-color,box-shadow] duration-300 hover:border-purple-primary/40 hover:shadow-[0_18px_50px_rgba(23,19,27,0.08)]'
                key={card.number}
              >
                <div className='flex items-center justify-between text-sm font-bold text-brand-muted [&_svg]:flex [&_svg]:h-11 [&_svg]:w-11 [&_svg]:items-center [&_svg]:justify-center [&_svg]:rounded-full [&_svg]:bg-brand-lilac [&_svg]:p-3 [&_svg]:text-brand-violet'>
                  <span>{card.number}</span>
                  <Icon />
                </div>
                <h3 className='mt-12 text-2xl font-bold leading-tight tracking-[-0.035em]'>
                  {card.title}
                </h3>
                <p className='mt-4 text-sm leading-relaxed text-brand-muted'>
                  {card.text}
                </p>
                <div className='mt-auto flex min-h-[64px] flex-wrap content-end items-end gap-1.5 pb-6 pt-8'>
                  {card.chips.map((chip) => (
                    <span
                      className='rounded-full border border-brand-line px-3 py-1.5 text-[9px] font-bold text-brand-muted'
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Link
                  className='flex items-center justify-between border-t border-brand-line pt-5 text-xs font-black text-brand-violet'
                  href={href}
                >
                  {card.link}
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
