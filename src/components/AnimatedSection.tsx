import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px 0px",
    amount: 0.3
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1] // Curva de aceleración suave
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 