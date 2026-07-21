'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '../../../providers/LanguageContext';
import LoginModal from '../LoginModal';
import HomeBrand from './HomeBrand';

const navigationLinkClass =
  'whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.07em] text-white/70 transition-colors hover:text-white';

export default function HomeNavigation() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { currentLanguage, changeLanguage } = useLanguage();
  const router = useRouter();
  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const recruitmentHref =
    language === 'en' ? '/en/recruitment' : '/pt/recrutamento';
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const switchLanguage = (nextLanguage) => {
    changeLanguage(nextLanguage);
    router.push(`/${nextLanguage}`);
    setMenuOpen(false);
  };

  const links = [
    ['navbar.home', '#home'],
    ['home.nav.solutions', '#services'],
    ['navbar.clients', '#clients'],
    ['navbar.about', '#about'],
    ['navbar.contact', '#contact'],
  ];

  return (
    <>
      <nav
        className='fixed inset-x-0 top-[18px] z-[80] mx-auto flex min-h-[68px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between rounded-full border border-white/15 bg-brand-ink/95 px-5 text-white shadow-[0_16px_50px_rgba(23,19,27,0.22)] backdrop-blur-xl md:px-7'
        aria-label={t('home.nav.aria')}
      >
        <a
          href='#home'
          className='relative z-10 text-white'
          aria-label='Nevada Consulting — home'
        >
          <HomeBrand compact />
        </a>

        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-[78px] max-h-[calc(100vh-110px)] flex-col items-stretch gap-1 overflow-y-auto rounded-3xl border border-white/10 bg-brand-ink p-4 shadow-xl min-[1100px]:static min-[1100px]:flex min-[1100px]:max-h-none min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-1 min-[1100px]:overflow-visible min-[1100px]:border-0 min-[1100px]:bg-transparent min-[1100px]:p-0 min-[1100px]:shadow-none`}
        >
          {links.map(([label, href]) => (
            <a
              className={navigationLinkClass}
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {t(label)}
            </a>
          ))}
          <Link
            className={navigationLinkClass}
            href={recruitmentHref}
            onClick={() => setMenuOpen(false)}
          >
            {t('navbar.recrutamento')}
          </Link>
          <div
            className='flex shrink-0 items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold text-white/60 [&_button]:transition-colors hover:[&_button]:text-white'
            aria-label={t('navbar.language')}
          >
            <button
              className={language === 'pt' ? '!text-brand-lilac' : ''}
              onClick={() => switchLanguage('pt')}
            >
              PT
            </button>
            <span>/</span>
            <button
              className={language === 'en' ? '!text-brand-lilac' : ''}
              onClick={() => switchLanguage('en')}
            >
              EN
            </button>
          </div>

          {session ? (
            <div className='flex flex-col gap-1 min-[1100px]:flex-row min-[1100px]:items-center'>
              <Link
                className={navigationLinkClass}
                href={`/${language}/account`}
                onClick={() => setMenuOpen(false)}
              >
                {t('navbar.myAccount')}
              </Link>
              <button
                className={navigationLinkClass}
                onClick={() => signOut({ callbackUrl: `/${language}` })}
              >
                {t('navbar.logout')}
              </button>
            </div>
          ) : (
            <button
              className={navigationLinkClass}
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
              }}
            >
              {t('navbar.login')}
            </button>
          )}

          <a
            className='flex min-h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-[11px] font-black uppercase tracking-[0.07em] text-brand-ink transition hover:bg-brand-lilac'
            href='#contact'
            onClick={() => setMenuOpen(false)}
          >
            {t('home.nav.talk')}
            <FiArrowUpRight className='shrink-0' />
          </a>
        </div>

        <button
          className='relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white min-[1100px]:hidden'
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={t('home.nav.toggle')}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
