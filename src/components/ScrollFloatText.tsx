import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFloatTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

function ScrollFloatText({ 
  children, 
  className = '', 
  speed = 0.5, 
  direction = 'up' 
}: ScrollFloatTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateElementPosition = () => {
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setElementHeight(rect.height);
    };

    updateElementPosition();
    window.addEventListener('resize', updateElementPosition);

    return () => window.removeEventListener('resize', updateElementPosition);
  }, []);

  const y = useTransform(
    scrollY,
    [elementTop - window.innerHeight, elementTop + elementHeight],
    direction === 'up' ? [100, -100] : [-100, 100]
  );

  const opacity = useTransform(
    scrollY,
    [elementTop - window.innerHeight, elementTop, elementTop + elementHeight, elementTop + elementHeight + window.innerHeight],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollFloatText; 