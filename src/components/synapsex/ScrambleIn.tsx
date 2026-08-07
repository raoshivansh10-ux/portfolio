import React, { useEffect, useState } from 'react';

interface ScrambleInProps {
  text: string;
  delay?: number;
  triggered?: boolean;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay = 0,
  triggered = true,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!triggered) {
      setHasStarted(false);
      setDisplayText('');
      return;
    }

    const timer = setTimeout(() => {
      setHasStarted(true);
      let frame = 0;

      const interval = setInterval(() => {
        const revealCount = Math.floor(frame * 0.5);
        if (revealCount >= text.length) {
          setDisplayText(text);
          clearInterval(interval);
          return;
        }

        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            result += ' ';
          } else if (i < revealCount) {
            result += text[i];
          } else if (i < revealCount + 3) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            break;
          }
        }
        setDisplayText(result);
        frame++;
      }, 25);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, triggered]);

  if (!hasStarted) {
    return <span className={className}>&nbsp;</span>;
  }

  return <span className={className}>{displayText}</span>;
};
