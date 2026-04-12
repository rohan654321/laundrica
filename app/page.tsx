import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { MembershipPlans } from '@/components/home/membership-plans';
import { Testimonials } from '@/components/home/testimonials';
import { CTASection } from '@/components/home/cta-section';
import ServicesSlider from '@/components/home/ServicesSlider';
import { ServicesPricing } from '@/components/home/services-grid';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSlider />
      <HowItWorks />
      {/* <ServicesPricing/> */}
       {/* This is the slider component we created */}
      {/* Remove ServicesGrid since we're using ServicesSlider */}
      <WhyChooseUs />
      {/* <MembershipPlans /> */}
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}