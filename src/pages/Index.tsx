import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import SignatureDishes from '@/components/Home/SignatureDishes';
import ChiMaekSection from '@/components/Home/ChiMaekSection';
import VeganSeoulSection from '@/components/Home/VeganSeoulSection';
import CallToActionBar from '@/components/Home/CallToActionBar';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SignatureDishes />
      <ChiMaekSection />
      <VeganSeoulSection />
      <CallToActionBar />
    </Layout>
  );
};

export default Index;
