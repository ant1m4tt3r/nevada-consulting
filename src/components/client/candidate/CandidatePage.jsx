'use client';

import { useTranslation } from 'react-i18next';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import HomeCandidateServices from '../home/HomeCandidateServices';
import HomeFooter from '../home/HomeFooter';
import { getWhatsappHref } from '../home/constants';
import Navbar from '../Navbar';

export default function CandidatePage() {
  const { t } = useTranslation();
  const candidateCopy = t('candidatePage', { returnObjects: true });
  const whatsappHref = getWhatsappHref(candidateCopy.whatsappPrefill);

  return (
    <main className='overflow-hidden bg-brand-cream text-brand-ink'>
      <Navbar />
      <section className='relative overflow-hidden bg-brand-ink pb-24 pt-40 text-white md:pb-28 md:pt-44'>
        <div className='absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand-violet/20 blur-3xl' />
        <div className='relative mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <p className='flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            <span className='h-px w-8 bg-brand-lilac' />
            {candidateCopy.eyebrow}
          </p>
          <h1 className='mt-7 max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.058em] sm:text-6xl lg:text-[72px]'>
            {candidateCopy.title}
          </h1>
          <p className='mt-7 max-w-2xl text-lg leading-relaxed text-white/70'>
            {candidateCopy.body}
          </p>
          <div className='mt-9 flex flex-wrap gap-3'>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-black text-brand-ink transition hover:-translate-y-0.5 hover:bg-brand-lilac'
              href={whatsappHref}
              target='_blank'
              rel='noreferrer'
            >
              {candidateCopy.whatsapp}
              <FiArrowUpRight />
            </a>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5'
              href='#candidate-services'
            >
              {candidateCopy.servicesCta}
              <FiArrowDown />
            </a>
          </div>
        </div>
      </section>
      <HomeCandidateServices standalone />
      <HomeFooter />
    </main>
  );
}
