import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  imageUrl: string;
  name: string;
  role: string;
  className?: string;
}

function ProfileCard({ imageUrl, name, role, className = '' }: ProfileCardProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-64 h-80 mx-auto">
        {/* Background gradient - Light mode: gray to black, Dark mode: darker grays */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-800 to-black dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main card with image as background */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
          {/* Background image that fills the entire card */}
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative elements - Light mode: gray to black, Dark mode: darker grays */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 rounded-full opacity-60 z-20"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-br from-gray-700 to-black dark:from-gray-800 dark:to-black rounded-full opacity-60 z-20"></div>
          <div className="absolute top-1/2 -left-2 w-2 h-2 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-900 dark:to-gray-700 rounded-full opacity-60 z-20"></div>
          <div className="absolute top-1/3 -right-2 w-2 h-2 bg-gradient-to-br from-black to-gray-700 dark:from-black dark:to-gray-800 rounded-full opacity-60 z-20"></div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCard; 