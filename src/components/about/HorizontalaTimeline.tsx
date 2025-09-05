'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/about/HorizontalTimeline.module.css';
import '../../../public/images/hey.jpg'


gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '2020',
    title: 'The Foundation',
    description: "Scoring 94% in my CBSE exams wasn't just about grades; it was about building a disciplined foundation for the complex problems I was eager to solve.",
    imageSrc: '/public/images/hey.jpg',
  },
  {
    year: '2022',
    title: 'Choosing the Path',
    description: "With a solid 93.2%, I honed my focus towards a future in tech, setting my sights on the intersection of data, code, and human experience.",
    imageSrc: '/public/images/hey.jpg',
  },
  {
    year: '2022-Present',
    title: 'Entering the Arena',
    description: "Diving into a B.Tech in Artificial Intelligence & Data Science. This is where theory met practice, and my passion for building intelligent systems truly ignited.",
    imageSrc: '/images/hey.jpg',
  },
  {
    year: 'JULY 2024',
    title: 'Beyond the Screen',
    description: "My first foray into immersive realities at IIT Delhi. I explored the core concepts of AR/VR, sparking an interest in creating experiences that blend the digital and physical worlds.",
    imageSrc: '/images/hey.jpg',
  },
  {
    year: 'PRESENT',
    title: 'Building with Purpose',
    description: "Developing 'CognitQuotient', a full-stack assessment app. This project is a culmination of my skills—using Python for the backend, React Native for the app, and data science to provide users with deep, meaningful insights.",
    imageSrc: '/images/hey.jpg',
  },
  {
    year: 'FUTURE',
    title: 'Chapter Unwritten...',
    description: "The timeline is still rendering. Got an exciting plot point to add?",
    imageSrc: '/images/hey.jpg',
  },
];

const CinematicTimeline = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const component = componentRef.current;
    const track = trackRef.current;
    const svgPath = svgPathRef.current;
    if (!component || !track || !svgPath) return;

    const ctx = gsap.context(() => {
      const amountToScroll = track.offsetWidth - window.innerWidth;

      // Master timeline for entry, horizontal scroll, and exit
      const masterTl = gsap.timeline();
      
      ScrollTrigger.create({
        trigger: component,
        start: 'top top',
        end: `+=${amountToScroll + window.innerHeight * 2}`, // Add space for entry/exit
        pin: true,
        animation: masterTl,
        scrub: 1,
      });

      // --- 1. Entry Animation ---
      masterTl.from(component, {
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out',
      });

      // --- 2. Horizontal Scroll Animation ---
      masterTl.to(track, {
        x: -amountToScroll,
        ease: 'none',
      });

      // --- 3. Exit Animation ---
      masterTl.to(component, {
        scale: 0.8,
        opacity: 0,
        ease: 'power2.in',
      });

      // --- SVG Line and Section Animations ---
      const pathLength = svgPath.getTotalLength();
      svgPath.style.strokeDasharray = `${pathLength}`;
      svgPath.style.strokeDashoffset = `${pathLength}`;
      
      const horizontalScrollTween = masterTl.getTweensOf(track)[0];

      gsap.to(svgPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: `+=${amountToScroll}`,
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('.timeline-section').forEach((section) => {
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'left 70%',
            end: 'center center',
            containerAnimation: horizontalScrollTween,
            scrub: true,
          },
        });
        sectionTl
          .from(section.querySelector('.timeline-content'), { y: 100, opacity: 0, ease: 'power2.out' })
          .from(section.querySelector('.image-mask'), { clipPath: 'circle(0% at 50% 50%)', ease: 'power2.inOut' }, 0)
          .from(section.querySelector('.timeline-image'), { scale: 1.4, ease: 'power2.out' }, 0);
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.timelineContainer} ref={componentRef}>
      <svg className={styles.timelineSvg} viewBox={`0 0 ${timelineData.length * 400} 100`} preserveAspectRatio="none">
        <path ref={svgPathRef} className={styles.timelinePath} d={`M 0 50 L ${timelineData.length * 400} 50`} fill="none" />
      </svg>
      <div className={styles.timelineTrack} ref={trackRef}>
        {timelineData.map((item, index) => (
          <section key={index} className={`${styles.timelineSection} timeline-section`}>
            <div className={styles.timelineMarker}></div>
            <div className={`${styles.timelineContent} timeline-content`}>
              <span className={styles.year}>{item.year}</span>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
            </div>
            <div className={`${styles.imageContainer} image-container`}>
              <div className={`${styles.imageMask} image-mask`}>
                <Image src={item.imageSrc} alt={item.title} width={800} height={800} className={`${styles.timelineImage} timeline-image`} priority={index < 2} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CinematicTimeline;
