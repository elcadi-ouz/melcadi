"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations('About');
  const containerRef = useRef<HTMLElement>(null);

  // Parallax effects tied to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.2, 0.05]);

  // Stagger variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } // Custom spring-like cubic bezier
    }
  };

  const fadeRightVariant: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-6 flex flex-col items-center justify-center overflow-hidden px-4 md:px-12"
    >
      {/* Subtle Dotted Grid Background - Animated Opacity */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: bgOpacity,
        }}
      ></motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative max-w-[1200px] w-full mx-auto flex flex-col z-10"
      >
        {/* Section Header with Parallax */}
        <motion.div
          style={{ y: titleY }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8"
        >
          <motion.div variants={fadeRightVariant} className="flex flex-col">
            <span className="font-playfair italic text-[#111111] text-xl md:text-2xl mb-2">
              {t('section')}
            </span>
            <h2 className="font-anton uppercase text-[#111111] text-[12vw] md:text-[8vw] leading-[0.85] tracking-normal">
              {t('name1')}<br />{t('name2')}
            </h2>
          </motion.div>
        </motion.div>

        {/* Main Content Area with Parallax */}
        <motion.div
          style={{ y: contentY }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start"
        >
          {/* Large Accent Text & Buttons */}
          <motion.div variants={fadeUpVariant} className="md:col-span-5 flex flex-col justify-start gap-8">
            <h3 className="font-playfair italic text-[#111111] text-[8vw] md:text-[4.5vw] leading-[1.1] tracking-tight">
              {t('title')}
            </h3>

            {/* CTA */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#111111] text-white font-inter font-semibold uppercase tracking-widest text-sm hover:bg-[#333] transition-colors"
                >
                  <Link href="https://wa.me/212644334262"> {t('hireMe')}</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f5f5f5" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-[#111111] text-[#111111] font-inter font-semibold uppercase tracking-widest text-sm transition-colors"
                >
                  <Link href="#projects"> {t('exploreWork')}</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeUpVariant} className="md:col-span-7 flex flex-col justify-center">
            <p className="font-inter text-[#111111] text-lg md:text-[1.3vw] leading-relaxed max-w-[600px] font-medium">
              {t('description')}
            </p>

            {/* Animated Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="w-full h-[1px] bg-[#111111] opacity-20 mt-12 origin-left"
            ></motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
