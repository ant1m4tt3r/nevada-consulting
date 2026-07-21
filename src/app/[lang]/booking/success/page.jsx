import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { prisma } from '../../../../lib/prisma.js';
import { serviceItems } from '../../../../lib/servicesConfig.js';
import { Resend } from 'resend';
import { getCalendarClient } from '../../../../lib/googleCalendar.js';
import Navbar from '../../../../components/client/Navbar';

export const metadata = {
  robots: { index: false, follow: false },
};

const TZ = 'America/Sao_Paulo';

const i18n = {
  pt: {
    title: 'Agendamento confirmado!',
    titlePending: 'Pagamento em análise',
    subtitle: 'Seu pagamento foi aprovado e sua consulta está agendada.',
    subtitlePending:
      'Assim que o pagamento for confirmado, você receberá um e-mail com os detalhes.',
    service: 'Serviço',
    date: 'Data',
    email: 'Um e-mail de confirmação foi enviado para você.',
    home: 'Voltar ao início',
  },
  en: {
    title: 'Booking confirmed!',
    titlePending: 'Payment in review',
    subtitle: 'Your payment was approved and your session is scheduled.',
    subtitlePending:
      'Once payment is confirmed, you will receive an email with the details.',
    service: 'Service',
    date: 'Date',
    email: 'A confirmation email has been sent to you.',
    home: 'Back to home',
  },
};

export default async function BookingSuccessPage({ params, searchParams }) {
  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
  const { lang } = await params;
  const { payment_id, status, external_reference } = await searchParams;
  const t = i18n[lang] ?? i18n.pt;
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
  const isApproved = status === 'approved';

  let serviceName = '';
  let formattedDate = '';

  if (external_reference) {
    try {
      const metadata = JSON.parse(decodeURIComponent(external_reference));
      const {
        slug,
        startTime,
        serviceName: sn,
        userEmail,
        userName,
        userId,
      } = metadata;

      serviceName = sn ?? '';

      if (startTime) {
        formattedDate = new Date(startTime).toLocaleString(locale, {
          timeZone: TZ,
          dateStyle: 'long',
          timeStyle: 'short',
        });
      }

      // Fallback: cria booking caso webhook ainda não tenha processado
      if (isApproved && payment_id && userId && slug && startTime) {
        const start = new Date(startTime);
        const alreadyCreated = await prisma.booking.findUnique({
          where: { paymentSessionId: String(payment_id) },
        });

        if (!alreadyCreated) {
          const service = serviceItems.find((s) => s.slug === slug);
          const duration = service?.duration ?? 60;
          const end = new Date(start.getTime() + duration * 60 * 1000);

          const booking = await prisma.booking.create({
            data: {
              userId,
              service: slug,
              date: start,
              status: 'CONFIRMED',
              paymentSessionId: String(payment_id),
            },
          });

          // Criar evento no Google Calendar
          try {
            const calendar = getCalendarClient();
            await calendar.events.insert({
              calendarId: process.env.GOOGLE_CALENDAR_ID,
              sendUpdates: 'all',
              requestBody: {
                summary: `Consulta: ${serviceName}`,
                description: `Cliente: ${userName || userEmail}\nBooking ID: ${booking.id}`,
                start: { dateTime: start.toISOString(), timeZone: TZ },
                end: { dateTime: end.toISOString(), timeZone: TZ },
                attendees: [
                  { email: userEmail },
                  { email: process.env.GOOGLE_CALENDAR_ID, organizer: true },
                ],
                reminders: {
                  useDefault: false,
                  overrides: [
                    { method: 'email', minutes: 60 },
                    { method: 'popup', minutes: 15 },
                  ],
                },
              },
            });
          } catch (calErr) {
            console.error(
              '[booking/success] Calendar event failed:',
              calErr?.response?.data ?? calErr?.message,
            );
          }

          // Enviar email de confirmação
          try {
            await resend?.emails.send({
              from: 'Nevada Consulting <noreply@nevadaconsulting.com.br>',
              to: userEmail,
              subject: 'Confirmação de agendamento — Nevada Consulting',
              html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 12px;">
                  <h2 style="color: #8D519E; margin-bottom: 8px;">Agendamento confirmado!</h2>
                  <p style="color: #ccc;">Olá, ${userName || ''}.</p>
                  <p style="color: #ccc;">Seu pagamento foi confirmado e sua consulta foi agendada com sucesso.</p>
                  <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 0; color: #fff;"><strong>Serviço:</strong> ${serviceName}</p>
                    <p style="margin: 8px 0 0; color: #fff;"><strong>Data:</strong> ${formattedDate}</p>
                  </div>
                  <p style="color: #666; font-size: 13px;">Você receberá um convite do Google Calendar em breve.</p>
                </div>
              `,
            });
          } catch (emailErr) {
            console.error('[booking/success] Email failed:', emailErr.message);
          }
        }
      }
    } catch (err) {
      console.error('[booking/success] Error:', err.message);
    }
  }

  return (
    <>
      <Navbar hideNav />
      <main className='flex min-h-screen items-center justify-center bg-brand-cream px-5 py-32 text-brand-ink'>
        <div className='w-full max-w-xl rounded-[32px] border border-brand-line bg-brand-paper p-8 text-center shadow-[0_24px_80px_rgba(23,19,27,0.12)] md:p-12'>
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-black ${
              isApproved
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            <span>{isApproved ? '✓' : '⏳'}</span>
          </div>

          <h1 className='mt-7 text-4xl font-black tracking-[-0.04em] md:text-5xl'>
            {isApproved ? t.title : t.titlePending}
          </h1>
          <p className='mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-muted'>
            {isApproved ? t.subtitle : t.subtitlePending}
          </p>

          {(serviceName || formattedDate) && (
            <div className='mt-8 divide-y divide-brand-line rounded-2xl border border-brand-line bg-brand-cream px-5 text-left'>
              {serviceName && (
                <p className='py-4 font-semibold'>
                  <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.12em] text-brand-muted'>
                    {t.service}
                  </span>
                  {serviceName}
                </p>
              )}
              {formattedDate && isApproved && (
                <p className='py-4 font-semibold'>
                  <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.12em] text-brand-muted'>
                    {t.date}
                  </span>
                  {formattedDate}
                </p>
              )}
            </div>
          )}

          {isApproved && (
            <p className='mt-6 text-sm text-brand-muted'>{t.email}</p>
          )}

          <Link
            href={`/${lang}`}
            className='mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-ink px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-violet'
          >
            {t.home}
          </Link>
        </div>
      </main>
    </>
  );
}
