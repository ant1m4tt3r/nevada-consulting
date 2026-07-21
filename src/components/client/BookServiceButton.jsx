'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';
import { WHATSAPP_NUMBER } from '../../lib/servicesConfig.js';
import LoginModal from './LoginModal.jsx';
import SchedulingModal from './SchedulingModal.jsx';

function ActionButton({ children, onClick, href, target, rel, noMargin }) {
  const className = `inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-brand-ink bg-brand-ink px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand-violet hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-primary focus-visible:ring-offset-2 ${
    noMargin ? '' : 'mt-6'
  }`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={className}>
        {children}
        <FiArrowUpRight />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
      <FiArrowUpRight />
    </button>
  );
}

export default function BookServiceButton({
  slug,
  serviceName,
  b2b = false,
  variants,
  ctaLabel,
  alwaysShowLabel = false,
  whatsappCta = false,
}) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);
  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(null);

  if (b2b) {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de saber mais.`,
    );
    return (
      <ActionButton
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {ctaLabel ?? t('services.talkToSpecialist')}
      </ActionButton>
    );
  }

  if (variants) {
    const handleVariantClick = (variant) => {
      if (!session) {
        setLoginOpen(true);
        return;
      }
      setActiveVariant(variant);
    };

    return (
      <>
        <div className='mt-4 flex flex-col sm:flex-row gap-6'>
          {variants.map((v) => (
            <ActionButton key={v.slug} onClick={() => handleVariantClick(v)}>
              {session || alwaysShowLabel ? v.label : t('services.loginToBook')}
            </ActionButton>
          ))}
        </div>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        <SchedulingModal
          isOpen={!!activeVariant}
          onClose={() => setActiveVariant(null)}
          slug={activeVariant?.slug}
          serviceName={activeVariant?.label}
        />
      </>
    );
  }

  const handleClick = () => {
    if (!session) {
      setLoginOpen(true);
      return;
    }
    setSchedulingOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no serviço: ${serviceName}. Gostaria de falar diretamente com você.`,
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (whatsappCta) {
    return (
      <ActionButton
        href={whatsappHref}
        target='_blank'
        rel='noopener noreferrer'
      >
        {ctaLabel ?? t('services.talkDirectly')}
      </ActionButton>
    );
  }

  return (
    <>
      <ActionButton onClick={handleClick}>
        {ctaLabel ??
          (session ? t('services.bookSession') : t('services.loginToBook'))}
      </ActionButton>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <SchedulingModal
        isOpen={schedulingOpen}
        onClose={() => setSchedulingOpen(false)}
        slug={slug}
        serviceName={serviceName}
      />
    </>
  );
}
