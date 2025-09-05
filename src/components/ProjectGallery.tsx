
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import vertex1 from './shaders/projectvertex.glsl';
import fragment1 from './shaders/projectfragment.glsl';
import '../styles/gallery.css';

const projects = [
  { id: '001', title: 'Ajinomoto', src: '/images/shrome.png' },
  { id: '002', title: 'Attesa', src: '/images/shrome.png' },
  { id: '003', title: 'Magic', src: '/images/shrome.png' },
  { id: '004', title: 'Prism', src: '/images/shrome.png' },
  { id: '005', title: '9D Project', src: '/images/shrome.png' },
  { id: '006', title: 'Sarazanmai', src: '/images/shrome.png' },
];

const ProjectGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const totalImages = projects.length;

  const initWebGL = () => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const imgElements = [...document.querySelectorAll('[data-webgl-media]')] as HTMLImageElement[];
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 500;
    camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 500))) / Math.PI;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current?.appendChild(renderer.domElement);

    const imageGeo = new THREE.PlaneGeometry(1, 1, 35, 35);
    const webglImages: any[] = [];

    imgElements.forEach((img) => {
      gsap.to(img, { opacity: 0, duration: 0.5 });

      const texture = new THREE.TextureLoader().load(img.src);
      const { width, height } = img.getBoundingClientRect();

      const material = new THREE.ShaderMaterial({
        vertexShader: vertex1,
        fragmentShader: fragment1,
        uniforms: {
          time: { value: 0 },
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uEnter: { value: 0 },
          aspect: { value: new THREE.Vector2(width, height) },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(imageGeo, material);
      scene.add(mesh);

      const updatePosition = () => {
        const rect = img.getBoundingClientRect();
        mesh.scale.set(rect.width, rect.height, 1);
        mesh.position.set(
          rect.left - window.innerWidth / 2 + rect.width / 2,
          -rect.top + window.innerHeight / 2 - rect.height / 2,
          0
        );
        material.uniforms.aspect.value.set(rect.width, rect.height);
      };
      updatePosition();

      const onMouseMove = (e: MouseEvent) => {
        const x = e.offsetX / img.width;
        const y = 1 - e.offsetY / img.height;
        gsap.to(material.uniforms.uMouse.value, { x, y, duration: 1 });
      };

      const onMouseEnter = () => gsap.to(material.uniforms.uEnter, { value: 1.5, duration: 1 });
      const onMouseLeave = () => gsap.to(material.uniforms.uEnter, { value: 0, duration: 1 });

      img.addEventListener('mousemove', onMouseMove);
      img.addEventListener('mouseenter', onMouseEnter);
      img.addEventListener('mouseleave', onMouseLeave);

      webglImages.push({ mesh, material, img, updatePosition, listeners: { onMouseMove, onMouseEnter, onMouseLeave } });
    });

    let animationFrameId: number;
    const animate = (time: number) => {
      webglImages.forEach((obj) => {
        obj.updatePosition();
        obj.material.uniforms.time.value = time / 1000;
      });
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      renderer.setSize(sizes.width, sizes.height);
      camera.aspect = sizes.width / sizes.height;
      camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 500))) / Math.PI;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      webglImages.forEach(obj => {
        obj.img.removeEventListener('mousemove', obj.listeners.onMouseMove);
        obj.img.removeEventListener('mouseenter', obj.listeners.onMouseEnter);
        obj.img.removeEventListener('mouseleave', obj.listeners.onMouseLeave);
      });

      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  };

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      const cleanup = initWebGL();
      return cleanup;
    }
  }, [imagesLoaded]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      <div className="gallery-container">
        {projects.map((project) => (
          <div className="gallery-item" key={project.id}>
            <div className="number">{project.id}</div>
            <div className="thumb">
              <img
                data-webgl-media
                src={project.src}
                alt={project.title}
                loading="eager"
                onLoad={() => setImagesLoaded(count => count + 1)}
              />
            </div>
            <div className="title">
              <h2>{project.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
