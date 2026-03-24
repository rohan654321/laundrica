// components/pricing/service-menu.tsx
'use client';

import { motion } from 'framer-motion';
import { Shirt, WashingMachine, Wind, Droplets } from 'lucide-react';

interface ServiceItem {
  name: string;
  washPress: number | string;
  dryClean: number | string;
  steamPress: number | string;
}

// Data extracted from PDF
const menClothing: ServiceItem[] = [
  { name: 'T-Shirts / Shirt', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Trousers / Pants / Jeans / Pajama', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Kandoora', washPress: 10, dryClean: 12, steamPress: 6 },
  { name: 'Ghatra', washPress: 8, dryClean: 10, steamPress: 6 },
  { name: 'Lungi', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Shorts', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Cap / Tie', washPress: 5, dryClean: 8, steamPress: 3 },
  { name: 'Jacket / Coat', washPress: 15, dryClean: 20, steamPress: 8 },
  { name: 'Leather Jacket', washPress: 25, dryClean: 35, steamPress: 'N/A' },
  { name: 'Waist Coat', washPress: 10, dryClean: 15, steamPress: 6 },
  { name: 'Suit (2-Piece)', washPress: 'N/A', dryClean: 25, steamPress: 12 },
  { name: 'Suit (3-Piece)', washPress: 'N/A', dryClean: 35, steamPress: 15 },
  { name: 'Inner Wear', washPress: 4, dryClean: 5, steamPress: 2 },
  { name: 'Pair of Socks', washPress: 4, dryClean: 5, steamPress: 2 },
  { name: 'Sweater / Pullover', washPress: 10, dryClean: 14, steamPress: 6 },
  { name: 'Handkerchief', washPress: 2, dryClean: 'N/A', steamPress: 1 },
];

const womenClothing: ServiceItem[] = [
  { name: 'T-Shirts / Shirt', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Trousers / Pants / Jeans / Pajama', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Abaya / Burqah', washPress: 10, dryClean: 14, steamPress: 8 },
  { name: 'Scarf / Dupatta', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Skirt / Shorts (S/L)', washPress: '6/8', dryClean: '8/10', steamPress: '4/6' },
  { name: 'Full Dress', washPress: 12, dryClean: 15, steamPress: 6 },
  { name: 'Salwar Kameez', washPress: 12, dryClean: 15, steamPress: 6 },
  { name: 'Blouse', washPress: 8, dryClean: 10, steamPress: 4 },
  { name: 'Coat / Jacket', washPress: 15, dryClean: 20, steamPress: 8 },
  { name: 'Suit (2-Piece)', washPress: 'N/A', dryClean: 25, steamPress: 12 },
  { name: 'Suit (3-Piece)', washPress: 'N/A', dryClean: 35, steamPress: 15 },
  { name: 'Sweater / Pullover', washPress: 10, dryClean: 14, steamPress: 6 },
  { name: 'Inner Wear', washPress: 4, dryClean: 5, steamPress: 2 },
  { name: 'Handkerchief', washPress: 2, dryClean: 'N/A', steamPress: 1 },
  { name: 'Saree', washPress: 12, dryClean: 16, steamPress: 6 },
];

const householdItems: ServiceItem[] = [
  { name: 'Police Dress / Uniform', washPress: 14, dryClean: 18, steamPress: 8 },
  { name: 'Bedsheet (Single)', washPress: 10, dryClean: 12, steamPress: 6 },
  { name: 'Bedsheet (Double)', washPress: 12, dryClean: 14, steamPress: 8 },
  { name: 'Duvet Cover (Single)', washPress: 10, dryClean: 12, steamPress: 6 },
  { name: 'Duvet Cover (Double)', washPress: 12, dryClean: 14, steamPress: 8 },
  { name: 'Duvet (Small)', washPress: 20, dryClean: 25, steamPress: 'N/A' },
  { name: 'Duvet (Medium)', washPress: 25, dryClean: 30, steamPress: 'N/A' },
  { name: 'Duvet (Large)', washPress: 30, dryClean: 35, steamPress: 'N/A' },
  { name: 'Pillow Case', washPress: 3, dryClean: 4, steamPress: 2 },
  { name: 'Pillow / Cushion', washPress: 15, dryClean: 20, steamPress: 'N/A' },
  { name: 'Bath Towel (Medium)', washPress: 4, dryClean: 5, steamPress: 'N/A' },
  { name: 'Bath Towel (Large)', washPress: 6, dryClean: 7, steamPress: 'N/A' },
  { name: 'Bath Robe', washPress: 15, dryClean: 'N/A', steamPress: 'N/A' },
  { name: 'Curtains (per sq m)', washPress: 'N/A', dryClean: '20/25', steamPress: 10 },
  { name: 'Pillow / Cushion Cover', washPress: 6, dryClean: 8, steamPress: 4 },
  { name: 'Blanket (Single/Double)', washPress: '25/35', dryClean: 'N/A', steamPress: 'N/A' },
];

const specialItems: ServiceItem[] = [
  { name: 'Wedding Dress', washPress: '50-80', dryClean: '80-100', steamPress: '30-45' },
  { name: 'Carpet (per sq ft)', washPress: 20, dryClean: 'N/A', steamPress: 'N/A' },
  { name: 'Premium Carpet (Silk/Wool)', washPress: 'Ask for Price', dryClean: 'N/A', steamPress: 'N/A' },
  { name: 'Prayer Mats', washPress: 15, dryClean: 'N/A', steamPress: 'N/A' },
  { name: 'Soft Toys', washPress: 'Ask for Price', dryClean: 'N/A', steamPress: 'N/A' },
  { name: 'Special Dress', washPress: 'Check Price', dryClean: 'N/A', steamPress: 'N/A' },
];

interface ServiceMenuProps {
  activeCategory: 'men' | 'women' | 'household' | 'other';
}

export function ServiceMenu({ activeCategory }: ServiceMenuProps) {
  const getData = () => {
    switch (activeCategory) {
      case 'men':
        return menClothing;
      case 'women':
        return womenClothing;
      case 'household':
        return householdItems;
      case 'other':
        return specialItems;
      default:
        return menClothing;
    }
  };

  const getTitle = () => {
    switch (activeCategory) {
      case 'men':
        return 'Men Clothing';
      case 'women':
        return 'Women Clothing';
      case 'household':
        return 'Household Items';
      case 'other':
        return 'Special Items & Garments';
      default:
        return 'Services';
    }
  };

  const getSubtitle = () => {
    switch (activeCategory) {
      case 'men':
        return 'Your goals come first — your wardrobe stays flawless with us.';
      case 'women':
        return 'You shine every day — we make sure your outfits do too.';
      case 'household':
        return 'You make the house a home — we keep every fabric in it fresh and perfect.';
      case 'other':
        return 'Every unique item has a story — we preserve its charm and freshness.';
      default:
        return '';
    }
  };

  const data = getData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      key={activeCategory}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mb-8 text-center">
        <p className="text-[#1f4f2b]/70 italic">{getSubtitle()}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#1f4f2b]/10 shadow-sm">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-[#1f4f2b] text-white">
              <th className="text-left py-4 px-6 font-semibold">Garment / Item</th>
              <th className="text-center py-4 px-4 font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <WashingMachine className="w-4 h-4" />
                  <span className="text-sm">Wash/Press</span>
                </div>
              </th>
              <th className="text-center py-4 px-4 font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">Dry Cleaning</span>
                </div>
              </th>
              <th className="text-center py-4 px-4 font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm">Steam Press</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <motion.tr
                key={item.name}
                variants={itemVariants}
                className={`border-b border-[#1f4f2b]/10 hover:bg-[#e8f3e6]/50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-[#f8faf6]'
                }`}
              >
                <td className="py-3 px-6 font-medium text-gray-800">{item.name}</td>
                <td className="py-3 px-4 text-center font-mono text-sm text-gray-700">
                  {typeof item.washPress === 'number' ? `AED ${item.washPress}` : item.washPress}
                </td>
                <td className="py-3 px-4 text-center font-mono text-sm text-gray-700">
                  {typeof item.dryClean === 'number' ? `AED ${item.dryClean}` : item.dryClean}
                </td>
                <td className="py-3 px-4 text-center font-mono text-sm text-gray-700">
                  {typeof item.steamPress === 'number' ? `AED ${item.steamPress}` : item.steamPress}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <i className="fas fa-info-circle mr-1"></i>
        Prices in AED. Final prices may vary based on garment condition and special handling needs.
      </div>
    </motion.div>
  );
}