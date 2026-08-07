import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  delay?: number;
  mode?: 'words' | 'chars' | 'lines';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  stagger = 0.03,
  delay = 0,
  mode = 'chars',
}) => {
  if (mode === 'chars') {
    const letters = text.split('');
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const letterVariants = {
      hidden: {
        opacity: 0,
        y: '100%',
        rotate: 6,
        filter: 'blur(8px)',
      },
      visible: {
        opacity: 1,
        y: '0%',
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Apple / Power4 ease
        },
      },
    };

    return (
      <Component className={`inline-block overflow-hidden ${className}`}>
        <motion.span
          className="inline-flex flex-wrap"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {letters.map((char, idx) => (
            <motion.span
              key={idx}
              variants={letterVariants}
              className="inline-block transform-gpu"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // Words mode
  const words = text.split(' ');
  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger * 2,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-flex flex-wrap gap-[0.25em]"
        variants={wordContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, idx) => (
          <motion.span key={idx} variants={wordVariants} className="inline-block transform-gpu">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
};
