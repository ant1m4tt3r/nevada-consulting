'use client';

import {
  FiBriefcase,
  FiCode,
  FiDollarSign,
  FiHeart,
  FiHome,
  FiRadio,
  FiTarget,
  FiUsers,
  FiX,
  FiCheck,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const areaIcons = [
  FiCode,
  FiRadio,
  FiTarget,
  FiUsers,
  FiHeart,
  FiDollarSign,
  FiBriefcase,
  FiHome,
];

function ComparisonColumn({ heading, items, positive }) {
  const Icon = positive ? FiCheck : FiX;

  return (
    <article
      className={`overflow-hidden rounded-[28px] border ${
        positive
          ? 'border-brand-violet/30 bg-brand-paper shadow-[0_24px_70px_rgba(23,19,27,0.08)]'
          : 'border-brand-line bg-[#efebe8]'
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b px-6 py-6 text-sm font-black uppercase tracking-[0.08em] md:px-8 ${
          positive
            ? 'border-brand-violet/20 text-brand-violet'
            : 'border-brand-line text-brand-muted'
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            positive
              ? 'bg-brand-lilac text-brand-violet'
              : 'bg-white/70 text-[#8b5960]'
          }`}
        >
          <Icon />
        </span>
        {heading}
      </div>
      <ul className='divide-y divide-brand-line'>
        {items.map((item) => (
          <li
            className='flex items-start gap-4 px-6 py-4 text-sm leading-relaxed text-brand-ink md:px-8'
            key={item}
          >
            <Icon
              className={`mt-1 shrink-0 ${
                positive ? 'text-brand-violet' : 'text-[#9b6970]'
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function RecruitmentExpertise() {
  const { t } = useTranslation();
  const negative = t('recrutamento.diferenciais.negative', {
    returnObjects: true,
  });
  const positive = t('recrutamento.diferenciais.positive', {
    returnObjects: true,
  });
  const areas = t('recrutamento.especialidades.areas', {
    returnObjects: true,
  });

  return (
    <>
      <section className='bg-brand-cream py-20 md:py-28'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <div className='max-w-3xl'>
            <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
              Nevada Consulting
            </div>
            <h2 className='text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {t('recrutamento.diferenciais.title')}
            </h2>
          </div>
          <div className='mt-14 grid items-start gap-5 lg:grid-cols-2'>
            <ComparisonColumn
              heading={t('recrutamento.diferenciais.negativeHeader')}
              items={negative}
            />
            <ComparisonColumn
              heading={t('recrutamento.diferenciais.positiveHeader')}
              items={positive}
              positive
            />
          </div>
        </div>
      </section>

      <section className='border-y border-brand-line bg-brand-paper py-20 md:py-28'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <div className='grid items-end gap-8 md:grid-cols-[1fr_0.45fr]'>
            <h2 className='max-w-3xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {t('recrutamento.especialidades.title')}
            </h2>
            <p className='text-sm leading-relaxed text-brand-muted'>
              {t('recrutamento.visual.areasBody')}
            </p>
          </div>
          <div className='mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {areas.map((area, index) => {
              const Icon = areaIcons[index];
              return (
                <article
                  className={`flex min-h-[150px] flex-col justify-between rounded-3xl border p-5 transition-[border-color,box-shadow] hover:shadow-[0_16px_40px_rgba(23,19,27,0.07)] md:min-h-[180px] md:p-6 ${
                    area.featured
                      ? 'min-h-[220px] border-brand-violet bg-brand-ink text-white hover:border-brand-lilac sm:col-span-2'
                      : 'border-brand-line bg-brand-cream hover:border-brand-violet/35'
                  }`}
                  key={area.title}
                >
                  <Icon
                    className={`h-8 w-8 ${
                      area.featured ? 'text-brand-mint' : 'text-brand-violet'
                    }`}
                  />
                  <div>
                    {area.featured ? (
                      <span className='mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-brand-lilac'>
                        {area.label}
                      </span>
                    ) : null}
                    <strong
                      className={`block text-sm font-black uppercase tracking-[0.06em] ${
                        area.featured ? 'text-white' : 'text-brand-ink'
                      }`}
                    >
                      {area.title}
                    </strong>
                    <span
                      className={`mt-1 block text-xs leading-relaxed ${
                        area.featured ? 'text-white/65' : 'text-brand-muted'
                      }`}
                    >
                      {area.detail}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
