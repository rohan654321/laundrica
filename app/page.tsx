import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { ServicesGrid } from '@/components/home/services-grid';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { MembershipPlans } from '@/components/home/membership-plans';
import { Testimonials } from '@/components/home/testimonials';
import { CTASection } from '@/components/home/cta-section';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <ServicesGrid />
      <WhyChooseUs />
      <MembershipPlans />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
