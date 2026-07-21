import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';

export const metadata = {
  robots: { index: false, follow: false },
};

const i18n = {
  pt: {
    title: 'Pagamento cancelado',
    subtitle:
      'Nenhuma cobrança foi realizada. Você pode tentar novamente quando quiser.',
    back: 'Voltar aos serviços',
  },
  en: {
    title: 'Payment cancelled',
    subtitle: 'No charge was made. You can try again whenever you are ready.',
    back: 'Back to services',
  },
};

export default async function BookingCancelPage({ params }) {
  const { lang } = await params;
  const t = i18n[lang] ?? i18n.pt;

  return (
    <>
      <Navbar hideNav />
      <main className='flex min-h-screen items-center justify-center bg-brand-cream px-5 py-32 text-brand-ink'>
        <div className='w-full max-w-xl rounded-[32px] border border-brand-line bg-brand-paper p-8 text-center shadow-[0_24px_80px_rgba(23,19,27,0.12)] md:p-12'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-2xl font-black text-rose-700'>
            <span>✕</span>
          </div>

          <h1 className='mt-7 text-4xl font-black tracking-[-0.04em] md:text-5xl'>
            {t.title}
          </h1>
          <p className='mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-muted'>
            {t.subtitle}
          </p>

          <Link
            href={`/${lang}#services`}
            className='mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-brand-line bg-brand-paper px-7 text-sm font-bold text-brand-ink transition hover:-translate-y-0.5 hover:border-purple-primary hover:text-brand-violet'
          >
            {t.back}
          </Link>
        </div>
      </main>
    </>
  );
}
