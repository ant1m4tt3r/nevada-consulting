import { SiGo, SiPython, SiTypescript } from 'react-icons/si';

const technologyIcons = {
  TypeScript: SiTypescript,
  Python: SiPython,
  Go: SiGo,
};

export default function TechnologyLogo({ technology }) {
  const Icon = technologyIcons[technology];

  return (
    <span
      className={`relative inline-flex h-9 shrink-0 items-center justify-center ${
        technology === 'Go' ? 'w-11' : 'w-9'
      }`}
      title={technology}
      role='img'
      aria-label={`${technology} logo`}
    >
      {technology === 'Python' ? (
        <span className='relative h-7 w-7' aria-hidden='true'>
          <Icon className='absolute inset-0 h-full w-full text-[#3776ab] [clip-path:inset(0_0_49%_0)]' />
          <Icon className='absolute inset-0 h-full w-full text-[#ffd43b] [clip-path:inset(49%_0_0_0)]' />
        </span>
      ) : (
        <Icon
          className={
            technology === 'TypeScript'
              ? 'h-7 w-7 text-[#3178c6]'
              : 'h-8 w-11 max-w-none text-[#00add8]'
          }
          aria-hidden='true'
        />
      )}
    </span>
  );
}
