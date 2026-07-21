'use client';

import { useTranslation } from 'react-i18next';

export default function HomeProof() {
  const { t } = useTranslation();
  const testimonials = [
    {
      role: t('testimonials.firstJobPosition'),
      company: t('testimonials.firstCompany'),
      paragraphs: [
        t('testimonials.firstReview1'),
        t('testimonials.firstReview2'),
        t('testimonials.firstReview3'),
      ],
    },
    {
      role: t('testimonials.thirdJobPosition'),
      company: t('testimonials.thirdCompany'),
      paragraphs: [
        t('testimonials.thirdReview1'),
        t('testimonials.thirdReview2'),
        t('testimonials.thirdReview3'),
      ],
    },
    {
      role: t('testimonials.secondJobPosition'),
      company: t('testimonials.secondCompany'),
      paragraphs: [
        t('testimonials.secondReview1'),
        t('testimonials.secondReview2'),
        t('testimonials.secondReview3'),
      ],
    },
  ];

  return (
    <section className='bg-brand-ink py-20 text-white md:py-28' id='proof'>
      <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
        <div className='max-w-3xl'>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            {t('home.proof.eyebrow')}
          </div>
          <h2 className='text-4xl font-black leading-[1] tracking-[-0.05em] md:text-6xl'>
            {t('home.proof.title')}
          </h2>
        </div>
        <div className='mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 lg:grid-cols-3'>
          {testimonials.map((item, index) => (
            <article
              className='flex flex-col bg-brand-ink p-8 md:p-10'
              key={item.company}
            >
              <div className='font-editorial text-6xl leading-none text-brand-lilac'>
                “
              </div>
              <blockquote className='mt-4 space-y-4 text-sm leading-relaxed text-white/80'>
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>
              <div className='mt-auto flex items-center gap-4 border-t border-white/15 pt-8'>
                <span className='text-xs font-black text-brand-lilac'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <strong className='block text-sm'>{item.role}</strong>
                  <em className='mt-1 block text-xs not-italic text-white/55'>
                    {item.company}
                  </em>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
