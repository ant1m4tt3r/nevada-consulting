'use client';

import { useTranslation } from 'react-i18next';
import { FiLinkedin } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { useLanguage } from '../../../providers/LanguageContext';
import HomeBrand from './HomeBrand';
import { getWhatsappHref } from './constants';

export default function HomeFooter() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const recruitmentHref =
    language === 'en' ? '/en/recruitment' : '/pt/recrutamento';
  const whatsappHref = getWhatsappHref(t('home.contact.prefill'));

  return (
    <footer className='bg-brand-ink py-14 text-white'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]'>
        <div>
          <HomeBrand />
          <p className='mt-5 font-editorial text-lg text-white/70'>
            {t('home.footer.line')}
          </p>
        </div>
        <div className='flex flex-col gap-2 text-sm text-white/75 [&_a]:transition-colors hover:[&_a]:text-white'>
          <a href='mailto:contato@nevadaconsulting.com.br'>
            contato@nevadaconsulting.com.br
          </a>
          <a href={whatsappHref} target='_blank' rel='noreferrer'>
            +55 11 99460-7649
          </a>
        </div>
        <div className='flex flex-col gap-2 text-xs font-bold text-white/65 [&_a]:transition-colors hover:[&_a]:text-white'>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href={recruitmentHref}>{t('navbar.recrutamento')}</a>
          <a href={`/${language}/services/resume-linkedin-portfolio`}>
            {t('services.fifth.subtitle')}
          </a>
          <a href={`/${language}/services/interview-preparation`}>
            {t('services.sixth.subtitle')}
          </a>
        </div>
        <div className='flex gap-2 [&_a]:flex [&_a]:h-10 [&_a]:w-10 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_a]:border-white/20 [&_a]:text-white/80 [&_a]:transition hover:[&_a]:border-white/50 hover:[&_a]:text-white'>
          <a
            href='https://www.linkedin.com/in/juliana-carvalhoss/'
            target='_blank'
            rel='noreferrer'
            aria-label='LinkedIn'
          >
            <FiLinkedin />
          </a>
          <a
            href={whatsappHref}
            target='_blank'
            rel='noreferrer'
            aria-label='WhatsApp'
          >
            <SiWhatsapp />
          </a>
        </div>
      </div>
      <div className='mx-auto mt-12 flex w-[calc(100%-40px)] max-w-[1180px] flex-col justify-between gap-2 border-t border-white/15 pt-6 text-[11px] text-white/60 sm:flex-row'>
        <span>{t('home.footer.rights')}</span>
        <span>{t('home.footer.reach')}</span>
      </div>
    </footer>
  );
}
