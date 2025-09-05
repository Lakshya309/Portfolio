'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from '../styles/animatedStrips.module.css'; // Make sure the path is correct
import Image from 'next/image';

// Your existing logos are kept the same
import express from '../../public/images/logos/express.svg';
import figma from '../../public/images/logos/figma.svg';
import flask from '../../public/images/logos/flask.svg';
import framer from '../../public/images/logos/framer.svg';
import git from '../../public/images/logos/git.svg';
import mongodb from '../../public/images/logos/mongodb.svg';
import nextdotjs from '../../public/images/logos/nextdotjs.svg';
import nodedotjs from '../../public/images/logos/nodedotjs.svg';
import postgresql from '../../public/images/logos/postgresql.svg';
import python from '../../public/images/logos/python.svg';
import react from '../../public/images/logos/react.svg';
import tailwindcss from '../../public/images/logos/tailwindcss.svg';
import threedotjs from '../../public/images/logos/threedotjs.svg';

const logos = [
  express, figma, flask, framer, git, mongodb,
  nextdotjs, nodedotjs, postgresql, python, react,
  tailwindcss, threedotjs
];

const AnimatedStrips = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress (0 to 1) into horizontal movement
  // The first strip moves to the right (positive x)
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  // The second strip moves to the left (negative x)
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div ref={container} className={styles.slidingStripsContainer}>
      
      {/* First Slider */}
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {[...logos, ...logos].map((logo, index) => (
          <div key={`slider1-${index}`} className={styles.logoContainer}>
            <Image
              src={logo}
              alt={`logo-${index}`}
              className={styles.stripIcon}
              width={60}
              height={60}
            />
          </div>
        ))}
      </motion.div>

      {/* Second Slider */}
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {[...logos, ...logos].map((logo, index) => (
          <div key={`slider2-${index}`} className={styles.logoContainer}>
            <Image
              src={logo}
              alt={`logo-${index}`}
              className={styles.stripIcon}
              width={60}
              height={60}
            />
          </div>
        ))}
      </motion.div>

    </div>
  );
};

export default AnimatedStrips;