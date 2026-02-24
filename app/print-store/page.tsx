'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProductCard } from '@/components/print-store/product-card';
import { PriceCalculator } from '@/components/print-store/price-calculator';
import { Sparkles, Shirt, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 1,
    name: 'Custom T-Shirt',
    category: 'apparel',
    basePrice: 299,
    image: '👕',
    colors: ['White', 'Black', 'Navy', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium cotton t-shirt perfect for personal or promotional use',
    features: ['100% Cotton', 'High-Quality Print', 'Comfortable Fit', 'UV Protection'],
  },
  {
    id: 2,
    name: 'Custom Hoodie',
    category: 'apparel',
    basePrice: 599,
    image: '🧥',
    colors: ['Black', 'Gray', 'Navy', 'Green', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Cozy and stylish hoodie with custom design printing',
    features: ['80% Cotton, 20% Polyester', 'Large Print Area', 'Drawstring Hoodie', 'Durable'],
  },
  {
    id: 3,
    name: 'Corporate Uniform Polo',
    category: 'uniform',
    basePrice: 449,
    image: '👔',
    colors: ['Navy', 'White', 'Black', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Professional polo shirt for corporate branding and team uniforms',
    features: ['Stain-Resistant', 'Breathable Fabric', 'Logo Embroidery', 'Professional Look'],
  },
  {
    id: 4,
    name: 'Custom Tote Bag',
    category: 'accessories',
    basePrice: 199,
    image: '🛍️',
    colors: ['White', 'Black', 'Navy', 'Green'],
    sizes: ['One Size'],
    description: 'Durable canvas tote bag with custom design',
    features: ['Canvas Material', 'Large Capacity', 'Long Handles', 'Eco-Friendly'],
  },
  {
    id: 5,
    name: 'Team Jersey',
    category: 'uniform',
    basePrice: 549,
    image: '🏃',
    colors: ['Navy', 'Red', 'White', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Lightweight breathable jersey for sports teams',
    features: ['Moisture-Wicking', 'Breathable', 'Number & Name Printing', 'Quick-Dry'],
  },
  {
    id: 6,
    name: 'Sweatshirt',
    category: 'apparel',
    basePrice: 499,
    image: '🎽',
    colors: ['Gray', 'Black', 'Navy', 'Charcoal', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Warm and comfortable sweatshirt with custom print',
    features: ['Brushed Fleece', 'Large Print Area', 'Ribbed Cuffs', 'Premium Quality'],
  },
];

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'uniform', label: 'Corporate Uniforms' },
  { id: 'accessories', label: 'Accessories' },
];

export default function PrintStorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />

        <motion.div
          className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-primary">Custom Print Services</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Perfect Print</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Custom t-shirts, hoodies, uniforms, and more with your unique design. Professional printing with fast turnaround.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Filters and Sort */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Our Collections</h2>
                <p className="text-foreground/60">Choose from our premium printing products</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-foreground/50" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Price Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-16 border-t border-border"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-2">Price Calculator</h2>
                <p className="text-foreground/60">Estimate your printing costs instantly</p>
              </div>
              <PriceCalculator />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
