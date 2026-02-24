import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Zap, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About Laundrica</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            We're revolutionizing the laundry industry with professional, reliable, and convenient services for busy professionals and families.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Laundrica is dedicated to providing exceptional laundry services that save our customers time and give them peace of mind. We believe in quality, reliability, and customer satisfaction above all else.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                With every order, we're committed to delivering excellence and building long-lasting relationships with our customers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Quality', desc: 'Expert care' },
                { icon: '⚡', title: 'Speed', desc: 'Fast delivery' },
                { icon: '💚', title: 'Care', desc: 'Customer focus' },
                { icon: '✨', title: 'Excellence', desc: 'Always' },
              ].map((value, i) => (
                <div key={i} className="bg-card border border-border p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">{value.icon}</div>
                  <p className="font-semibold">{value.title}</p>
                  <p className="text-sm text-foreground/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Customer First',
                description: 'Your satisfaction is our top priority. We go above and beyond for our customers.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Fast & Reliable',
                description: 'Express service options available. Always on time, every time.',
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Professional Team',
                description: 'Trained experts handling your precious garments with care.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card border border-border p-8 rounded-lg text-center">
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '50K+', label: 'Orders Completed' },
              { value: '99%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'Customer Support' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Thousands of Satisfied Customers</h2>
          <p className="text-lg mb-8 opacity-90">
            Experience the Laundrica difference today
          </p>
          <Link href="/services">
            <Button size="lg" variant="secondary" className="flex items-center gap-2 mx-auto">
              Browse Services
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
