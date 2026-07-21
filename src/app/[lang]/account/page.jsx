import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '../../../lib/prisma.js';
import { serviceItems } from '../../../lib/servicesConfig.js';
import Navbar from '../../../components/client/Navbar';

export const metadata = {
  robots: { index: false, follow: false },
};

const i18n = {
  pt: {
    title: 'Minha Conta — Nevada Consulting',
    area: 'Área do cliente',
    hello: 'Olá',
    welcome: 'Bem-vindo(a) ao seu painel.',
    upcoming: 'Próximos agendamentos',
    noBookings: 'Você ainda não possui agendamentos.',
    services: 'Conheça nossos serviços',
    confirmed: 'Confirmado',
    pending: 'Pendente',
  },
  en: {
    title: 'My Account — Nevada Consulting',
    area: 'Client Area',
    hello: 'Hello',
    welcome: 'Welcome to your dashboard.',
    upcoming: 'Upcoming appointments',
    noBookings: "You don't have any appointments yet.",
    services: 'Explore our services',
    confirmed: 'Confirmed',
    pending: 'Pending',
  },
};

const TZ = 'America/Sao_Paulo';

function getServiceName(slug, lang) {
  const service = serviceItems.find((s) => s.slug === slug);
  if (!service) return slug;
  return service.name[lang] ?? service.name.pt;
}

function formatDate(date, lang) {
  const locale = lang === 'en' ? 'en-US' : 'pt-BR';
  return date.toLocaleString(locale, {
    timeZone: TZ,
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${lang}`);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  const upcomingBookings = user
    ? await prisma.booking.findMany({
        where: {
          userId: user.id,
          date: { gte: new Date() },
          status: { not: 'CANCELLED' },
        },
        orderBy: { date: 'asc' },
      })
    : [];

  const firstName = session.user.name?.split(' ')[0];
  const t = i18n[lang] ?? i18n.pt;

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-brand-cream px-5 pb-20 pt-36 text-brand-ink'>
        <div className='mx-auto max-w-4xl'>
          <p className='text-xs font-black uppercase tracking-[0.18em] text-purple-primary'>
            {t.area}
          </p>
          <h1 className='mt-5 text-5xl font-black tracking-[-0.05em] md:text-7xl'>
            {t.hello}, {firstName}!
          </h1>
          <p className='mt-4 text-lg text-brand-muted'>{t.welcome}</p>

          <section className='mt-14 rounded-3xl border border-brand-line bg-brand-paper p-6 shadow-sm md:p-10'>
            <h2 className='font-editorial text-3xl'>{t.upcoming}</h2>

            {upcomingBookings.length === 0 ? (
              <div className='mt-8 rounded-2xl border border-dashed border-brand-line bg-brand-cream p-8 text-center'>
                <p className='text-brand-muted'>{t.noBookings}</p>
                <Link
                  href={`/${lang}#services`}
                  className='mt-5 inline-flex rounded-full bg-brand-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-violet'
                >
                  {t.services}
                </Link>
              </div>
            ) : (
              <ul className='mt-8 divide-y divide-brand-line'>
                {upcomingBookings.map((booking) => (
                  <li
                    key={booking.id}
                    className='flex flex-col gap-4 py-6 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between'
                  >
                    <div>
                      <p className='font-bold'>
                        {getServiceName(booking.service, lang)}
                      </p>
                      <time className='mt-1 block text-sm text-brand-muted'>
                        {formatDate(booking.date, lang)}
                      </time>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {booking.status === 'CONFIRMED' ? t.confirmed : t.pending}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
