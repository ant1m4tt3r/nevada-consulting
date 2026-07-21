'use client';

import HomeAbout from './home/HomeAbout';
import HomeCandidateServices from './home/HomeCandidateServices';
import HomeClients from './home/HomeClients';
import HomeContact from './home/HomeContact';
import HomeFooter from './home/HomeFooter';
import HomeFaq from './home/HomeFaq';
import HomeHero from './home/HomeHero';
import HomeMethod from './home/HomeMethod';
import HomeNavigation from './home/HomeNavigation';
import HomeProof from './home/HomeProof';
import HomeServices from './home/HomeServices';
import HomeStory from './home/HomeStory';
import HomeThesis from './home/HomeThesis';
import HomeValueBridge from './home/HomeValueBridge';

export default function HomePage() {
  return (
    <main className='overflow-hidden bg-brand-cream text-brand-ink'>
      <HomeNavigation />
      <HomeHero />
      <HomeClients />
      <HomeThesis />
      <HomeServices />
      <HomeValueBridge />
      <HomeMethod />
      <HomeAbout />
      <HomeStory />
      <HomeProof />
      <HomeCandidateServices />
      <HomeFaq />
      <HomeContact />
      <HomeFooter />
    </main>
  );
}
