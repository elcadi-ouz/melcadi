"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const AsyncPreloader3D = dynamic(() => import("./Preloader3D"), { ssr: false });

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsDesktop(true);
    }
    // Check if user has already seen preloader in this session
    const hasSeenPreloader = sessionStorage.getItem("has_seen_preloader");
    if (hasSeenPreloader) {
      setIsLoading(false);
      return;
    }

    const duration = 1200; // Ultra-fast 1.2s duration
    let start: number | null = null;
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const p = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - p, 3);
      const currentProgress = Math.min(Math.round(easeOut * 100), 100);

      if (counterRef.current) {
        counterRef.current.innerText = currentProgress + "%";
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = currentProgress + "%";
      }

      if (p < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        sessionStorage.setItem("has_seen_preloader", "true");
        setTimeout(() => setIsLoading(false), 200);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
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

          {/* Optimized 3D Canvas (Desktop Only) */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {isDesktop && <AsyncPreloader3D />}
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
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1 }}
                className="font-anton text-[22vw] md:text-[15vw] leading-none uppercase tracking-tight text-black select-none"
              >
                MELCADI
              </motion.span>
            </div>

            {/* Bottom Progress UI */}
            <div className="w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-4 z-20">
              <div className="w-full max-w-[200px] md:max-w-[300px] h-[2px] bg-black/10 relative overflow-hidden rounded-full">
                <div
                  ref={progressBarRef}
                  className="absolute top-0 left-0 h-full bg-black rounded-full"
                  style={{ width: "0%" }}
                />
              </div>

              <div className="flex flex-col items-end">
                <motion.div
                  ref={counterRef}
                  className="font-anton text-6xl md:text-8xl leading-[0.8] text-[#0a0a0a]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  0%
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
