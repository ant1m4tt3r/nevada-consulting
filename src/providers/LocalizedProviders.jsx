'use client';

import { useState } from 'react';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ptTranslations from '../locale/pt.json';
import enTranslations from '../locale/en.json';
import { LanguageProvider } from './LanguageContext';

const resources = {
  pt: ptTranslations,
  en: enTranslations,
};

export default function LocalizedProviders({ children, language }) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      resources,
      lng: language,
      fallbackLng: 'pt',
      initImmediate: false,
      interpolation: { escapeValue: false },
    });
    return instance;
  });

  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
    </I18nextProvider>
  );
}
