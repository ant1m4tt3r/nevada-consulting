import { notFound } from 'next/navigation';
import LocalizedProviders from '../../providers/LocalizedProviders';

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params;

  if (!['pt', 'en'].includes(lang)) notFound();

  return <LocalizedProviders language={lang}>{children}</LocalizedProviders>;
}
