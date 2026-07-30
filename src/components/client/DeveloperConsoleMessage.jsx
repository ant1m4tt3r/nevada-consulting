'use client';

import { useEffect } from 'react';

const SITE_URL = 'https://www.nevadaconsulting.com.br';
const CONTACT_EMAIL = 'contato@nevadaconsulting.com.br';

const titleStyle = [
  'background:linear-gradient(135deg,#17131b 0%,#62306d 100%)',
  'border:1px solid #8d519e',
  'border-radius:10px',
  'color:#f8f6f2',
  'font-size:16px',
  'font-weight:800',
  'letter-spacing:.08em',
  'padding:10px 14px',
].join(';');

const messageStyle = [
  'color:#6b616e',
  'font-size:13px',
  'font-weight:600',
  'line-height:1.6',
].join(';');

const labelStyle = 'color:#62306d;font-weight:800';
const linkStyle = 'color:#21835f;font-weight:700';

export default function DeveloperConsoleMessage({ language }) {
  useEffect(() => {
    if (window.__nevadaConsoleMessageShown) return;

    window.__nevadaConsoleMessageShown = true;

    const isEnglish = language === 'en';
    const recruitmentUrl = `${SITE_URL}/${
      isEnglish ? 'en/recruitment' : 'pt/recrutamento'
    }`;
    const candidateUrl = `${SITE_URL}/${
      isEnglish ? 'en/candidates' : 'pt/candidatos'
    }`;

    console.log('%c▲  NEVADA CONSULTING', titleStyle);
    console.log(
      '%cCurious minds build better teams. Since you are already here, let’s connect.',
      messageStyle,
    );
    console.log(
      '%cRecruitment  →  %c%s',
      labelStyle,
      linkStyle,
      recruitmentUrl,
    );
    console.log(
      '%cCandidate services  →  %c%s',
      labelStyle,
      linkStyle,
      candidateUrl,
    );
    console.log('%cSay hello  →  %c%s', labelStyle, linkStyle, CONTACT_EMAIL);
  }, [language]);

  return null;
}
