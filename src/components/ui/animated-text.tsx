'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 -translate-x-[1px] translate-y-[1px] text-cyan-400 opacity-30 animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

interface DropInTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function DropInText({ text, className, delay = 0, speed = 80 }: DropInTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars(prev => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span className={cn("inline-block", className)}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500",
            index < visibleChars 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-10"
          )}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({ text, speed = 50, delay = 0, className, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(startTyping, speed);
      } else {
        onComplete?.();
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
      clearInterval(cursorInterval);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className={cn("inline-block w-[3px] h-[1em] ml-1 bg-cyan-400 align-middle", showCursor ? "opacity-100" : "opacity-0")} />
    </span>
  );
}

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span 
      className={cn(
        "relative inline-block bg-gradient-to-r from-cyan-400 via-teal-200 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}

interface PulseTextProps {
  children: React.ReactNode;
  className?: string;
}

export function PulseText({ children, className }: PulseTextProps) {
  return (
    <span className={cn("animate-pulse-glow", className)}>
      {children}
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
}

export function ScrambleText({ text, className, scrambleDuration = 1500 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, scrambleDuration / maxIterations);

    return () => clearInterval(interval);
  }, [text, scrambleDuration]);

  return <span className={cn("font-mono", className)}>{displayText}</span>;
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2000, prefix = '', suffix = '', className }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span className={className}>{prefix}{count}{suffix}</span>;
}
