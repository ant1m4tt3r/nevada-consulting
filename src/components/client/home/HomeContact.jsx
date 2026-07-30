'use client';

import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiMail, FiMessageSquare } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import HomeContactForm from './HomeContactForm';
import { getWhatsappHref } from './constants';

export default function HomeContact() {
  const { t } = useTranslation();
  const contactCopy = t('contact', { returnObjects: true });
  const copy = t('home.contact', { returnObjects: true });

  return (
    <section className='bg-brand-cream py-20 md:py-28' id='contact'>
      <div className='mx-auto grid w-[calc(100%-40px)] max-w-[1180px] gap-10 rounded-[32px] bg-brand-violet p-8 text-white shadow-[0_24px_80px_rgba(98,48,109,0.24)] md:p-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14'>
        <div>
          <div className='mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl'>
            <FiMessageSquare aria-hidden='true' />
          </div>
          <div className='mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
            {copy.eyebrow}
          </div>
          <h2 className='max-w-2xl text-4xl font-black leading-[1] tracking-[-0.05em] md:text-5xl'>
            {copy.title}
          </h2>
          <p className='mt-5 max-w-2xl text-sm leading-relaxed text-white/70'>
            {copy.body}
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <a
              className='inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-xs font-bold text-white transition hover:border-white hover:bg-white/10'
              href={getWhatsappHref(copy.prefill)}
              target='_blank'
              rel='noreferrer'
            >
              <SiWhatsapp aria-hidden='true' />
              {copy.whatsapp}
              <FiArrowUpRight aria-hidden='true' />
            </a>
            <a
              className='inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-xs font-bold text-white transition hover:border-white hover:bg-white/10'
              href='mailto:contato@nevadaconsulting.com.br'
            >
              <FiMail aria-hidden='true' />
              {copy.email}
            </a>
          </div>
          <span className='mt-5 flex items-center gap-2 text-xs text-white/70'>
            <i className='h-1.5 w-1.5 rounded-full bg-brand-mint' />
            {copy.note}
          </span>
        </div>
        <HomeContactForm
          copy={{
            email: contactCopy.email,
            error: copy.error,
            message: contactCopy.message,
            name: contactCopy.name,
            send: contactCopy.send,
            sending: copy.sending,
            success: contactCopy.thankYouMessage,
          }}
        />
      </div>
    </section>
  );
}
