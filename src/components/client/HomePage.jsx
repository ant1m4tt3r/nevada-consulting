import HomeAbout from './home/HomeAbout';
import HomeCandidateServices from './home/HomeCandidateServices';
import HomeClients from './home/HomeClients';
import HomeContact from './home/HomeContact';
import HomeFooter from './home/HomeFooter';
import HomeFaq from './home/HomeFaq';
import HomeHero from './home/HomeHero';
import HomeMethod from './home/HomeMethod';
import HomeProof from './home/HomeProof';
import HomeServices from './home/HomeServices';
import HomeThesis from './home/HomeThesis';
import HomeValueBridge from './home/HomeValueBridge';
import Navbar from './Navbar';

export default function HomePage() {
  return (
    <main className='overflow-hidden bg-brand-cream text-brand-ink'>
      <Navbar />
      <HomeHero />
      <HomeClients />
      <HomeThesis />
      <HomeServices />
      <HomeValueBridge />
      <HomeMethod />
      <HomeAbout />
      <HomeProof />
      <HomeCandidateServices />
      <HomeFaq />
      <HomeContact />
      <HomeFooter />
    </main>
  );
}
