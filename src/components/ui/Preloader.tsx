"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// High-performance, lightweight 3D Logo (1 mesh instead of 40 stacked meshes)
function M_Logo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/melcadi-icon.png";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Invert for white logo on transparent background
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imageData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  if (!texture) return null;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.3}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
          alphaMap={texture}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeenPreloader = sessionStorage.getItem("has_seen_preloader");
    if (hasSeenPreloader) {
      setIsLoading(false);
      return;
    }

    const duration = 1200; // Ultra-fast 1.2s duration
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOut = 1 - Math.pow(1 - currentStep / steps, 3);
      const newProgress = Math.min(Math.round(easeOut * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        sessionStorage.setItem("has_seen_preloader", "true");
        setTimeout(() => setIsLoading(false), 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfbf6] via-[#fce8ce] to-[#ffffff] text-[#0a0a0a] overflow-hidden pointer-events-auto"
        >
          {/* Background subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'url("/noise.png")' }}
          ></div>

          {/* Optimized 3D Canvas */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ powerPreference: "high-performance", antialias: true }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
              <directionalLight position={[-5, -10, -5]} intensity={1} color="#fce8ce" />
              <M_Logo />
            </Canvas>
          </div>

          {/* UI Layer */}
          <div className="relative z-20 flex flex-col items-center justify-between h-full w-full py-8 md:py-12 px-6 md:px-12 pointer-events-none">
            {/* Top Header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-between uppercase font-anton tracking-widest text-xs md:text-sm text-black/40"
            >
              <span>Melcadi</span>
              <span>Portfolio &copy; {new Date().getFullYear()}</span>
            </motion.div>

            {/* Center Typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full z-0">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1 }}
                className="font-anton text-[22vw] md:text-[15vw] leading-none uppercase tracking-tight text-black select-none"
              >
                MELCADI
              </motion.h1>
            </div>

            {/* Bottom Progress UI */}
            <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-4 z-20">
              <div className="w-full max-w-[200px] md:max-w-[300px] h-[2px] bg-black/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-black rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.02 }}
                />
              </div>

              <div className="flex flex-col items-end">
                <motion.div
                  className="font-anton text-6xl md:text-8xl leading-[0.8] text-[#0a0a0a]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {progress}%
                </motion.div>
                <motion.span
                  className="font-inter font-medium text-xs md:text-sm text-black/50 tracking-widest uppercase mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Loading Experience
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
