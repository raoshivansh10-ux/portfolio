import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  isMobile?: boolean;
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({ isOpen, isMobile = false }) => {
  const spring = { type: 'spring', stiffness: 300, damping: 20 };

  const widthClass = isMobile ? 'w-[15px] h-[10px]' : 'w-[18px] h-[12px]';
  const barHeight = isMobile ? 'h-[1.2px]' : 'h-[1.5px]';

  return (
    <div className={`relative flex flex-col justify-between items-center ${widthClass}`}>
      {/* Top Bar */}
      <motion.span
        className={`absolute top-0 left-0 w-full ${barHeight} bg-white rounded-full origin-center`}
        animate={
          isOpen
            ? { y: isMobile ? 4.4 : 5.25, rotate: 45 }
            : { y: 0, rotate: 0 }
        }
        transition={spring}
      />
      {/* Middle Bar */}
      <motion.span
        className={`absolute top-1/2 -translate-y-1/2 left-0 w-full ${barHeight} bg-white rounded-full`}
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={spring}
      />
      {/* Bottom Bar */}
      <motion.span
        className={`absolute bottom-0 left-0 w-full ${barHeight} bg-white rounded-full origin-center`}
        animate={
          isOpen
            ? { y: isMobile ? -4.4 : -5.25, rotate: -45 }
            : { y: 0, rotate: 0 }
        }
        transition={spring}
      />
    </div>
  );
};
