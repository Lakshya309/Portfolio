'use client';

import '../../styles/marquee.css';

export default function MarqueeStrip() {
const messages = [
'PORTFOLIO BY LAKSHYA TEKWANI',
'FRONTEND • SHADER DEV • 3D INTERACTION',
'BASED IN CODE. ROOTED IN DESIGN.',
'NEXT.JS • THREE.JS • GSAP • GLSL',
];


  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="marquee-segment">
            {messages.map((msg, idx) => (
              <span key={idx} className="marquee-item">
                {msg}
                <span className="marquee-divider">♦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
