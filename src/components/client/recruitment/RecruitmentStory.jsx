'use client';

import Image from 'next/image';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import juProfile from '../../../assets/imgs/juProfile.webp';
import RecruitmentButton from './RecruitmentButton';

export default function RecruitmentStory() {
  const { t } = useTranslation();
  const credentials = t('recrutamento.juliana.credentials', {
    returnObjects: true,
  });
  const steps = t('recrutamento.metodo.steps', { returnObjects: true });

  return (
    <>
      <section className='bg-brand-ink py-20 text-white md:py-28' id='juliana'>
        <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20'>
          <div className='relative min-h-[460px] overflow-hidden rounded-[30px] bg-white/5'>
            <Image
              src={juProfile}
              alt='Juliana Carvalho'
              fill
              sizes='(max-width: 1024px) 100vw, 460px'
              className='object-cover object-top'
            />
            <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-transparent p-7 pt-24'>
              <strong className='text-xl'>Juliana Carvalho</strong>
              <span className='mt-1 block text-xs uppercase tracking-[0.14em] text-white/60'>
                Founder · Nevada Consulting
              </span>
            </div>
          </div>
          <div>
            <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
              {t('recrutamento.juliana.sectionLabel')}
            </div>
            <h2 className='max-w-2xl text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
              {t('recrutamento.visual.founderTitle')}
            </h2>
            <p className='mt-7 text-base font-bold leading-relaxed text-white/85'>
              {t('recrutamento.juliana.subtitle')}
            </p>
            <p className='mt-4 max-w-2xl text-base leading-relaxed text-white/62'>
              {t('recrutamento.juliana.bio')}
            </p>
            <div className='mt-7 flex flex-wrap gap-2'>
              {credentials.map((credential) => (
                <span
                  className='rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/75'
                  key={credential}
                >
                  {credential}
                </span>
              ))}
            </div>
            <a
              className='mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-lilac transition hover:text-white'
              href='https://www.linkedin.com/in/juliana-carvalhoss/'
              target='_blank'
              rel='noreferrer'
            >
              {t('recrutamento.juliana.linkedinCta')}
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className='bg-brand-cream py-20 md:py-28' id='processo'>
        <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
          <div className='grid items-end gap-8 md:grid-cols-[1fr_auto]'>
            <div>
              <div className='mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-brand-violet'>
                {t('recrutamento.visual.processLabel')}
              </div>
              <h2 className='text-4xl font-black leading-none tracking-[-0.055em] md:text-6xl'>
                {t('recrutamento.metodo.title')}
              </h2>
            </div>
            <RecruitmentButton location='metodo' inverse>
              {t('recrutamento.hero.btnWA')}
            </RecruitmentButton>
          </div>

          <div className='mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {steps.map((step, index) => (
              <article
                className='group flex min-h-[245px] flex-col rounded-3xl border border-brand-line bg-brand-paper p-7 transition-[border-color,box-shadow] hover:border-brand-violet/35 hover:shadow-[0_18px_50px_rgba(23,19,27,0.07)]'
                key={step.name}
              >
                <div className='flex items-center justify-between'>
                  <span className='font-editorial text-3xl text-brand-violet'>
                    0{index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <FiArrowRight className='text-brand-line transition group-hover:translate-x-1 group-hover:text-brand-violet' />
                  ) : null}
                </div>
                <h3 className='mt-auto text-xl font-bold tracking-[-0.03em]'>
                  {step.name}
                </h3>
                <p className='mt-3 text-sm leading-relaxed text-brand-muted'>
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
