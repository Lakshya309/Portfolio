
'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- SHADER CODE FOR MATCAP EFFECT ---

// Vertex Shader: Calculates the normal relative to the camera's view
// and converts it into UV coordinates to sample the matcap texture.
const vertexShader = `
  varying vec2 vUv;

  void main() {
    // Transform the model's normal into view space
    vec3 viewNormal = normalize(normalMatrix * normal);
    
    // Use the view-space normal's X and Y as texture coordinates
    vUv = viewNormal.xy * 0.5 + 0.5;

    // Standard position calculation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader: Simply looks up the color on the matcap texture.
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uMatcapTexture;

  void main() {
    // Apply the matcap texture
    gl_FragColor = texture2D(uMatcapTexture, vUv);
  }
`;


type LetterProps = {
  char: string;
  index: number;
  total: number;
  spacing: number;
};

export default function Letter({ char, index, total, spacing }: LetterProps) {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { scene } = useGLTF(`/models/${char}.glb`);
  const clonedScene = scene.clone();

  // --- 1. LOAD THE MATCAP TEXTURE ---
  // Note: We use useTexture, not useCubeTexture
  const matcapTexture = useTexture('/images/images.jpg');

  const initialX = (index - (total - 1) / 2) * spacing;

  // --- 2. DEFINE THE UNIFORM FOR THE SHADER ---
  const uniforms = useMemo(() => ({
    uMatcapTexture: { value: matcapTexture },
  }), [matcapTexture]);

  useEffect(() => {
    const mesh = meshRef.current;
    const shaderMaterial = materialRef.current;
    if (!mesh || !shaderMaterial) return;

    // Replace the model's default material with our custom Matcap shader
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = shaderMaterial;
      }
    });

    // --- GSAP Setup (remains the same) ---
    const uprightRotationX = Math.PI / 2;
    gsap.set(mesh.rotation, { x: uprightRotationX, y: 0, z: 0 });
    gsap.set(mesh.position, { x: initialX, y: 0, z: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 },
    });

    tl.to(mesh.position, {
      y: () => 8 + Math.random() * 12 + index * 0.3, // More vertical motion
      z: () => (index - total / 2) * 1.25 + (Math.random() - 0.5) * 2, // Deeper Z offset
      x: () => initialX + (Math.random() - 0.5) * 5, // Wider X deviation
      duration: 1.2 + Math.random() * 0.4, // Slight randomness in time
      ease: "power3.out", // Smooth upward motion
    }, 0)

      .to(mesh.rotation, {
        x: () => uprightRotationX + (Math.random() - 0.5) * Math.PI * 2,
        y: () => (Math.random() - 0.5) * Math.PI * 3,
        z: () => (Math.random() - 0.5) * Math.PI * 2,
        duration: 1.2 + Math.random() * 0.4,
        ease: "power2.out",
      }, 0);

    return () => {
      if (tl && tl.scrollTrigger) { tl.scrollTrigger.kill(); tl.kill(); }
    };
  }, [initialX, index, total, clonedScene, uniforms]);

  return (
    <group ref={meshRef} scale={8}>
      <primitive object={clonedScene} />
      <shaderMaterial
        ref={materialRef}
        args={[{ uniforms, vertexShader, fragmentShader }]}
      />
    </group>
  );
}


// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// type LetterProps = {
//   model: THREE.Group;
//   material: THREE.ShaderMaterial;
// };

// export default function Letter({ model, material }: LetterProps) {
//   const groupRef = useRef<THREE.Group>(null);

//   // Apply shared material only once
//   useEffect(() => {
//     model.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material = material;
//       }
//     });
//   }, [model, material]);

//   return (
//     <group ref={groupRef} scale={8}>
//       <primitive object={model} />
//     </group>
//   );
// }
