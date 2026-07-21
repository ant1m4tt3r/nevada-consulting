'use client';

import { useEffect, useState } from 'react';
import {
  FiBarChart2,
  FiBriefcase,
  FiCheck,
  FiCreditCard,
  FiDollarSign,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { SiGoogleanalytics, SiHubspot, SiMeta } from 'react-icons/si';
import TechnologyLogo from './TechnologyLogo';

const ROTATION_INTERVAL = 3600;

const profileIcons = {
  technology: [
    { technology: 'TypeScript' },
    { technology: 'Python' },
    { technology: 'Go' },
  ],
  marketing: [
    { Icon: SiGoogleanalytics, label: 'Google Analytics', color: '#e37400' },
    { Icon: SiHubspot, label: 'HubSpot', color: '#ff7a59' },
    { Icon: SiMeta, label: 'Meta', color: '#0081fb' },
  ],
  leadership: [
    { Icon: FiUsers, label: 'People', color: '#b8f3d2' },
    { Icon: FiTarget, label: 'Strategy', color: '#cba9d1' },
    { Icon: FiBriefcase, label: 'Execution', color: '#f4f0f6' },
  ],
  fintech: [
    { Icon: FiCreditCard, label: 'Payments', color: '#59c3d8' },
    { Icon: FiTrendingUp, label: 'Growth', color: '#72c99d' },
    { Icon: FiDollarSign, label: 'Revenue', color: '#cba9d1' },
  ],
};

function ExpertiseIcons({ animate, profileId }) {
  const icons = profileIcons[profileId] ?? profileIcons.technology;

  return (
    <div className='mt-3 flex min-h-9 items-center gap-3'>
      {icons.map(({ Icon, color, label, technology }, index) =>
        technology ? (
          <span
            className={`${animate ? 'nc-signal-icon ' : ''}inline-flex`}
            key={technology}
            style={{ '--signal-delay': `${index * 80}ms` }}
          >
            <TechnologyLogo technology={technology} />
          </span>
        ) : (
          <span
            className={`${
              animate ? 'nc-signal-icon ' : ''
            }inline-flex h-9 w-9 items-center justify-center`}
            key={label}
            role='img'
            aria-label={label}
            style={{ '--signal-delay': `${index * 80}ms` }}
            title={label}
          >
            <Icon className='h-7 w-7' style={{ color }} aria-hidden='true' />
          </span>
        ),
      )}
    </div>
  );
}

function useRotatingProfile(profiles) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const profileCount = profiles.length;

  useEffect(() => {
    if (
      profileCount < 2 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setHasRotated(true);
      setActiveIndex((current) => (current + 1) % profileCount);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [profileCount]);

  return {
    activeProfile: profiles[activeIndex] ?? profiles[0],
    hasRotated,
  };
}

export default function TalentScorecard({ copy }) {
  const profiles = copy.profiles?.length
    ? copy.profiles
    : [{ id: 'technology', role: copy.role, sources: copy.sources }];
  const { activeProfile, hasRotated } = useRotatingProfile(profiles);
  const metrics = [
    [copy.velocity, copy.velocityGoal],
    [copy.time, copy.timeGoal],
    [copy.quality, copy.qualityGoal],
  ];

  return (
    <div
      className='relative w-full rounded-[22px] border border-[#3d3740] bg-[#19161b] p-[18px] text-white shadow-[0_24px_60px_rgba(0,0,0,0.24)] max-[520px]:p-3'
      role='group'
      aria-label={copy.ariaLabel}
    >
      <div className='flex items-start justify-between px-1 pb-4 pt-2'>
        <div className='flex min-w-0 flex-col gap-1.5'>
          <span className='text-[9px] font-bold uppercase tracking-[0.16em] text-[#a69aaa]'>
            {copy.label}
          </span>
          <strong
            className={`min-h-5 truncate text-sm tracking-[-0.015em] ${
              hasRotated ? 'nc-signal-swap' : ''
            }`}
            key={activeProfile.id}
          >
            {activeProfile.role}
          </strong>
        </div>
        <span className='flex shrink-0 items-center gap-1.5 rounded-full border border-brand-mint/20 bg-brand-mint/[0.07] px-2.5 py-2 text-[9px] uppercase tracking-[0.1em] text-brand-mint'>
          <i className='nc-live-dot h-1.5 w-1.5 rounded-full bg-brand-mint' />
          {copy.live}
        </span>
      </div>

      <div className='grid min-h-[114px] grid-cols-[1fr_70px_105px] items-center gap-2 rounded-[17px] border border-white/[0.07] bg-white/[0.035] p-4 max-[1050px]:grid-cols-[1fr_45px_92px] max-[520px]:grid-cols-[1fr_30px_78px] max-[520px]:p-3'>
        <div className='min-w-0'>
          <div
            className={hasRotated ? 'nc-signal-swap' : ''}
            key={`${activeProfile.id}-signals`}
          >
            <span className='block truncate text-[9px] font-bold uppercase tracking-[0.12em] text-[#9f94a3]'>
              {activeProfile.sources}
            </span>
            <ExpertiseIcons animate={hasRotated} profileId={activeProfile.id} />
          </div>
        </div>
        <div className='nc-flow-line'>
          <i />
          <i />
          <i />
        </div>
        <div className='flex flex-col gap-1 rounded-xl border border-[#4b444e] bg-[#211e23] px-3 py-3.5 max-[520px]:px-2'>
          <strong className='flex items-center gap-1.5 text-[17px] text-[#d9f8e7] max-[520px]:text-sm'>
            <FiCheck className='h-4 w-4 rounded-full bg-brand-mint p-[3px] text-[#173e2d]' />
            {copy.validated}
          </strong>
          <span className='text-[7px] font-bold uppercase tracking-[0.08em] text-[#a89eaa]'>
            {copy.validatedLabel}
          </span>
        </div>
      </div>

      <div className='mt-2.5 rounded-[17px] bg-[#f8f5f9] p-4 text-brand-ink'>
        <div className='flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-[#786d7c]'>
          <span>{copy.outcome}</span>
          <strong className='flex items-center gap-1'>
            <FiBarChart2 /> {copy.direction}
          </strong>
        </div>
        <div className='nc-chart' aria-hidden='true'>
          {[28, 38, 34, 53, 62, 78, 92].map((height, index) => (
            <span
              key={height}
              style={{
                '--bar-height': `${height}%`,
                '--bar-delay': `${index * 90}ms`,
              }}
            />
          ))}
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {metrics.map(([label, goal]) => (
            <div
              className='rounded-lg border border-[#ddd4e0] bg-white p-2.5'
              key={label}
            >
              <span className='block min-h-[28px] text-[9px] font-bold uppercase leading-[1.25] tracking-[0.03em] text-[#625666]'>
                {label}
              </span>
              <strong className='text-[11px] font-black uppercase tracking-[0.04em] text-[#352b39]'>
                {goal}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
