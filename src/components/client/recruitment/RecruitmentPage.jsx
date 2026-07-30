import EngagementTracker from '../EngagementTracker';
import HomeAbout from '../home/HomeAbout';
import HomeClients from '../home/HomeClients';
import HomeContact from '../home/HomeContact';
import HomeFooter from '../home/HomeFooter';
import HomeMethod from '../home/HomeMethod';
import Navbar from '../Navbar';
import RecruitmentExpertise from './RecruitmentExpertise';
import RecruitmentHero from './RecruitmentHero';
import RecruitmentOutcomes from './RecruitmentOutcomes';
import RecruitmentProof from './RecruitmentProof';

export default function RecruitmentPage() {
  return (
    <main className='overflow-hidden bg-brand-cream text-brand-ink'>
      <EngagementTracker page='recrutamento' />
      <Navbar />
      <RecruitmentHero />
      <HomeClients translationKey='recrutamento.clients.title' />
      <RecruitmentOutcomes />
      <RecruitmentExpertise />
      <HomeMethod id='processo' translationKey='recrutamento.metodo' />
      <HomeAbout />
      <RecruitmentProof />
      <HomeContact />
      <HomeFooter />
    </main>
  );
}
