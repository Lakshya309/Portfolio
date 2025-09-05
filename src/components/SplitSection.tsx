'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/splitsection.css';

gsap.registerPlugin(ScrollTrigger);

export default function SplitSection({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let triggered = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (!triggered) {
            gsap.fromTo(
              leftRef.current,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
            );
            gsap.fromTo(
              rightRef.current,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 1.4, delay: 0.3, ease: 'power3.out' }
            );

            // Decrypt effect
            let iterations = 0;
            const original = title;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
            const interval = setInterval(() => {
              const scrambled = original
                .split('')
                .map((char, i) => {
                  if (char === ' ') return ' ';
                  if (iterations >= 8) return char;
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
              setDisplayText(scrambled);
              iterations++;
              if (iterations > 8) {
                clearInterval(interval);
                setDisplayText(original);
              }
            }, 60);

            triggered = true;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <section className="split-section" ref={sectionRef}>
      <div className="split-left" ref={leftRef}>
        <h2 className="decrypted-heading">{displayText}</h2>
      </div>
      <div className="split-right" ref={rightRef}>
        {content}
      </div>
    </section>
  );
}
