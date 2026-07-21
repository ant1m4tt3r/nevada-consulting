import Image from 'next/image';
import logo from '../../../assets/imgs/logo.webp';

export default function HomeBrand({ compact = false }) {
  return (
    <span className='inline-flex items-center gap-3'>
      <span className='inline-flex shrink-0'>
        <Image
          src={logo}
          alt=''
          sizes={compact ? '34px' : '42px'}
          className={`h-auto ${compact ? 'w-[34px]' : 'w-[42px]'}`}
        />
      </span>
      <span className='text-[15px] font-black uppercase leading-none tracking-[-0.03em]'>
        Nevada
        <span className='mt-1 block text-[8px] font-bold tracking-[0.22em] text-purple-primary'>
          Consulting
        </span>
      </span>
    </span>
  );
}
