"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// High-performance, lightweight 3D Logo (1 mesh instead of 40 stacked meshes)
function M_Logo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/melcadi-icon.webp";
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

export default function Preloader3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ powerPreference: "high-performance", antialias: true }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={1} color="#fce8ce" />
      <M_Logo />
    </Canvas>
  );
}
