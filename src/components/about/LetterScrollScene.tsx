
'use client';



import { Canvas } from '@react-three/fiber';

import { Environment } from '@react-three/drei';

import { Suspense } from 'react';

import Letter from './Letter';



export default function LettersScrollScene() {

  const name = 'LAKSHYA';

  const letters = name.split('');

  const spacing = 4;



  return (

    <div style={{ width: '100vw', height: '100vh' }}><Canvas

      camera={{ position: [0, 0, 18], fov: 45 }}



    >

      <Suspense fallback={null}>

        <ambientLight intensity={0.5} />

        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Environment preset="city" />

        {letters.map((char, i) =>

          char === ' ' ? null : (

            <Letter
              key={`${char}-${i}`}

              char={char}

              index={i}

              total={letters.length}

              spacing={spacing}

            />

          )

        )}

      </Suspense>
    </Canvas></div>
  );

}

// 'use client';

// import { Canvas } from '@react-three/fiber';
// import { useGLTF, useTexture } from '@react-three/drei';
// import { Suspense, useEffect, useMemo, useRef } from 'react';
// import * as THREE from 'three';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Letter from './Letter';

// gsap.registerPlugin(ScrollTrigger);

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vec3 viewNormal = normalize(normalMatrix * normal);
//     vUv = viewNormal.xy * 0.5 + 0.5;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   varying vec2 vUv;
//   uniform sampler2D uMatcapTexture;
//   void main() {
//     gl_FragColor = texture2D(uMatcapTexture, vUv);
//   }
// `;

// function SceneContent({ letters, spacing }: { letters: string[]; spacing: number }) {
//   const letterRefs = useRef<THREE.Group[]>([]);

//   const models = letters.map((char) => useGLTF(`/models/${char}.glb`));
//   const matcapTexture = useTexture('/images/images.jpg');

//   const sharedMaterial = useMemo(() => {
//     return new THREE.ShaderMaterial({
//       uniforms: { uMatcapTexture: { value: matcapTexture } },
//       vertexShader,
//       fragmentShader,
//     });
//   }, [matcapTexture]);

//   useEffect(() => {
//     ScrollTrigger.refresh(); // Ensure everything is synced
//     letterRefs.current.forEach((group, index) => {
//       if (!group) return;

//       const initialX = (index - (letters.length - 1) / 2) * spacing;
//       gsap.set(group.position, {
//         x: initialX,
//         y: 0,
//         z: 0,
//       });

//       gsap.set(group.rotation, {
//         x: Math.PI / 2,
//         y: 0,
//         z: 0,
//       });

//       gsap.to(group.position, {
//         scrollTrigger: {
//           trigger: '#scroll-container',
//           start: 'top top',
//           end: 'bottom bottom',
//           scrub: 1.5,
//         },
//         x: initialX + (Math.random() - 0.5) * 3,
//         y: Math.random() * 15 - 7.5,
//         z: (index - letters.length / 2) * +1.5,
//       });

//       gsap.to(group.rotation, {
//         scrollTrigger: {
//           trigger: '#scroll-container',
//           start: 'top top',
//           end: 'bottom bottom',
//           scrub: 1.5,
//         },
//         x: Math.PI / 2 + (Math.random() - 0.5) * Math.PI,
//         y: (Math.random() - 0.5) * Math.PI * 2,
//         z: (Math.random() - 0.5) * Math.PI,
//       });
//     });
//   }, [letters.length, spacing]);

//   return (
//     <Suspense fallback={null}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />

//       {models.map((model, i) => (
//         <group
//           key={`${letters[i]}-${i}`}
//           ref={(ref) => {
//             if (ref) letterRefs.current[i] = ref;
//           }}
//           position={[(i - (letters.length - 1) / 2) * spacing, 0, 0]}
//           rotation={[Math.PI / 2, 0, 0]}
//         >
//           <Letter model={model.scene.clone()} material={sharedMaterial} />
//         </group>
//       ))}
//     </Suspense>
//   );
// }

// export default function LettersScrollScene() {
//   const letters = 'LAKSHYA'.split('');
//   const spacing = 4;

//   return (
//     <>
//       {/* Scrollable container */}
//       <div id="scroll-container" style={{ height: '300vh', position: 'relative' }}>
//         {/* Fixed 3D canvas */}
//         <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none'}}>
//           <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
//             <color attach="background" args={['#fffafa']} />
//             <SceneContent letters={letters} spacing={spacing} />
//           </Canvas>
//         </div>
//       </div>
//     </>
//   );
// }

