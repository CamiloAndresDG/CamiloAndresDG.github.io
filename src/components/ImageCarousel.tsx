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
  height = "h-48", 
  autoPlay = true,
  interval = 5000 
}: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isHovered && autoPlay && images.length > 0) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isHovered, autoPlay, interval, images.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div 
      className={`relative ${height} w-full overflow-hidden rounded-t-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentImage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <img
            src={images[currentImage].url}
            alt={images[currentImage].alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-medium">{images[currentImage].alt}</h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botones de navegación */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Indicadores de navegación */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentImage ? 1 : -1);
              setCurrentImage(index);
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentImage === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 