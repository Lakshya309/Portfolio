'use client';

import { useEffect, useRef, useState } from 'react';
import ShaderCanvas from './shaderCanvas';
import '../styles/HeroSection.css';
import gsap from 'gsap';
import SplitType from 'split-type';
import HeaderLogo from './HeaderLogo';

const phrases = [
  "Hey, I'm Lakshya Tekwani",
  'Frontend Enthusiast',
  'Full Stack Developer',
  'Android Developer',
];

export default function HeroSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    animateText(index);
  }, []);

  const animateText = (i: number) => {
  if (!textRef.current) return;

  const split = new SplitType(textRef.current, { types: 'chars' });

  // 👇 Clean up previous splits before setting new text
  split.revert();

  // Set the new phrase
  textRef.current.innerText = phrases[i];

  // Split again after updating text
  const newSplit = new SplitType(textRef.current, { types: 'chars' });
  const chars = newSplit.chars;

  gsap.fromTo(
    chars,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1.6,
      ease: 'power4.out',
      onComplete: () => {
        setTimeout(() => {
          const nextIndex = (i + 1) % phrases.length;
          setIndex(nextIndex);
          animateText(nextIndex);
        }, 1500);
      },
    }
  );
};


  return (
    <div className="hero-section" style={{backgroundColor: '#000', height: '100vh' }}>
      <ShaderCanvas />
      <div className="bottom-gradient" />

      <div className="hero-text-wrapper">
        <p ref={textRef} className="our-text" style={{mixBlendMode: 'difference'}} />
      </div>
    </div>
  ); 
}
