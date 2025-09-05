'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  onComplete?: () => void;
}

export default function DecryptedTextSection({ text, onComplete }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

  const decryptText = () => {
    if (!textRef.current) return;
    const original = text.split('');
    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      const newText = original.map((char, i) => {
        if (char === ' ') return ' ';
        if (iterations >= maxIterations) return char;
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');

      setDisplayText(newText);
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        onComplete?.(); // 🔥 call onComplete
      }
    }, 50);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (!isAnimating) {
              setIsAnimating(true);
              decryptText();
            }
          }
        }
      }
    );
  }, [isAnimating]);

  return (
    <div ref={sectionRef} className="decrypted-text-section">
      <h2 className="decrypted-heading">
        <span ref={textRef}>{displayText}</span>
      </h2>
    </div>
  );
}
