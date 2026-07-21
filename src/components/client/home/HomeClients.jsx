'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import blip from '../../../assets/imgs/blip.webp';
import caixa from '../../../assets/imgs/caixa.webp';
import edvisor from '../../../assets/imgs/edvisor.webp';
import komuh from '../../../assets/imgs/komuh.webp';
import moveo from '../../../assets/imgs/moveo.webp';
import okto from '../../../assets/imgs/okto.webp';
import quive from '../../../assets/imgs/quive.webp';
import rv from '../../../assets/imgs/rv.webp';
import skintec from '../../../assets/imgs/skintec.webp';
import trinio from '../../../assets/imgs/trinio.webp';

const clientLogos = [
  blip,
  komuh,
  okto,
  quive,
  rv,
  edvisor,
  moveo,
  skintec,
  trinio,
  caixa,
];

export default function HomeClients({ title }) {
  const { t } = useTranslation();
  const label = title ?? t('home.clients');

  return (
    <section
      className='border-b border-brand-line bg-brand-paper py-8 md:py-10'
      id='clients'
      aria-label={label}
    >
      <div className='mx-auto w-[calc(100%-40px)] max-w-[1180px]'>
        <p className='mb-7 text-center text-[10px] font-black uppercase tracking-[0.18em] text-brand-muted'>
          {label}
        </p>
        <div className='nc-logo-viewport'>
          <div className='nc-logo-track'>
            {[...clientLogos, ...clientLogos].map((clientLogo, index) => (
              <span key={index} aria-hidden={index >= clientLogos.length}>
                <Image
                  src={clientLogo}
                  alt={index < clientLogos.length ? `Client ${index + 1}` : ''}
                  width={120}
                  height={54}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
