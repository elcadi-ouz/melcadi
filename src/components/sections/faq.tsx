"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const t = useTranslations('FAQ');
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
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

  return (
    <section id="faq" ref={containerRef} className="py-24 md:py-36 bg-[#fdfbf6] text-black relative overflow-hidden">
      <div className="max-w-[90%] md:max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16">
          <div className="overflow-hidden mb-6 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-black block faq-reveal" />
            <span className="italic text-xl text-gray-500 tracking-wider font-playfair faq-reveal">
              {t('section')}
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-anton uppercase leading-[0.9] tracking-tighter faq-reveal">
            {t('title1')} <span className="text-gray-400 font-playfair italic normal-case tracking-tight">{t('title2')}</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col border-t border-black/10">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-reveal border-b border-black/10">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 md:py-8 text-left group transition-colors"
              >
                <h3 className={`text-2xl md:text-3xl font-playfair tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center shrink-0 ml-4 group-hover:border-black transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-lg md:text-xl text-gray-500 font-inter font-medium leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
