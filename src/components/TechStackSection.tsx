'use client';
import { motion } from 'framer-motion';
import '../styles/TechStackSection.css';

const stack = {
  Frontend: ['React', 'Next.js', 'Three.js', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB', 'Firebase'],
  Tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Vercel', 'Lenis']
};

export default function TechStackSection() {
  return (
    <section className="tech-stack-section">
      {Object.entries(stack).map(([category, items]) => (
        <div key={category} className="stack-column">
          <h3 className="stack-title">{category}</h3>
          <div className="stack-tags">
            {items.map((tech, idx) => (
              <motion.div
                key={tech}
                className="stack-tag"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
