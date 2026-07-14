"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const faqs = [
  {
    question: "WHAT SERVICES DO YOU OFFER?",
    answer: "We offer end-to-end fullstack development, specializing in highly interactive, premium web experiences using React, Next.js, GSAP, and complex web applications tailored to your business needs."
  },
  {
    question: "HOW LONG DOES A PROJECT TAKE?",
    answer: "Project timelines vary depending on scope and complexity. A standard premium website takes 2-4 weeks, while a custom SaaS platform or complex e-commerce solution can take 2-3 months."
  },
  {
    question: "DO YOU WORK WITH INTERNATIONAL CLIENTS?",
    answer: "Absolutely. We work with visionary clients worldwide and are highly accustomed to managing seamless communication and project delivery across different time zones."
  },
  {
    question: "WHAT IS YOUR PRICING STRUCTURE?",
    answer: "Every project is unique. We provide customized quotes based on your specific requirements, project scope, and desired outcomes after an initial discovery call."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".faq-header-reveal",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power4.out", 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // List Items Animation
      gsap.fromTo(
        ".faq-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-white text-black overflow-hidden relative">
      <div className="max-w-[90%] md:max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col mb-16 md:mb-24">
          <div className="overflow-hidden mb-6 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-black block faq-header-reveal" />
            <span className="italic text-xl text-gray-500 tracking-wider font-playfair faq-header-reveal">
              04. FAQ
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="faq-header-reveal text-5xl md:text-8xl font-anton uppercase leading-[0.9] tracking-tighter">
              GOT <span className="text-gray-400 font-playfair italic normal-case tracking-tight">Questions?</span>
            </h2>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div ref={listRef} className="border-t border-black/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="faq-item border-b border-black/10 flex flex-col group cursor-pointer transition-colors duration-300 hover:bg-gray-50"
                onClick={() => toggleFaq(index)}
              >
                {/* Question Row */}
                <div className="flex items-center justify-between py-8 md:py-12 px-4 md:px-8">
                  <div className="flex items-center gap-6 md:gap-12 w-full pr-8">
                    <span className="font-playfair italic text-xl md:text-2xl text-gray-400 hidden sm:block">
                      0{index + 1}
                    </span>
                    <h3 className={`font-anton uppercase text-3xl md:text-5xl leading-none tracking-tight transition-colors duration-500 ${isOpen ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 group-hover:border-black transition-colors duration-300">
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="absolute w-[40%] h-[2px] bg-black block" />
                      <span className="absolute h-[40%] w-[2px] bg-black block" />
                    </motion.div>
                  </div>
                </div>

                {/* Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 md:pb-12 px-4 md:px-8 pl-4 sm:pl-[5.5rem] md:pl-[6.5rem]">
                        <p className="text-gray-500 font-inter text-base md:text-xl font-medium leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
