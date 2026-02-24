'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Upload, Heart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { DesignUploadModal } from './design-upload-modal';

interface Product {
  id: number;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: `${product.name} - ${selectedColor}`,
      price: product.basePrice,
      quantity: quantity,
      category: 'print-store',
      image: product.image,
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group rounded-3xl overflow-hidden glassmorphism border border-white/20 hover:border-primary/40 transition-all duration-300"
      >
        {/* Product Image */}
        <div className="relative h-64 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden">
          <motion.div
            className="text-8xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {product.image}
          </motion.div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isFavorite ? 'fill-primary text-primary' : 'text-white'
              }`}
            />
          </motion.button>

          {/* Upload Design Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsUploadOpen(true)}
            className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-black/40 backdrop-blur-md rounded-full">
              <Upload size={24} className="text-white" />
              <span className="text-xs font-medium text-white">Upload Design</span>
            </div>
          </motion.button>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-foreground/60 mb-4">{product.description}</p>

          {/* Price */}
          <div className="mb-4">
            <span className="text-3xl font-bold text-primary">₹{product.basePrice}</span>
            <span className="text-sm text-foreground/50 ml-2">+ custom print</span>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Color</label>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedColor === color
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 rounded-lg bg-muted text-foreground hover:bg-muted/80"
              >
                -
              </button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 rounded-lg bg-muted text-foreground hover:bg-muted/80"
              >
                +
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <ul className="space-y-1">
              {product.features.map((feature, idx) => (
                <li key={idx} className="text-xs text-foreground/70 flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleAddToCart}
              className="w-full gap-2 rounded-full font-semibold"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Design Upload Modal */}
      <DesignUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        productName={product.name}
      />
    </>
  );
}
