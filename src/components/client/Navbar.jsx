'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';

import Logo from '../../assets/icons/Logo.jsx';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../providers/LanguageContext.jsx';
import { useScrollDirection } from '../../hooks/useScrollDirection.js';
import { trackEvent } from '../../lib/gtm.js';
import LoginModal from './LoginModal.jsx';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const home = `/${language}`;
  const techRecruitmentHref =
    language === 'en' ? '/en/recruitment' : '/pt/recrutamento';
  const candidatesHref =
    language === 'en' ? '/en/candidates' : '/pt/candidatos';
  const isRecruitmentPage = new Set([
    '/recrutamento',
    '/pt/recrutamento',
    '/pt/recruitment',
    '/en/recruitment',
    '/en/recrutamento',
  ]).has(pathname);
  const sectionBase = isRecruitmentPage ? techRecruitmentHref : home;
  const contactHref = `${sectionBase}#contact`;
  const links = [
    [t('navbar.home'), home],
    [t('navbar.recrutamento'), techRecruitmentHref],
    [t('navbar.clients'), `${sectionBase}#clients`],
    [
      t('navbar.method'),
      `${sectionBase}#${isRecruitmentPage ? 'method' : 'processo'}`,
    ],
    [t('navbar.about'), `${sectionBase}#about`],
    [t('navbar.candidates'), candidatesHref],
  ];

  const getLocalizedPath = (nextLanguage) => {
    const recruitmentPaths = new Set([
      '/recrutamento',
      '/pt/recrutamento',
      '/pt/recruitment',
      '/en/recruitment',
      '/en/recrutamento',
    ]);

    if (recruitmentPaths.has(pathname)) {
      return nextLanguage === 'en' ? '/en/recruitment' : '/pt/recrutamento';
    }

    const candidatePaths = new Set([
      '/pt/candidatos',
      '/en/candidatos',
      '/en/candidates',
    ]);

    if (candidatePaths.has(pathname)) {
      return nextLanguage === 'en' ? '/en/candidates' : '/pt/candidatos';
    }

    return /^\/(pt|en)(\/|$)/.test(pathname)
      ? pathname.replace(/^\/(pt|en)/, `/${nextLanguage}`)
      : `/${nextLanguage}`;
  };

  const handleLanguageChange = (nextLanguage) => {
    trackEvent('language_change', {
      language: nextLanguage,
      previous_language: language,
      location: pathname,
    });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-[18px] z-[80] mx-auto flex min-h-[68px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between rounded-full border border-white/15 bg-brand-ink/95 px-5 text-white shadow-[0_16px_50px_rgba(23,19,27,0.22)] backdrop-blur-xl transition-transform duration-300 md:px-7 ${
          scrollDirection === 'down' ? '-translate-y-[110px]' : ''
        }`}
      >
        <Link
          href={home}
          className='flex shrink-0 items-center gap-3 text-white'
          aria-label='Nevada Consulting'
        >
          <span className='flex h-9 w-9 items-center justify-center text-purple-primary [&_svg]:h-full [&_svg]:w-full'>
            <Logo />
          </span>
          <span className='text-[15px] font-black uppercase leading-none tracking-[-0.03em]'>
            Nevada
            <small className='mt-1 block text-[8px] font-bold tracking-[0.22em] text-purple-primary'>
              Consulting
            </small>
          </span>
        </Link>

        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-[78px] max-h-[calc(100vh-110px)] flex-col items-stretch gap-1 overflow-y-auto rounded-3xl border border-white/10 bg-brand-ink p-4 shadow-xl min-[1100px]:static min-[1100px]:flex min-[1100px]:max-h-none min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-1 min-[1100px]:overflow-visible min-[1100px]:border-0 min-[1100px]:bg-transparent min-[1100px]:p-0 min-[1100px]:shadow-none [&>a]:whitespace-nowrap [&>a]:rounded-full [&>a]:px-2.5 [&>a]:py-2 [&>a]:text-[11px] [&>a]:font-bold [&>a]:uppercase [&>a]:tracking-[0.07em] [&>a]:text-white/70 [&>a]:transition-colors hover:[&>a]:text-white`}
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div
            className='flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold text-white/60 [&_a]:transition-colors hover:[&_a]:text-white'
            aria-label='Language'
          >
            {/* Native links keep locale changes reliable before client hydration. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href={getLocalizedPath('pt')}
              className={language === 'pt' ? 'text-brand-lilac' : ''}
              onClick={() => handleLanguageChange('pt')}
            >
              PT
            </a>
            <span>/</span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href={getLocalizedPath('en')}
              className={language === 'en' ? 'text-brand-lilac' : ''}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </a>
          </div>

          {session ? (
            <>
              <Link className='!text-brand-lilac' href={`${home}/account`}>
                {t('navbar.myAccount')}
              </Link>
              <button
                className='rounded-full px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.07em] text-white/70 transition-colors hover:text-white'
                onClick={() => signOut()}
              >
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <button
              className='shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.07em] text-white/70 transition-colors hover:text-white'
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
              }}
            >
              {t('navbar.login')}
            </button>
          )}

          <Link
            className='!inline-flex min-h-10 shrink-0 items-center justify-center gap-2 !bg-white !px-4 !font-black !text-brand-ink hover:!bg-brand-lilac'
            href={contactHref}
            onClick={() => setMenuOpen(false)}
          >
            {t('home.nav.talk')}
            <FiArrowUpRight className='shrink-0' />
          </Link>
        </nav>

        <button
          className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white min-[1100px]:hidden'
          onClick={() => setMenuOpen((open) => !open)}
          aria-label='Toggle menu'
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
