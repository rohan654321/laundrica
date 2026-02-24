'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockServices, categories } from '@/lib/mock-data';
import { useCart } from '@/context/cart-context';
import { Star, ShoppingCart } from 'lucide-react';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredServices = mockServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (service: typeof mockServices[0]) => {
    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      quantity: 1,
      image: service.image,
      category: 'service'
    });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Our Services</h1>
          <p className="text-lg opacity-90">Choose from our comprehensive range of laundry services</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-background py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Search Services</label>
              <Input
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/70">No services found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-48 bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                      🧺
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
                      <div className="flex items-center gap-1 text-sm bg-accent/20 px-2 py-1 rounded">
                        <Star size={14} className="fill-accent text-accent" />
                        <span>4.8</span>
                      </div>
                    </div>

                    <p className="text-foreground/70 text-sm mb-4">{service.description}</p>

                    {/* Details */}
                    <div className="bg-muted/50 rounded p-3 mb-4 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground/70">Duration:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Category:</span>
                        <span className="font-medium capitalize">{service.category.replace('-', ' ')}</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">Starting at</p>
                        <p className="text-3xl font-bold text-primary">₹{service.price}</p>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(service)}
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
