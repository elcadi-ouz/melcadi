"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCode,
  FiLayout,
  FiServer,
  FiZap,
  FiCpu,
  FiPenTool,
} from "react-icons/fi";

import { useTranslations } from "next-intl";

const servicesData = [
  { id: "01", key: "webDev", icon: FiCode },
  { id: "02", key: "automation", icon: FiCpu },
  { id: "03", key: "graphics", icon: FiPenTool },
  { id: "04", key: "api", icon: FiServer },
  { id: "05", key: "seo", icon: FiZap },
];

const CARD_STAGGER = 0.08;

export default function Services() {
  const t = useTranslations('Services');
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
    track: 0,
  });

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
        track: trackRef.current.scrollWidth,
      });
    };

    measure();

    const resize = new ResizeObserver(measure);

    if (trackRef.current) {
      resize.observe(trackRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resize.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const distance = Math.max(sizes.track - sizes.width - 600, 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.25,
  });

  const x = useTransform(smooth, [0, 1], [0, -distance]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  return (
    <section
      ref={containerRef}
      style={{
        height:
          sizes.height === 0
            ? "100vh"
            : `${distance + sizes.height}px`,
      }}
      className="relative bg-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(#111 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          style={{
            opacity: headerOpacity,
            y: headerY,
          }}
          className="absolute left-8 md:left-16 top-24 z-20"
        >
          <span className="italic text-2xl block mb-4">
            {t('section')}
          </span>

          <h2 className="font-anton text-[15vw] md:text-[9vw] leading-[0.9]">
            {t('title1')}
            <br />
            {t('title2')}
          </h2>
        </motion.div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-8 md:gap-12 w-max h-full will-change-transform"
        >
          <div className="w-[45vw] flex-shrink-0" />

          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * CARD_STAGGER,
                }}
                className="relative flex-shrink-0 w-[82vw] md:w-[480px] h-[60vh] bg-black border border-white/10  p-10 overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                {/* Background Number Hover Effect */}
                <div className="absolute right-[-20px] bottom-[-40px] text-[180px] font-bold text-white opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  {service.id}
                </div>

                <div className="flex justify-between items-start relative z-10">
                  {/* Service Icon Hover Effect */}
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500">
                    <Icon size={30} className="group-hover:rotate-12 transition-transform duration-500" />
                  </div>

                  {/* Arrow Icon Hover Effect */}
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-gray-200 transition-all duration-500">
                    <FiArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>

                <div className="mt-auto pt-20 relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-anton whitespace-pre-line text-5xl md:text-6xl text-white">
                    {t(`services.${service.key}.title`)}
                  </h3>

                  <p className="mt-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
                    {t(`services.${service.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}

          <div className="w-[50vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}