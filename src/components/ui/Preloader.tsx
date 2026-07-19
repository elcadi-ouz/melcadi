"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

import { useMemo } from "react";

// A highly precise 3D Logo built by dynamically extruding the user's exact icon.png
function M_Logo() {
  const groupRef = useRef<THREE.Group>(null);
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
        // Invert the colors: The original is black logo on white bg.
        // We need white logo on black bg for displacement and alpha maps.
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
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.10; // Slower, more elegant rotation
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  if (!texture) return null;

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.4}>
        {/* Stacked Planes Extrusion - Creates a perfect, gapless solid 3D object from the image */}
        {Array.from({ length: 40 }).map((_, i) => {
          // Total thickness of the 3D logo
          const thickness = 0.25;
          const zPos = (i / 40) * thickness - thickness / 2;

          return (
            <mesh key={i} position={[0, 0, zPos]}>
              <planeGeometry args={[3, 3]} />
              <MeshDistortMaterial
                color="#0a0a0a"
                envMapIntensity={2}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.9}
                roughness={0.1}
                distort={0}
                alphaMap={texture}
                alphaTest={0.4} // Sharp cutoff for perfect logo shape
                transparent={false} // Depth write enabled
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const duration = 2500; // 2.5s for a snappier feel
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Custom easing function for the progress counter (starts fast, slows down)
      const easeOutQuart = 1 - Math.pow(1 - currentStep / steps, 4);
      const newProgress = Math.min(Math.round(easeOutQuart * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 500);
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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfbf6] via-[#fce8ce] to-[#ffffff] text-[#0a0a0a] overflow-hidden"
        >
          {/* Background noise */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }}></div>

          {/* 3D Canvas - The Dark M Logo */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
              <ambientLight intensity={1} />
              <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
              <directionalLight position={[-5, -10, -5]} intensity={1} color="#fce8ce" />
              <Environment preset="city" />
              <M_Logo />
            </Canvas>
          </div>

          {/* Foreground UI Layer */}
          <div className="relative z-20 flex flex-col items-center justify-between h-full w-full py-8 md:py-12 px-6 md:px-12 pointer-events-none">
            {/* Top Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full flex justify-between uppercase font-anton tracking-widest text-xs md:text-sm text-black/40"
            >
              <span>Melcadi</span>
              <span>Portfolio &copy; {new Date().getFullYear()}</span>
            </motion.div>

            {/* Center Background Typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full z-0">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="font-anton text-[22vw] md:text-[15vw] leading-none uppercase tracking-tight text-black"
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
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>

              <div className="flex flex-col items-end">
                <motion.div
                  className="font-anton text-6xl md:text-8xl leading-[0.8] text-[#0a0a0a]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {progress}%
                </motion.div>
                <motion.span
                  className="font-inter font-medium text-xs md:text-sm text-black/50 tracking-widest uppercase mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
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
