'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/parallaxSection.module.css';

interface ParallaxSectionProps {
  title: string;
  subtitle: string;
  background: string; // example: '/images/1.jpg'
}

export default function ParallaxSection({ title, subtitle, background }: ParallaxSectionProps) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={containerRef} className={styles.parallaxSection}>
      <div className={styles.contentWrapper}>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.imageWrapper}>
        <motion.div style={{ y }} className={styles.motionWrapper}>
          <Image src={background} loading='lazy' alt="Background" fill className={styles.image} />
        </motion.div>
      </div>
    </div>
  );
}
