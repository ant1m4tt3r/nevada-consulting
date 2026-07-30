import Image from 'next/image';

const technologyLogos = {
  TypeScript: {
    src: '/brands/typescript.svg',
    width: 128,
    height: 128,
    className: 'h-7 w-7',
  },
  Python: {
    src: '/brands/python.svg',
    width: 128,
    height: 128,
    className: 'h-8 w-8',
  },
  Go: {
    src: '/brands/go.svg',
    width: 207,
    height: 78,
    className: 'h-6 w-auto max-w-none',
  },
};

export default function TechnologyLogo({ compact = false, technology }) {
  const logo = technologyLogos[technology];

  if (!logo) return null;

  const isGo = technology === 'Go';
  const containerClassName = isGo ? (compact ? 'w-11' : 'w-16') : 'w-9';
  const imageClassName =
    isGo && compact ? 'h-auto w-10 max-w-none' : logo.className;

  return (
    <span
      className={`inline-flex h-9 shrink-0 items-center justify-center ${containerClassName}`}
      title={technology}
    >
      <Image
        src={logo.src}
        alt={`${technology} logo`}
        width={logo.width}
        height={logo.height}
        className={imageClassName}
      />
    </span>
  );
}
