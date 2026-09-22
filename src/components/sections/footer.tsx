"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

export default function Contact() {
  const t = useTranslations('Footer');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Massive text reveal
      gsap.fromTo(
        ".contact-reveal",
        { y: 120, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Line separator expansion
      gsap.fromTo(
        ".contact-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#111111] text-white  py-14 overflow-hidden relative rounded-t-[2rem] md:rounded-t-[4rem] -mt-8 md:-mt-12 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">

      {/* Subtle animated background grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[90%] md:max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col mb-6">
          <div className="overflow-hidden mb-6 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-white block contact-reveal" />
            <span className="italic text-xl text-gray-400 tracking-wider font-playfair contact-reveal">
              05. footer
            </span>
          </div>

          {/* Massive CTA Text */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h2 className="text-[6vw] md:text-[5vw] font-anton uppercase leading-[0.95] tracking-tighter block contact-reveal">
                {t('haveProject')}
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="text-[10vw] md:text-[8vw] font-anton uppercase leading-[0.95] tracking-tighter block contact-reveal">
                {t('letsTalk')}
              </h2>
            </div>
          </div>
        </div>

        {/* Contact Info & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
          <div className="overflow-hidden">
            <p className="contact-reveal text-lg md:text-xl text-gray-400 font-medium max-w-md leading-relaxed">
              {t('availability')}
            </p>
          </div>

          <div className="overflow-hidden">
            <motion.a
              href="https://wa.me/212644334262"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-reveal flex items-center gap-6 bg-white text-black px-10 py-4 group transition-colors hover:bg-[#fce8ce]"
            >
              <span className="font-anton uppercase text-2xl md:text-2xl tracking-wide pt-1">{t('contact')}</span>
              <div className="bg-black text-white p-3 rounded-full group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight size={24} strokeWidth={2} />
              </div>
            </motion.a>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/20 origin-left contact-line mb-8 md:mb-12" />

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm md:text-base text-gray-500 font-medium uppercase tracking-widest overflow-hidden">
          <nav aria-label="Footer navigation" className="contact-reveal flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
            <a href="https://www.instagram.com/mohammadelcadi" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://x.com/elcadi_mohammad" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/mohammadelcadi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/elcadii" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">Github</a>
            <Link href="/privacy" className="hover:text-white transition-colors text-gray-300">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors text-gray-300">{t('terms')}</Link>
          </nav>
          <div className="contact-reveal font-playfair italic normal-case text-lg text-gray-400">
            {t('rights')}
          </div>
        </div>


      </div>
    </section>
  );
}
