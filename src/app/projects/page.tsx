'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// --- Components for the new section ---
import HoverProject from '@/components/project/HoverProject'
import HoverModal from '@/components/project/HoverModal';
import styles from '@/styles/project/projectpage.module.css';

// Dynamically import ProjectGallery without SSR
const ProjectGallery = dynamic(() => import('@/components/ProjectGallery'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh', background: '#fffafa' }}>Loading gallery...</div>,
});

// --- Data for the new section ---
const projects = [
  {
    title: "C2 Montreal",
    src: "c2montreal.png",
    color: "#000000"
  },
  {
    title: "Office Studio",
    src: "officestudio.png",
    color: "#8C8C8C"
  },
  {
    title: "Locomotive",
    src: "locomotive.png",
    color: "#EFE8D3"
  },
  {
    title: "Silencio",
    src: "silencio.png",
    color: "#706D63"
  }
];

const ProjectsPage = () => {
  const [isClient, setIsClient] = useState(false);
  
  // --- State for the hover project list ---
  const [modal, setModal] = useState({ active: false, index: 0 });

  useEffect(() => {
    // Set client flag to prevent WebGL from running on server
    setIsClient(true);

    // Optional: Add custom class to prevent flash of unstyled fonts
    document.documentElement.classList.add('fonts-loaded');
  }, []);

  if (!isClient) return null;

  return (
    // You can use a fragment <> or a single root div
    <>
      <div style={{ background: '#fffafa' }}>
        <div className="project-gallery-wrapper">
          <ProjectGallery />
        </div>
      </div>

      {/* ================================================= */}
      {/* ====== NEW HOVER PROJECTS SECTION STARTS HERE ====== */}
      {/* ================================================= */}
      <main className={styles.main}>
        <div className={styles.body}>
          {
            projects.map((project, index) => {
              return <HoverProject 
                        index={index} 
                        title={project.title} 
                        setModal={setModal} 
                        key={index} 
                     />
            })
          }
        </div>
        <HoverModal modal={modal} projects={projects} />
      </main>
    </>
  );
};

export default ProjectsPage;