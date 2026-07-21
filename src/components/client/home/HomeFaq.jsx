'use client';

import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';

export default function HomeFaq() {
  const { t } = useTranslation();
  const items = t('home.faq.items', { returnObjects: true });

  return (
    <section className='bg-brand-paper py-20 md:py-28' id='faq'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20'>
        <div>
          <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
            {t('home.faq.eyebrow')}
          </div>
          <h2 className='text-4xl font-black leading-[1] tracking-[-0.05em] md:text-5xl'>
            {t('home.faq.title')}
          </h2>
          <p className='mt-6 max-w-md text-sm leading-relaxed text-brand-muted'>
            {t('home.faq.body')}
          </p>
        </div>

        <div className='divide-y divide-brand-line border-y border-brand-line'>
          {items.map((item, index) => (
            <details
              className='group py-5'
              key={item.question}
              open={index === 0}
            >
              <summary className='flex cursor-pointer list-none items-center justify-between gap-6 text-base font-bold marker:content-none'>
                {item.question}
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-line text-brand-violet transition group-open:rotate-45'>
                  <FiPlus />
                </span>
              </summary>
              <p className='max-w-2xl pb-2 pr-12 pt-4 text-sm leading-relaxed text-brand-muted'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
