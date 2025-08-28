import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingLogoProps {
  onClick: (element: HTMLElement) => void;
  className?: string;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({ onClick, className = '' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (logoRef.current) {
      onClick(logoRef.current);
    }
  };

  return (
    <motion.div
      ref={logoRef}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className={`
        w-16 h-16 bg-white rounded-2xl border border-gray-200 
        flex items-center justify-center cursor-pointer shadow-lg
        hover:border-gray-300 transition-all duration-300
        ${className}
      `}
    >
      <img 
        src="/images/smaller-logo-hd.png" 
        alt="Operalytix" 
        className="w-10 h-10 object-contain"
      />
    </motion.div>
  );
};

export default FloatingLogo;
