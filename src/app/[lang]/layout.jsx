import { notFound } from 'next/navigation';
import LocalizedProviders from '../../providers/LocalizedProviders';

const locales = ['pt', 'en'];

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;

  if (!locales.includes(lang)) notFound();

  return (
    <LocalizedProviders language={lang}>
      <div lang={lang === 'en' ? 'en' : 'pt-BR'}>{children}</div>
    </LocalizedProviders>
  );
}
