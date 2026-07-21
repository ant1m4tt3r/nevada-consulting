'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import testimonialsKomuh from '../../../assets/imgs/testimonialsKomuh.webp';
import testimonialsRV from '../../../assets/imgs/testimonialsRV.webp';
import RecruitmentButton from './RecruitmentButton';

const logos = [testimonialsKomuh, testimonialsRV];

function RecruitmentFaq() {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState(0);
  const items = t('recrutamento.faq.items', { returnObjects: true });

  return (
    <section className='bg-brand-cream py-20 md:py-28' id='faq'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20'>
        <div>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            FAQ
          </div>
          <h2 className='text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
            {t('recrutamento.faq.title')}
          </h2>
        </div>
        <div className='border-t border-brand-line'>
          {items.map((item, index) => {
            const isOpen = openItem === index;
            return (
              <article className='border-b border-brand-line' key={item.q}>
                <button
                  className='flex w-full items-start justify-between gap-6 py-6 text-left text-base font-bold leading-snug text-brand-ink'
                  onClick={() => setOpenItem(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                      isOpen
                        ? 'border-brand-violet bg-brand-violet text-white'
                        : 'border-brand-line text-brand-violet'
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className='overflow-hidden'>
                    <p className='max-w-2xl pb-7 pr-12 text-sm leading-relaxed text-brand-muted'>
                      {item.a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function RecruitmentProof() {
  const { t } = useTranslation();
  const testimonials = t('recrutamento.prova.testimonials', {
    returnObjects: true,
  });

  return (
    <>
      <section
        className='border-y border-brand-line bg-brand-paper py-20 md:py-28'
        id='prova'
      >
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <h2 className='max-w-4xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
            {t('recrutamento.prova.title')}
          </h2>
          <div className='mt-14 grid gap-4 lg:grid-cols-2'>
            {testimonials.map((testimonial, index) => (
              <article
                className='flex min-h-[410px] flex-col rounded-[28px] border border-brand-line bg-brand-cream p-7 md:p-9'
                key={testimonial.company}
              >
                <span className='font-editorial text-6xl leading-none text-brand-violet'>
                  “
                </span>
                <blockquote className='mt-5 text-base leading-relaxed text-brand-muted'>
                  {testimonial.quote}
                </blockquote>
                <div className='mt-auto flex items-center gap-4 border-t border-brand-line pt-6'>
                  <span className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-brand-line bg-white'>
                    <Image
                      src={logos[index]}
                      alt={testimonial.company}
                      fill
                      sizes='48px'
                      className='object-cover'
                    />
                  </span>
                  <div>
                    <strong className='block text-sm text-brand-ink'>
                      {testimonial.author}
                    </strong>
                    <span className='mt-1 block text-xs text-brand-violet'>
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecruitmentFaq />

      <section className='bg-brand-ink py-20 text-white md:py-28'>
        <div className='mx-auto flex w-[calc(100%-40px)] max-w-[1180px] flex-col items-start justify-between gap-9 rounded-[30px] border border-white/12 bg-white/[0.04] p-8 md:flex-row md:items-end md:p-12'>
          <div>
            <div className='mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
              Nevada Consulting
            </div>
            <h2 className='max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {t('recrutamento.cta.title')}
            </h2>
          </div>
          <RecruitmentButton location='cta_final'>
            {t('recrutamento.hero.btnWA')}
          </RecruitmentButton>
        </div>
      </section>
    </>
  );
}
