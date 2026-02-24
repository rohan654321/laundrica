'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const features = [
  { category: 'Service', name: 'Weekly Pickup & Delivery', basic: true, premium: true, elite: true },
  { category: 'Service', name: 'Twice Weekly Pickup & Delivery', basic: false, premium: true, elite: true },
  { category: 'Service', name: 'Daily Pickup & Delivery', basic: false, premium: false, elite: true },
  { category: 'Service', name: 'Express 24h Service', basic: false, premium: true, elite: true },
  { category: 'Service', name: 'Same-Day Express', basic: false, premium: false, elite: true },
  
  { category: 'Washing', name: 'Standard Wash & Fold', basic: true, premium: true, elite: true },
  { category: 'Washing', name: 'Dry Cleaning', basic: false, premium: true, elite: true },
  { category: 'Washing', name: 'Premium Ironing', basic: false, premium: false, elite: true },
  { category: 'Washing', name: 'Fabric Conditioning', basic: false, premium: true, elite: true },
  { category: 'Washing', name: 'Whitening & Special Treatments', basic: false, premium: false, elite: true },
  
  { category: 'Support', name: 'Email Support', basic: true, premium: true, elite: true },
  { category: 'Support', name: 'Priority Support', basic: false, premium: true, elite: true },
  { category: 'Support', name: '24/7 Priority Support', basic: false, premium: false, elite: true },
  { category: 'Support', name: 'Dedicated Account Manager', basic: false, premium: false, elite: true },
  
  { category: 'Extras', name: 'Free Stain Removal', basic: true, premium: true, elite: true },
  { category: 'Extras', name: 'SMS Notifications', basic: false, premium: true, elite: true },
  { category: 'Extras', name: 'Wardrobe Management', basic: false, premium: false, elite: true },
  { category: 'Extras', name: 'Free Alterations', basic: false, premium: false, elite: true },
];

const categories = ['Service', 'Washing', 'Support', 'Extras'];

export function FeatureComparison() {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="overflow-x-auto"
      variants={tableVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
            <th className="text-center py-4 px-6 font-semibold text-foreground">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-sm">Basic</span>
              </div>
            </th>
            <th className="text-center py-4 px-6 font-semibold text-foreground">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center ring-2 ring-primary/50"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-primary-foreground text-xs font-bold">P</span>
                </motion.div>
                <span className="text-sm">Premium</span>
              </div>
            </th>
            <th className="text-center py-4 px-6 font-semibold text-foreground">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <span className="text-sm">Elite</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, categoryIndex) => {
            const categoryFeatures = features.filter(f => f.category === category);
            return (
              <motion.tbody key={category} variants={tableVariants}>
                {categoryIndex > 0 && (
                  <tr>
                    <td colSpan={4} className="h-6" />
                  </tr>
                )}
                <tr>
                  <td colSpan={4} className="py-3 px-6 bg-primary/5 rounded-lg mb-2">
                    <p className="text-sm font-bold text-primary uppercase tracking-wide">{category}</p>
                  </td>
                </tr>
                {categoryFeatures.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    variants={rowVariants}
                    className="border-b border-border/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-foreground text-sm">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {feature.basic ? (
                        <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                          <Check className="w-5 h-5 text-primary" />
                        </motion.div>
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.premium ? (
                        <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                          <Check className="w-5 h-5 text-primary" />
                        </motion.div>
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.elite ? (
                        <motion.div whileHover={{ scale: 1.2 }} className="flex justify-center">
                          <Check className="w-5 h-5 text-primary" />
                        </motion.div>
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
