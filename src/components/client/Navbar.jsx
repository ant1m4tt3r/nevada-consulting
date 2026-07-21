'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const { changeLanguage, currentLanguage } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const language = currentLanguage === 'en' ? 'en' : 'pt';
  const home = `/${language}`;
  const recruitmentHref =
    language === 'en' ? '/en/recruitment' : '/pt/recrutamento';
  const links = [
    [t('navbar.home'), home],
    [t('navbar.services'), `${home}#services`],
    [t('navbar.clients'), `${home}#clients`],
    [t('navbar.about'), `${home}#about`],
    [t('navbar.contact'), `${home}#contact`],
  ];

  const changeSiteLanguage = (nextLanguage) => {
    trackEvent('language_change', {
      language: nextLanguage,
      previous_language: language,
      location: pathname,
    });
    changeLanguage(nextLanguage);
    const recruitmentPaths = new Set([
      '/recrutamento',
      '/pt/recrutamento',
      '/pt/recruitment',
      '/en/recruitment',
      '/en/recrutamento',
    ]);
    if (recruitmentPaths.has(pathname)) {
      router.push(
        nextLanguage === 'en' ? '/en/recruitment' : '/pt/recrutamento',
      );
      setMenuOpen(false);
      return;
    }
    const localizedPath = /^\/(pt|en)(\/|$)/.test(pathname)
      ? pathname.replace(/^\/(pt|en)/, `/${nextLanguage}`)
      : `/${nextLanguage}`;
    router.push(localizedPath);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-[18px] z-[80] mx-auto flex min-h-[68px] w-[calc(100%-48px)] max-w-[1180px] items-center justify-between rounded-full border border-brand-line/90 bg-brand-paper/95 px-5 shadow-[0_16px_50px_rgba(23,19,27,0.1)] backdrop-blur-xl transition-transform duration-300 md:px-7 ${
          scrollDirection === 'down' ? '-translate-y-[110px]' : ''
        }`}
      >
        <Link
          href={home}
          className='flex shrink-0 items-center gap-3 text-brand-ink'
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
          } absolute left-0 right-0 top-[78px] flex-col items-stretch gap-1 rounded-3xl border border-brand-line bg-brand-paper p-4 shadow-xl min-[1100px]:static min-[1100px]:flex min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-3 min-[1100px]:border-0 min-[1100px]:bg-transparent min-[1100px]:p-0 min-[1100px]:shadow-none [&>a]:whitespace-nowrap [&>a]:rounded-full [&>a]:px-2.5 [&>a]:py-2 [&>a]:text-xs [&>a]:font-bold [&>a]:uppercase [&>a]:tracking-[0.08em] [&>a]:text-brand-muted [&>a]:transition-colors hover:[&>a]:text-brand-violet`}
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href={recruitmentHref} onClick={() => setMenuOpen(false)}>
            {t('navbar.recrutamento')}
          </Link>

          <div
            className='flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-brand-muted [&_button]:transition-colors hover:[&_button]:text-brand-violet'
            aria-label='Language'
          >
            <button
              className={language === 'pt' ? 'text-brand-violet' : ''}
              onClick={() => changeSiteLanguage('pt')}
            >
              PT
            </button>
            <span>/</span>
            <button
              className={language === 'en' ? 'text-brand-violet' : ''}
              onClick={() => changeSiteLanguage('en')}
            >
              EN
            </button>
          </div>

          {session ? (
            <>
              <Link className='!text-brand-violet' href={`${home}/account`}>
                {t('navbar.myAccount')}
              </Link>
              <button
                className='rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-muted transition-colors hover:text-brand-violet'
                onClick={() => signOut()}
              >
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <button
              className='flex min-h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-ink px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-brand-violet'
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
              }}
            >
              {t('navbar.login')}
              <FiArrowUpRight className='shrink-0' />
            </button>
          )}
        </nav>

        <button
          className='flex h-10 w-10 items-center justify-center rounded-full border border-brand-line text-xl text-brand-ink min-[1100px]:hidden'
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
