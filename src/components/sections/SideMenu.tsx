"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl"

const getLinks = (t: any) => [
  { title: t('home'), href: "/" },
  { title: t('about'), href: "/#about" },
  { title: t('services'), href: "/#services" },
  { title: t('projects'), href: "/#projects" },
  { title: t('faq'), href: "/#faq" },
  { title: t('privacy'), href: "/privacy" },
  { title: t('terms'), href: "/terms" },
];

export default function SideMenu() {
  const t = useTranslations('SideMenu');
  const links = getLinks(t);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  // GSAP Animation for links entrance
  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".menu-link",
          { y: 120, opacity: 0, rotate: 5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.3, // Wait for clipPath reveal to be mostly done
          }
        );
        gsap.fromTo(
          ".menu-footer",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
        );
      }, menuRef);
      return () => ctx.revert();
    }
  }, [isOpen]);

  // GSAP Hover effect
  const handleMouseEnter = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget.querySelector(".link-text"), {
      x: 30,
      color: "#fce8ce",
      duration: 0.4,
      ease: "power3.out"
    });
    gsap.to(e.currentTarget.querySelector(".link-number"), {
      x: 10,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget.querySelector(".link-text"), {
      x: 0,
      color: "#ffffff",
      duration: 0.4,
      ease: "power3.out"
    });
    gsap.to(e.currentTarget.querySelector(".link-number"), {
      x: 0,
      opacity: 0.5,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  return (
    <>
      {/* Menu Button - Fixed with mix-blend-difference for ultimate visibility */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] mix-blend-difference text-white">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          className="group flex flex-col gap-[6px] justify-center items-center w-14 h-14 rounded-full border border-white/20 hover:border-white transition-colors duration-300 bg-transparent"
        >
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 3.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#0a0a0a] flex flex-col justify-center px-8 md:px-24 overflow-hidden"
            ref={menuRef}
          >
            {/* Background Texture matching site style */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#fff 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="w-full max-w-7xl mx-auto flex flex-col  h-full relative z-10 pt-20">
              <nav className="flex flex-col gap-2 md:gap-4">
                {links.map((link, index) => (
                  <div key={link.title} className="overflow-hidden py-2">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="menu-link flex items-center group cursor-pointer w-fit"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span className="link-number text-gray-500 font-playfair italic text-xl md:text-3xl mr-6 md:mr-10 opacity-50 block transform">
                        0{index + 1}
                      </span>
                      <span className="link-text font-anton uppercase text-5xl sm:text-7xl md:text-[6vw] leading-[0.85] text-white tracking-tight block transform origin-left transition-transform duration-500 group-hover:skew-x-[-5deg]">
                        {link.title}
                      </span>
                    </Link>
                  </div>
                ))}

              </nav>
              <div className="mt-6 md:mt-8 flex gap-4 menu-footer">
                {['en', 'fr', 'ar'].map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`px-6 py-2 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300  ${locale === l
                      ? 'bg-white text-black '
                      : 'bg-transparent text-gray-400  hover:text-white '
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="menu-footer absolute bottom-12 left-0 w-full flex flex-col md:flex-row justify-between items-start md:items-center text-gray-400 font-medium text-xs md:text-sm border-t border-white/10 pt-8  px-2">
                <div className="flex gap-8 mb-6 md:mb-0">
                  <a href="https://x.com/elcadi_mohammad" className="hover:text-white transition-colors uppercase tracking-[0.2em]">Twitter</a>
                  <a href="https://www.linkedin.com/in/mohammadelcadi" className="hover:text-white transition-colors uppercase tracking-[0.2em]">LinkedIn</a>
                  <a href="https://www.instagram.com/mohammadelcadi" className="hover:text-white transition-colors uppercase tracking-[0.2em]">Instagram</a>
                </div>
                <div className="font-playfair italic text-lg text-gray-500">
                  elcadi.mohammad.dev@gmail.com
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
