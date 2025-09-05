'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.css';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Get the current time in Delhi, India
    const updateDelhiTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(`${timeString} IST`);
    };

    updateDelhiTime();
    const interval = setInterval(updateDelhiTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.footerGrid}>
        <div className={styles.timestamp}>
          <span>Delhi, India</span>
          <span>{currentTime}</span>
        </div>

        <div className={styles.cta}>
          <span className={styles.ctaSmall}>Have a project?</span>
          <a href="mailto:lakshya.tekwani0309@gmail.com" className={styles.ctaLarge}>
            Let's Talk
          </a>
        </div>

        <div className={styles.socials}>
          <a href="https://www.linkedin.com/in/lakshyatekwani" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {/* Add other social links here */}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;