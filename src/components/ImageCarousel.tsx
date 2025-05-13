import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  url: string;
  alt: string;
  description?: string;
}

interface ImageCarouselProps {
  images: Image[];
  height?: string;
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageCarousel({ 
  images, 
  height = "h-40",
  autoPlay = true,
  interval = 5000 
}: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered && autoPlay && images.length > 0) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isHovered, autoPlay, interval, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div 
      className={`relative ${height} w-full overflow-hidden rounded-t-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentImage].url}
            alt={images[currentImage].alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-base font-medium">{images[currentImage].alt}</h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de navegación */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentImage === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 