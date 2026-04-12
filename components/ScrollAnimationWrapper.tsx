'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollAnimationWrapper({ children, className = "" }: ScrollAnimationWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? targetRef : undefined,
    offset: ["start start", "start 0.3"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div ref={targetRef} className={className}>{children}</div>;
  }

  return (
    <div ref={targetRef} className={className}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}