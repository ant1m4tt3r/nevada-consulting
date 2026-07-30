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
  { image: blip, name: 'Blip' },
  { image: komuh, name: 'Komuh' },
  { image: okto, name: 'OKTO' },
  { image: quive, name: 'Quive' },
  { image: rv, name: 'Red Ventures' },
  { image: edvisor, name: 'Edvisor' },
  { image: moveo, name: 'Moveo.ai' },
  { image: skintec, name: 'Skintec' },
  { image: trinio, name: 'Trinio' },
  { image: caixa, name: 'CAIXA' },
];

export default function HomeClients({ translationKey = 'home.clients' }) {
  const { t } = useTranslation();
  const label = t(translationKey);

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
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <span
                className='flex h-[68px] w-[168px] shrink-0 items-center justify-center px-5 py-2.5'
                key={`${client.name}-${index}`}
                aria-hidden={index >= clientLogos.length}
              >
                <Image
                  className='h-auto max-h-full w-auto max-w-full object-contain'
                  src={client.image}
                  alt={index < clientLogos.length ? client.name : ''}
                  sizes='128px'
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
