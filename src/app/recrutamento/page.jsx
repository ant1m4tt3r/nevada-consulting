'use client';

import { useEffect } from 'react';
import HomeClients from '../../components/client/home/HomeClients';
import HomeFooter from '../../components/client/home/HomeFooter';
import Navbar from '../../components/client/Navbar';
import RecruitmentExpertise from '../../components/client/recruitment/RecruitmentExpertise';
import RecruitmentHero from '../../components/client/recruitment/RecruitmentHero';
import RecruitmentOutcomes from '../../components/client/recruitment/RecruitmentOutcomes';
import RecruitmentProof from '../../components/client/recruitment/RecruitmentProof';
import RecruitmentStory from '../../components/client/recruitment/RecruitmentStory';
import { initEngagementTracking } from '../../lib/gtm';
import { useTranslation } from 'react-i18next';

export default function RecrutamentoPage() {
  const { t } = useTranslation();

  useEffect(() => initEngagementTracking('recrutamento'), []);

  return (
    <main className='overflow-hidden bg-brand-cream text-brand-ink'>
      <Navbar />
      <RecruitmentHero />
      <HomeClients title={t('recrutamento.clients.title')} />
      <RecruitmentOutcomes />
      <RecruitmentExpertise />
      <RecruitmentStory />
      <RecruitmentProof />
      <HomeFooter />
    </main>
  );
}
