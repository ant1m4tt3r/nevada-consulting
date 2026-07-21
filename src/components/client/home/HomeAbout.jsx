'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiCheck, FiLinkedin } from 'react-icons/fi';
import juliana from '../../../assets/imgs/juProfile2.webp';

export default function HomeAbout() {
  const { t } = useTranslation();
  const facts = t('home.expertise.facts', { returnObjects: true });

  return (
    <section className='bg-brand-cream py-20 md:py-28' id='about'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
        <div className='relative'>
          <div className='relative aspect-[4/5] overflow-hidden rounded-[32px] bg-brand-lilac [&_img]:object-cover'>
            <Image
              src={juliana}
              alt='Juliana Carvalho'
              fill
              sizes='(max-width: 900px) 100vw, 46vw'
            />
          </div>
          <div className='absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-brand-paper/95 p-5 shadow-xl backdrop-blur md:left-8 md:right-8'>
            <span className='text-[10px] font-black uppercase tracking-[0.16em] text-brand-violet'>
              {t('home.expertise.founderLed')}
            </span>
            <strong className='mt-2 block text-sm'>
              {t('home.expertise.caption')}
            </strong>
          </div>
        </div>

        <div>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            {t('home.expertise.eyebrow')}
          </div>
          <h2 className='text-5xl font-black leading-none tracking-[-0.05em] md:text-6xl'>
            {t('home.expertise.title')}
          </h2>
          <span className='mt-3 block text-sm font-bold uppercase tracking-[0.08em] text-purple-primary'>
            {t('home.expertise.role')}
          </span>
          <blockquote className='my-8 border-l-2 border-purple-primary pl-6 font-editorial text-2xl leading-snug text-brand-violet'>
            {t('home.expertise.quote')}
          </blockquote>
          <p className='text-sm leading-relaxed text-brand-muted'>
            {t('home.expertise.body1')}
          </p>
          <p className='mt-4 text-sm leading-relaxed text-brand-muted'>
            {t('home.expertise.body2')}
          </p>
          <ul className='mt-7 grid gap-3 sm:grid-cols-2'>
            {facts.map((fact) => (
              <li
                className='flex items-start gap-2 text-xs font-semibold text-brand-muted'
                key={fact}
              >
                <FiCheck className='mt-0.5 shrink-0 text-purple-primary' />
                {fact}
              </li>
            ))}
          </ul>
          <a
            className='mt-8 inline-flex items-center gap-3 border-b border-brand-ink pb-1 text-sm font-bold transition hover:text-brand-violet'
            href='https://www.linkedin.com/in/juliana-carvalhoss/'
            target='_blank'
            rel='noreferrer'
          >
            <FiLinkedin />
            {t('home.expertise.linkedin')}
            <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
