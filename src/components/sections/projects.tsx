"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Projects() {
  const t = useTranslations('Projects');
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: t('project1.title'),
      category: t('project1.category'),
      image: "/project/janat.png",
      year: "2026",
      href: "https://jannat-nature.com/",
    },
    {
      title: t('project2.title'),
      category: t('project2.category'),
      image: "/project/eclaby.png",
      year: "2026",
      href: "https://jannat-nature.com/",
    },
    {
      title: t('project3.title'),
      category: t('project3.category'),
      image: "/project/foodmune.png",
      year: "2024",
      href: "#",
    },
    {
      title: t('project4.title'),
      category: t('project4.category'),
      image: "/project/eventmanagment.png",
      year: "2024",
      href: "https://www.sitepascher.ma/",
    },
    {
      title: t('project5.title'),
      category: t('project5.category'),
      image: "/project/gmpbt.png",
      year: "2023",
      href: "#",
    },
    {
      title: t('project6.title'),
      category: t('project6.category'),
      image: "/project/natural.png",
      year: "2023",
      href: "#",
    },
  ];

  const filters = ["All", "Branding", "Web"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const row = e.currentTarget;
    const bounds = row.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.to(`.floating-preview-${index}`, {
      x: x - 225, // offset to roughly center horizontally
      y: y - 140, // offset to roughly center vertically
      rotation: (x - bounds.width / 2) * 0.02,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = (index: number) => {
    gsap.to(`.floating-preview-${index}`, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(`.floating-preview-${index}`, { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <section id="projects" ref={containerRef} className="py-24 md:py-36 bg-white text-black overflow-hidden select-none relative">
      <div className="max-w-[90%] md:max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-6 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-black block reveal-text" />
              <span className="italic text-xl text-gray-500 tracking-wider font-playfair reveal-text">
                {t('section')}
              </span>
            </div>
            <div className="overflow-hidden mb-4">
              <h2 className="reveal-text text-6xl md:text-8xl font-anton uppercase leading-[0.9] tracking-tighter">
                {t('title1')} <span className="text-gray-400 font-playfair italic normal-case tracking-tight">{t('title2')}</span>
              </h2>
            </div>
            <p className="reveal-text text-xl md:text-2xl text-gray-500 font-medium max-w-xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* <div className="flex flex-wrap gap-2 self-start lg:self-end reveal-text">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 text-xs uppercase font-bold tracking-widest transition-all duration-300 border ${isActive ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
                    }`}
                >
                  {filter}
                </button>
              );
            })}
          </div> */}
        </div>

        {/* Interactive Luxury List Showcase */}
        <div ref={listRef} className="border-t border-gray-200">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="project-row relative border-b border-gray-200 py-6 md:py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer group transition-colors duration-500 "
            >
              <Link href={project.href} target="_blank" className="absolute inset-0 z-10" />

              <div className="flex flex-col gap-4 max-w-xl z-20 pointer-events-none">
                <div className="flex items-center gap-4 text-xs md:text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
                  <span>{project.category}</span>
                  <span className="w-1.5 h-1.5  bg-gray-300" />
                  <span>{project.year}</span>
                </div>
                {/* Using font-playfair to match the elegant serif in the screenshot */}
                <h3 className="text-3xl md:text-[3rem] font-playfair leading-none tracking-tight transition-all duration-500 group-hover:translate-x-4  lowercase">
                  {project.title}
                </h3>
              </div>

              <div className="mt-8 md:mt-0 z-20 pointer-events-none self-start md:self-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500 transform group-hover:rotate-45">
                  <ArrowUpRight size={28} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              {/* Floating Image Preview (GSAP Cursor Tracking) */}
              <div
                className={`floating-preview-${index} pointer-events-none absolute left-0 top-0 w-[300px] h-[200px] md:w-[450px] md:h-[280px] overflow-hidden  opacity-0 scale-75 z-30 origin-center border border-gray-100 bg-white`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full relative">
                  {/* Mockup browser bar */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-black backdrop-blur-md z-30 flex items-center px-4 gap-1.5 border-b border-gray-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Core Web Vitals Optimization */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
