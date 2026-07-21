import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';
import BookServiceButton from '../../../../components/client/BookServiceButton';
import JsonLd from '../../../../components/seo/JsonLd';
import { slugToKey, serviceItems } from '../../../../lib/servicesConfig';
import {
  getLanguageAlternates,
  getLocalizedUrl,
  getServiceStructuredData,
} from '../../../../lib/seo';
import ptTranslations from '../../../../locale/pt.json';
import enTranslations from '../../../../locale/en.json';

function renderInline(text, links, lang) {
  const regex = /\{\{(\w+)\}\}|<b>([\s\S]*?)<\/b>|<i>([\s\S]*?)<\/i>/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1]) {
      const link = links?.[match[1]];
      if (link) {
        const href = link.href ?? `/${lang}/services/${link.slug}`;
        parts.push(
          <a
            key={`link-${match.index}`}
            href={href}
            target={link.external ? '_blank' : '_self'}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className='text-purple-primary underline hover:opacity-70 transition-opacity'
          >
            {link.label}
          </a>,
        );
      } else {
        parts.push(match[0]);
      }
    } else if (match[2] !== undefined) {
      parts.push(
        <strong
          key={`bold-${match.index}`}
          className='font-semibold text-gray-900'
        >
          {match[2]}
        </strong>,
      );
    } else if (match[3] !== undefined) {
      parts.push(<em key={`italic-${match.index}`}>{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function renderBlock(block, index, links, lang) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  const lines = trimmed.split('\n');

  // Bold title + body: starts with <b>...</b> followed by content (not a sentence)
  const boldTitleMatch = trimmed.match(/^<b>([\s\S]*?)<\/b>\n([\s\S]*)$/);
  if (boldTitleMatch && !boldTitleMatch[1].trimEnd().endsWith('.')) {
    return (
      <div key={index} className='border-l-2 border-purple-primary pl-4 py-1'>
        <p className='font-bold text-gray-900 mb-1'>{boldTitleMatch[1]}</p>
        <p className='text-gray-600 leading-relaxed text-[16px]'>
          {renderInline(boldTitleMatch[2], links, lang)}
        </p>
      </div>
    );
  }

  // All list items
  if (
    lines.every((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '))
  ) {
    return (
      <ul key={index} className='space-y-2'>
        {lines.map((line, j) => (
          <li key={j} className='flex gap-3 text-gray-600 text-[16px]'>
            <span className='text-purple-primary font-bold shrink-0 mt-px'>
              —
            </span>
            <span>
              {renderInline(line.replace(/^[-•]\s*/, ''), links, lang)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  // Section header + body on same block (first line ends with :)
  if (lines[0].trim().endsWith(':') && lines.length > 1) {
    const header = lines[0].trim().slice(0, -1);
    const body = lines.slice(1).join('\n');
    return (
      <div key={index}>
        <p className='text-xs font-bold uppercase tracking-widest text-purple-primary mb-2'>
          {header}
        </p>
        <p className='text-gray-600 leading-relaxed text-[16px]'>
          {renderInline(body, links, lang)}
        </p>
      </div>
    );
  }

  // Standalone section header (single line ending with :)
  if (lines.length === 1 && trimmed.endsWith(':')) {
    return (
      <p
        key={index}
        className='text-xs font-bold uppercase tracking-widest text-purple-primary'
      >
        {trimmed.slice(0, -1)}
      </p>
    );
  }

  // Regular paragraph
  return (
    <p key={index} className='text-gray-600 leading-relaxed text-[16px]'>
      {lines.map((line, j) => (
        <span key={j}>
          {j > 0 && <br />}
          {renderInline(line, links, lang)}
        </span>
      ))}
    </p>
  );
}

function renderDescription(text, links, lang) {
  return text
    .split(/\n\n+/)
    .map((block, i) => renderBlock(block, i, links, lang))
    .filter(Boolean);
}

// Parses text into intro blocks, a "how it works" label, step cards, and outro
function parseSteps(text) {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const intro = [];
  const steps = [];
  const outro = [];
  let howItWorksLabel = null;
  let currentStep = null;
  const stepRegex = /^(?:Passo|Step)\s+(\d+)[:\s–-]+(.+?)(?:\n([\s\S]*))?$/i;

  for (const block of blocks) {
    // Section label "Como funciona:" / "How it works:"
    if (/^(Como funciona|How it works):?$/i.test(block)) {
      howItWorksLabel = block.replace(/:$/, '');
      continue;
    }

    const stepMatch = block.match(stepRegex);
    if (stepMatch) {
      const title = stepMatch[2].trim();
      const body = stepMatch[3]?.trim() ?? '';
      currentStep = {
        number: stepMatch[1].padStart(2, '0'),
        title,
        content: body ? [body] : [],
      };
      steps.push(currentStep);
      continue;
    }

    if (currentStep) {
      currentStep.content.push(block);
    } else {
      intro.push(block);
    }
  }

  // Move the last block of the last step to outro if it looks like a sign-off
  if (steps.length > 0) {
    const lastStep = steps[steps.length - 1];
    const signOffIdx = lastStep.content.findIndex((b) =>
      /^(Sou a |I'm |I am )/i.test(b),
    );
    if (signOffIdx !== -1) {
      outro.push(...lastStep.content.splice(signOffIdx));
    }
  }

  return { intro, howItWorksLabel, steps, outro };
}

function renderStepCardContent(blocks, links, lang) {
  return blocks.map((block, i) => {
    const lines = block.split('\n');

    if (
      lines.every((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '))
    ) {
      return (
        <ul key={i} className='space-y-1.5 mt-2'>
          {lines.map((line, j) => (
            <li key={j} className='flex gap-2 text-gray-600 text-sm'>
              <span className='text-purple-primary font-bold shrink-0'>—</span>
              <span>
                {renderInline(line.replace(/^[-•]\s*/, ''), links, lang)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className='text-gray-600 text-sm leading-relaxed mt-2'>
        {lines.map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {renderInline(line, links, lang)}
          </span>
        ))}
      </p>
    );
  });
}

function InvestmentLine({ investment }) {
  if (!investment) return null;
  return (
    <p className='text-gray-600 leading-relaxed text-[16px]'>
      <span className='font-bold text-gray-900'>{investment.label}</span>{' '}
      {investment.price}
      {investment.installments ? <> {investment.installments}</> : null}
    </p>
  );
}

function PackageHeader({ name, price, subtitle, tagline }) {
  return (
    <div className='mb-8'>
      <div className='flex flex-wrap items-center gap-3'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>{name}</h2>
        {price && (
          <span className='rounded-full bg-purple-primary/10 text-purple-primary text-sm font-bold px-4 py-1'>
            {price}
          </span>
        )}
      </div>
      {subtitle && (
        <p className='text-lg font-semibold text-gray-800 mt-2'>{subtitle}</p>
      )}
      {tagline && <p className='text-gray-600 text-[16px] mt-2'>{tagline}</p>}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = Object.keys(slugToKey);
  const langs = ['pt', 'en'];
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];
  if (!translationKey) return { title: 'Nevada Consulting' };

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const service = translations.translation.services[translationKey];
  const language = lang === 'en' ? 'en' : 'pt';
  const path = `/services/${slug}`;
  const serviceTitle = service.seoTitle ?? service.subtitle;
  const description = service.seoDescription ?? service.description;
  const title = `${serviceTitle} | Nevada Consulting`;
  const image = language === 'en' ? '/og-en.png' : '/og.png';

  return {
    title: { absolute: title },
    description,
    alternates: getLanguageAlternates(language, path),
    openGraph: {
      title,
      description,
      type: 'website',
      url: getLocalizedUrl(language, path),
      siteName: 'Nevada Consulting',
      locale: language === 'pt' ? 'pt_BR' : 'en_US',
      alternateLocale: language === 'pt' ? ['en_US'] : ['pt_BR'],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${serviceTitle} — Nevada Consulting`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ServicePage({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];

  if (!translationKey) notFound();

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const t = translations.translation;
  const service = t.services[translationKey];
  const backLabel = t.services.backToServices;
  const serviceConfig = serviceItems.find((s) => s.slug === slug);
  const pageCopy =
    lang === 'pt'
      ? {
          corporate: 'Solução corporativa',
          individual: 'Serviço individual',
          model: serviceConfig?.b2b
            ? 'Modelo success fee'
            : 'Atendimento personalizado',
          ctaEyebrow: 'Próximo passo',
          ctaTitle: 'Vamos entender o seu momento?',
          ctaBody: serviceConfig?.b2b
            ? 'Converse diretamente com a Juliana sobre a posição, o contexto do time e o impacto esperado.'
            : 'Fale diretamente com a Juliana para escolher o formato mais adequado ao seu objetivo.',
          response: 'Resposta pessoal em até 1 dia útil',
        }
      : {
          corporate: 'Corporate solution',
          individual: 'Individual service',
          model: serviceConfig?.b2b
            ? 'Success fee model'
            : 'Personalized support',
          ctaEyebrow: 'Next step',
          ctaTitle: 'Shall we understand your context?',
          ctaBody: serviceConfig?.b2b
            ? 'Talk directly with Juliana about the role, team context and expected impact.'
            : 'Talk directly with Juliana to choose the best format for your goal.',
          response: 'Personal reply within one business day',
        };

  const fullText = service.fullDescription ?? service.description;
  const hasSteps = translationKey === 'fifth';
  const parsed = hasSteps
    ? parseSteps(fullText)
    : { intro: [], steps: [], outro: [], howItWorksLabel: null };

  return (
    <>
      <JsonLd
        data={getServiceStructuredData({
          language: lang,
          slug,
          name: service.subtitle,
          description: service.seoDescription ?? service.description,
          serviceType: serviceConfig?.b2b
            ? lang === 'pt'
              ? 'Recrutamento e estratégia de talentos para empresas'
              : 'Corporate recruiting and talent strategy'
            : lang === 'pt'
              ? 'Consultoria de carreira'
              : 'Career consulting',
        })}
      />
      <Navbar hideNav />
      <main className='min-h-screen bg-brand-cream pt-28 text-brand-ink'>
        <section className='border-b border-brand-line bg-brand-paper py-16 md:py-24'>
          <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
            <Link
              href={`/${lang}#services`}
              className='mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-brand-violet transition hover:-translate-x-1'
            >
              <span>←</span> {backLabel}
            </Link>
            <div className='grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]'>
              <div>
                <p className='mb-5 text-xs font-black uppercase tracking-[0.18em] text-purple-primary'>
                  {t.services.title}
                </p>
                <h1 className='max-w-[880px] text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] md:text-7xl'>
                  {service.subtitle}
                </h1>
                <p className='mt-7 max-w-3xl text-lg leading-relaxed text-brand-muted md:text-xl'>
                  {service.description}
                </p>
              </div>
              <div className='flex flex-wrap gap-2 md:max-w-[240px] md:justify-end [&_span]:rounded-full [&_span]:border [&_span]:border-brand-line [&_span]:bg-brand-cream [&_span]:px-4 [&_span]:py-2 [&_span]:text-[11px] [&_span]:font-bold [&_span]:uppercase [&_span]:tracking-[0.08em] [&_span]:text-brand-muted'>
                <span>
                  {serviceConfig?.b2b
                    ? pageCopy.corporate
                    : pageCopy.individual}
                </span>
                <span>{pageCopy.model}</span>
              </div>
            </div>
          </div>
        </section>

        <div
          className={`mx-auto w-[calc(100%-40px)] py-16 md:py-24 ${
            hasSteps ? 'max-w-[1180px]' : 'max-w-[1080px]'
          }`}
        >
          {hasSteps ? (
            <>
              {/* Package 1 — Complete */}
              <section className='rounded-3xl border border-purple-primary/20 bg-brand-paper p-6 shadow-sm md:p-10'>
                <PackageHeader
                  name={service.packageCompleteName}
                  price={service.investment?.price}
                  tagline={service.packageCompleteTagline}
                />

                {/* Intro paragraphs */}
                {parsed.intro.length > 0 && (
                  <div className='space-y-4 mb-10'>
                    {parsed.intro.map((block, i) =>
                      renderBlock(block, i, service.links, lang),
                    )}
                  </div>
                )}

                {/* "Como funciona" label */}
                {parsed.howItWorksLabel && (
                  <p className='text-xs font-bold uppercase tracking-widest text-purple-primary mb-6'>
                    {parsed.howItWorksLabel}
                  </p>
                )}

                {/* Step cards */}
                {parsed.steps.length > 0 && (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-10'>
                    {parsed.steps.map((step) => (
                      <div
                        key={step.number}
                        className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-3'
                      >
                        <span className='text-3xl font-black text-purple-primary/20 leading-none'>
                          {step.number}
                        </span>
                        <h3 className='font-bold text-gray-900 text-base leading-snug'>
                          {step.title}
                        </h3>
                        <div className='flex flex-col gap-3'>
                          {renderStepCardContent(
                            step.content,
                            service.links,
                            lang,
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <InvestmentLine investment={service.investment} />

                <div className='mt-2 flex flex-col items-start gap-1'>
                  {service.callout && (
                    <p className='text-purple-primary font-semibold text-lg italic'>
                      {service.callout}
                    </p>
                  )}
                  <BookServiceButton
                    slug={slug}
                    serviceName={`${service.subtitle} — ${service.packageCompleteName}`}
                    b2b={false}
                    ctaLabel={service.ctaLabel}
                  />
                </div>
              </section>

              {/* Divider */}
              <div className='flex items-center gap-4 my-14'>
                <div className='flex-1 h-px bg-gradient-to-r from-transparent to-purple-primary/40' />
                <div className='w-2 h-2 rounded-full bg-purple-primary/60' />
                <div className='w-3 h-3 rounded-full bg-purple-primary' />
                <div className='w-2 h-2 rounded-full bg-purple-primary/60' />
                <div className='flex-1 h-px bg-gradient-to-l from-transparent to-purple-primary/40' />
              </div>

              {/* Package 2 — Essential */}
              {service.packageEssential && (
                <section className='rounded-3xl border border-brand-line bg-white/55 p-6 shadow-sm md:p-10'>
                  <PackageHeader
                    name={service.packageEssential.name}
                    price={service.packageEssential.investment?.price}
                    subtitle={service.packageEssential.subtitle}
                    tagline={service.packageEssential.tagline}
                  />

                  <div className='space-y-6 mb-8'>
                    {renderDescription(
                      service.packageEssential.description,
                      service.links,
                      lang,
                    )}
                  </div>

                  <InvestmentLine
                    investment={service.packageEssential.investment}
                  />

                  <div className='mt-2'>
                    <BookServiceButton
                      slug={slug}
                      serviceName={`${service.subtitle} — ${service.packageEssential.name}`}
                      whatsappCta
                    />
                  </div>
                </section>
              )}

              {/* Outro */}
              {parsed.outro.length > 0 && (
                <div className='space-y-4 mt-14'>
                  {parsed.outro.map((block, i) =>
                    renderBlock(block, i, service.links, lang),
                  )}
                </div>
              )}
            </>
          ) : (
            <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20'>
              <article className='min-w-0'>
                {service.quote && (
                  <p className='mb-12 border-l-2 border-purple-primary pl-6 font-editorial text-2xl leading-snug text-brand-violet md:text-3xl'>
                    <span className='mr-1'>&ldquo;</span>
                    {service.quote}
                    <span>&rdquo;</span>
                  </p>
                )}
                <div className='space-y-6'>
                  {renderDescription(fullText, service.links, lang)}
                </div>
              </article>

              <aside className='rounded-3xl bg-brand-ink p-7 text-white shadow-[0_24px_80px_rgba(23,19,27,0.16)] lg:sticky lg:top-28 md:p-9'>
                <p className='mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-brand-lilac'>
                  {pageCopy.ctaEyebrow}
                </p>
                <h2 className='font-editorial text-3xl leading-tight'>
                  {service.callout || pageCopy.ctaTitle}
                </h2>
                <span className='mt-5 block text-sm leading-relaxed text-white/70'>
                  {pageCopy.ctaBody}
                </span>
                <BookServiceButton
                  slug={slug}
                  serviceName={service.subtitle}
                  b2b={serviceConfig?.b2b ?? false}
                  ctaLabel={service.ctaLabel}
                  alwaysShowLabel
                />
                <small className='mt-5 block border-t border-white/15 pt-5 text-xs text-white/60'>
                  {pageCopy.response}
                </small>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
