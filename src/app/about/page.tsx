'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LettersScrollScene from "@/components/about/LetterScrollScene";
import BlurText from "@/components/about/BlurText";
import CinematicTimeline from '@/components/about/HorizontalaTimeline';
import "@/styles/about/about.css";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);

  // This function will be called when the hero text animation completes
  const animateIdentity = () => {
    if (identityRef.current) {
      gsap.to(identityRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    // Set the initial state for the identity section (hidden)
    gsap.set(identityRef.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      // Animation for the redesigned "About" section
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1,
        },
      });
      aboutTl
        .from(aboutSectionRef.current?.querySelectorAll('.about-heading, .about-story-text'), {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: 'power2.out',
        })
        .to(aboutSectionRef.current?.querySelector('.about-profile-pic'), {
          y: '20%',
          ease: 'none',
        }, 0);

      // Animation for the "Contact" section
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      contactTl.from(contactSectionRef.current?.querySelectorAll('.animate-in'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* --- Hero Section --- */}
      <div className="hero-section">
        {/* The 3D letters canvas in the background */}
        <LettersScrollScene />

        {/* The text overlay on top */}
        <div className="hero-overlay">
          <div className="hero-left">
            <div className="hero-heading-block">
              <BlurText
                text="from IDEAS to IMPACT"
                className="hero-tagline"
                animateBy="words"
                delay={80}
              />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                <BlurText
                  text="I build"
                  className="hero-tagline hero-tagline-secondary"
                  animateBy="words"
                  delay={100}
                />
                <BlurText
                  text="EXPERIENCES."
                  className="hero-tagline chunky"
                  animateBy="words"
                  delay={120}
                  onAnimationComplete={animateIdentity} // Trigger identity animation
                />
              </div>
            </div>
            <div className="identity-row" ref={identityRef}>
              <p className="hero-subtext">( WHO I AM )</p>
              <p className="hero-desc">
                Passionate about crafting digital experiences with precision and emotion.
                From interaction design to performance, I obsess over the details that matter.
                <br /><br />
                Built in pixels. Driven by purpose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Redesigned About Section --- */}
      <section className="about-section" ref={aboutSectionRef}>
        <div className="about-text-content">
          <h2 className="about-heading">My Journey :</h2>
          <p className="about-story-text">
            From designing pixels to building immersive interfaces, I’ve always
            believed in the magic of web experiences.{' '}
            <span className="about-highlight">Every scroll</span>,
            <span className="about-highlight"> every interaction</span>—intentional and personal.
          </p>
        </div>
        <div className="about-photo-wrapper">
          <Image
            src="/images/this.jpg"
            alt="My Photo"
            className="about-profile-pic"
            width={800}
            height={1200}
          />
        </div>
      </section>

      {/* --- Cinematic Timeline Section --- */}

        <CinematicTimeline />
    

      {/* --- Contact Section --- */}
      <section className="contact-section" ref={contactSectionRef}>
        <h2 className="contact-heading animate-in">Let's Create Together</h2>
        <p className="contact-subheading animate-in">
          Have an idea? A question? Or just want to talk tech? My inbox is always open.
        </p>
        <a href="mailto:lakshya.tekwani0309@gmail.com" className="contact-button animate-in">
          Get in Touch
        </a>
      </section>
    </div>
  );
};

export default Page;