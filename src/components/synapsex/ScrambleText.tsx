import React, { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  isHovered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const framesPerChar = 4;
    const interval = setInterval(() => {
      const revealedCount = Math.floor(frame / framesPerChar);

      if (revealedCount >= text.length) {
        setDisplayText(text);
        clearInterval(interval);
        return;
      }

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      frame++;
    }, 25);

    return () => clearInterval(interval);
  }, [text, isHovered]);

  return <span className={className}>{displayText}</span>;
};
