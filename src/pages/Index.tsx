import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import SignatureDishes from '@/components/Home/SignatureDishes';
import CallToActionBar from '@/components/Home/CallToActionBar';
import SimpleMobileNav from '@/components/SimpleMobileNav';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SignatureDishes />
      <CallToActionBar />
      <SimpleMobileNav />
    </Layout>
  );
};

export default Index;
