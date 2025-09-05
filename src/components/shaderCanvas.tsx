"use client";
import * as THREE from "three";
import { sRGBEncoding } from 'three';
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { DotScreenShader } from './shaders/CustomShader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { NoiseShader } from './shaders/NoiseShader';

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import vertex1 from "./shaders/vertex1.glsl";
import fragment1 from "./shaders/fragment1.glsl";

// ...imports remain the same

export default function ShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const timeRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.set(0, 0, 0.8);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // POSTPROCESSING SETUP
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const noisePass = new ShaderPass(NoiseShader);
    noisePass.uniforms['amount'].value = 0.07; // tweak as needed
    composer.addPass(noisePass);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    // SHADER MATERIALS
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      colorSpace: THREE.SRGBColorSpace,
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector4(width, height, 1, 1) },
      },
      side: THREE.DoubleSide,
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.8, 64, 64), material);
    scene.add(sphere);

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex1,
      fragmentShader: fragment1,
      uniforms: {
        time: { value: 0 },
        tCube: { value: cubeRenderTarget.texture },
        mRefractionRatio: { value: 1.02 },
        mFresnelBias: { value: 0.4 },
        mFresnelScale: { value: 2.0 },
        mFresnelPower: { value: 1.0 },
        resolution: { value: new THREE.Vector4(width, height, 1, 1) },
      },
      side: THREE.DoubleSide,
    });

    const smallSphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), mat);
    smallSphere.position.set(0.6, 0.4, 0);
    scene.add(smallSphere);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      timeRef.current += 0.01;
      material.uniforms.time.value = timeRef.current;
      mat.uniforms.time.value = timeRef.current;

      smallSphere.position.x = -mouse.current.x * 0.2;
      smallSphere.position.y = -mouse.current.y * 0.05;

      smallSphere.visible = false;
      cubeCamera.update(renderer, scene);
      smallSphere.visible = true;

      composer.render(); // 🔥 Use composer instead of renderer directly
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 75%, #000 100%)',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
