"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations('Contact');
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-reveal",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-36 bg-white text-black overflow-hidden relative z-10">
      <div className="max-w-[90%] md:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">

          {/* Left Side: Text & Info */}
          <div className="w-full lg:w-5/12 flex flex-col gap-12">
            <div className="flex flex-col">
              <div className="overflow-hidden mb-6 flex items-center gap-4">
                <span className="w-12 h-[2px] bg-black block form-reveal" />
                <span className="italic text-xl text-gray-500 tracking-wider font-playfair form-reveal">
                  {t('section')}
                </span>
              </div>
              <h2 className="text-6xl md:text-[5.5rem] font-anton uppercase leading-[0.9] tracking-tighter">
                <div className="overflow-hidden"><span className="block form-reveal">{t('title1')}</span></div>
                <div className="overflow-hidden"><span className="block form-reveal text-gray-400 font-playfair italic normal-case tracking-tight">{t('title2')}</span></div>
              </h2>
            </div>

            <div className="flex flex-col gap-8 mt-4 md:mt-8">
              <div className="overflow-hidden">
                <div className="form-reveal">
                  <h4 className="text-gray-400 font-bold tracking-[0.2em] text-xs mb-3 uppercase">Email Us</h4>
                  <a href="mailto:mohammad.elcadi.dev@gmail.com" className="text-2xl md:text-3xl font-inter font-medium hover:italic transition-all duration-300 relative inline-block group">
                    mohammad.elcadi.dev@gmail.com
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </a>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="form-reveal">
                  <h4 className="text-gray-400 font-bold tracking-[0.2em] text-xs mb-3 uppercase">{t('callUs')}</h4>
                  <a href="tel:+212644334262" className="text-2xl md:text-3xl font-inter font-medium hover:italic transition-all duration-300 relative inline-block group">
                    +212 644 334 262
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12 md:py-24"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-4xl md:text-6xl font-anton uppercase mb-6 tracking-tight">Message Sent!</h3>
                  <p className="text-gray-500 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed font-medium">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-black font-bold uppercase tracking-[0.2em] text-sm relative group overflow-hidden"
                  >
                    Send another message
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black transition-transform duration-300 origin-left" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-10 mt-4 md:mt-12"
                >
                  <div className="overflow-hidden">
                    <div className="form-reveal relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('form.name')}
                        className={`w-full bg-transparent border-b pb-4 text-black placeholder-gray-400 font-inter font-medium text-xl md:text-2xl focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-black/20'}`}
                      />
                      <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.name ? 'bg-red-500 w-full' : 'bg-black w-0 group-focus-within:w-full'}`} />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-sm mt-2 font-medium">
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="overflow-hidden">
                    <div className="form-reveal relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('form.email')}
                        className={`w-full bg-transparent border-b pb-4 text-black placeholder-gray-400 font-inter font-medium text-xl md:text-2xl focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-black/20'}`}
                      />
                      <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.email ? 'bg-red-500 w-full' : 'bg-black w-0 group-focus-within:w-full'}`} />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-sm mt-2 font-medium">
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="overflow-hidden">
                    <div className="form-reveal relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('form.message')}
                        rows={4}
                        className={`w-full bg-transparent border-b pb-4 text-black placeholder-gray-400 font-inter font-medium text-xl md:text-2xl focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-black/20'}`}
                      />
                      <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ${errors.message ? 'bg-red-500 w-full' : 'bg-black w-0 group-focus-within:w-full'}`} />
                    </div>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-sm mt-2 font-medium">
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="overflow-hidden mt-2">
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-3 border border-red-100"
                        >
                          <XCircle className="w-5 h-5 shrink-0" />
                          Failed to send message. Please try again later.
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      className={`form-reveal flex items-center justify-between w-full text-white px-8 py-5 md:py-6group transition-colors ${status === 'loading' ? 'bg-gray-800' : 'bg-black hover:bg-gray-900'
                        }`}
                    >
                      <span className="font-anton uppercase text-2xl md:text-3xl tracking-wide pt-1">
                        {status === 'loading' ? 'Sending...' : t('form.submit')}
                      </span>
                      <div className="bg-white text-black rounded-full overflow-hidden relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                        <ArrowRight className="w-6 h-6 absolute transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] group-hover:opacity-0" strokeWidth={2} />
                        <ArrowRight className="w-6 h-6 absolute -translate-x-[150%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={2} />
                      </div>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
