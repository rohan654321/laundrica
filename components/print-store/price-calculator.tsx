'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface PricingOptions {
  productType: string;
  quantity: number;
  printType: string;
  colors: number;
  area: string;
}

export function PriceCalculator() {
  const [options, setOptions] = useState<PricingOptions>({
    productType: 'tshirt',
    quantity: 10,
    printType: 'digital',
    colors: 1,
    area: 'chest',
  });

  const basePrice: Record<string, number> = {
    tshirt: 299,
    hoodie: 599,
    polo: 449,
    jersey: 549,
  };

  const printTypePrice: Record<string, number> = {
    digital: 50,
    embroidery: 150,
    screen: 100,
  };

  const colorPrice: Record<number, number> = {
    1: 0,
    2: 50,
    3: 100,
    4: 150,
  };

  const areaPrice: Record<string, number> = {
    chest: 0,
    back: 100,
    sleeve: 75,
    full: 200,
  };

  // Calculate pricing
  const baseTotal = basePrice[options.productType] * options.quantity;
  const printCost = printTypePrice[options.printType] * options.quantity;
  const colorCost = colorPrice[options.colors] * (options.quantity > 50 ? 0.5 : 1);
  const areaCost = areaPrice[options.area] * options.quantity;

  const discountRate = options.quantity > 50 ? 0.1 : options.quantity > 20 ? 0.05 : 0;
  const subtotal = baseTotal + printCost + colorCost + areaCost;
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Product Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Product Type</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'tshirt', label: 'T-Shirt' },
              { id: 'hoodie', label: 'Hoodie' },
              { id: 'polo', label: 'Polo Shirt' },
              { id: 'jersey', label: 'Jersey' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOptions({ ...options, productType: item.id })}
                className={`p-3 rounded-xl font-medium transition-all border-2 ${
                  options.productType === item.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-foreground border-border hover:border-primary/50'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Quantity: {options.quantity}</label>
          <input
            type="range"
            min="1"
            max="500"
            value={options.quantity}
            onChange={(e) => setOptions({ ...options, quantity: parseInt(e.target.value) })}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-foreground/60 mt-2">
            <span>1</span>
            <span>250</span>
            <span>500</span>
          </div>
        </div>

        {/* Print Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Print Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'digital', label: 'Digital' },
              { id: 'screen', label: 'Screen' },
              { id: 'embroidery', label: 'Embroidery' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOptions({ ...options, printType: item.id })}
                className={`p-3 rounded-xl font-medium transition-all text-sm border-2 ${
                  options.printType === item.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-foreground border-border hover:border-primary/50'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Print Colors: {options.colors}</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOptions({ ...options, colors: num })}
                className={`p-3 rounded-lg font-medium transition-all border-2 text-sm ${
                  options.colors === num
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-foreground border-border hover:border-primary/50'
                }`}
              >
                {num}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Print Area */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Print Area</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'chest', label: 'Chest Only' },
              { id: 'back', label: 'Back Print' },
              { id: 'sleeve', label: 'Sleeve' },
              { id: 'full', label: 'Full Coverage' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOptions({ ...options, area: item.id })}
                className={`p-3 rounded-lg font-medium transition-all text-sm border-2 ${
                  options.area === item.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-foreground border-border hover:border-primary/50'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Price Breakdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col justify-center"
      >
        <div className="glassmorphism rounded-3xl p-8 border border-white/20 space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Price Breakdown</h3>

          {/* Breakdown Items */}
          <motion.div
            className="space-y-3 pb-6 border-b border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between text-foreground/80">
              <span>{options.quantity}x {basePrice[options.productType] === 299 ? 'T-Shirt' : options.productType}</span>
              <span>₹{baseTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>{options.printType} Printing</span>
              <span>₹{printCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>{options.colors} Colors</span>
              <span>₹{colorCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-foreground/80">
              <span>Print Area</span>
              <span>₹{areaCost.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Subtotal */}
          <motion.div
            className="flex justify-between text-lg font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </motion.div>

          {/* Discount */}
          {discount > 0 && (
            <motion.div
              className="flex justify-between text-lg font-semibold text-primary"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-2">
                Discount
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-normal">
                  {(discountRate * 100).toFixed(0)}% off
                </span>
              </span>
              <span>-₹{discount.toLocaleString()}</span>
            </motion.div>
          )}

          {/* Total */}
          <motion.div
            className="pt-6 border-t border-white/10 flex justify-between items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-2xl font-bold text-foreground">Total</span>
            <span className="text-4xl font-bold text-primary">₹{total.toLocaleString()}</span>
          </motion.div>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
            <Button className="w-full gap-2 rounded-full font-semibold py-6 text-lg">
              <ShoppingCart size={20} />
              Proceed to Checkout
            </Button>
          </motion.div>

          {/* Info */}
          {options.quantity > 20 && (
            <motion.p
              className="text-xs text-primary text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              ✓ Bulk discounts applied! Free shipping on orders over ₹5000
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
