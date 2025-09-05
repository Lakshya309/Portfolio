'use client';

import { useRef, useState } from 'react';
import '../styles/homepage.css';
import HeroSection from '@/components/HeroSection';
import SplitSection from '@/components/SplitSection';
import MarqueeStrip from '@/components/animations/MarqueeStrip';
import ParallaxSection from '@/components/ParallelSection';
import TechStackSection from '@/components/TechStackSection';
import AnimatedStrips from '@/components/AnimatedStrip';

export default function HomePage() {
  const splitSections = [
    {
      title: 'Design Made with Compassion',
      content: (
        <p>
          I blend aesthetics with functionality, translating emotions into code. Every detail matters.
        </p>
      ),
    },
    {
      title: 'Deliver with Intent',
      content: (
        <p>
          Each project is a narrative — and I tell it with performance, animation, and personality.
        </p>
      ),
    },
    {
      title: 'Play with Curiosity',
      content: (
        <p>
          From shaders to fluid simulations, I explore the edges of creative technology. Play fuels innovation.
        </p>
      ),
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      

      {/* All SplitSections */}
      {splitSections.map((section, index) => (
        <SplitSection
          key={index}
          title={section.title}
          content={section.content}
        />
      ))}
      <MarqueeStrip />
      <ParallaxSection
        title="Scrolls With Soul"
        subtitle="Visuals that move as you do"
        background="/images/bgscroll.png"
      />

      <AnimatedStrips/>

      <TechStackSection/>

      <section style={{ height: '100vh' }}></section>

    </div>
  );
}



