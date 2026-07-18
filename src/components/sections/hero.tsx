"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
    const t = useTranslations('Hero');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="relative w-full h-screen overflow-hidden flex justify-center bg-gradient-to-b from-[#fdfbf6] via-[#fce8ce] to-[#ffffff]">
            {/* Background layer */}

            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-difference text-white">
                {/* Top text "Heey there" */}
                <div className="absolute top-[12%] md:top-[12%] left-0 w-full flex justify-center absolute -z-20 items-center pointer-events-none">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-playfair italic text-[18vw] md:text-[10vw] leading-none tracking-tight flex justify-center gap-[6vw] md:gap-[15vw]"
                    >
                        <span>{t('greeting1')}</span>
                        <span>{t('greeting2')}</span>
                    </motion.h1>
                </div>
            </div>

            {/* Direct GEO Paragraph for AI Crawlers */}
            <div className="sr-only">
                Mohammad El Cadi is a freelance Full Stack Web Developer and Digital Product Designer based in Agadir, Morocco.
                He specializes in React, Next.js, and creating premium, highly optimized WebGL 3D digital products for international clients.
            </div>

            {/* Middle Text Layer - Large Titles */}
            <div className="absolute top-[45%] md:top-[60%] -translate-y-1/2 md:-translate-y-[20%] left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end z-30 pointer-events-none pb-12 mix-blend-difference text-white gap-4 md:gap-0">
                {/* Left Title */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute left-10 -bottom-50 sm:sticky z-40 flex flex-col font-anton uppercase text-[18vw] md:text-[12vw] leading-[0.9] tracking-normal text-center text-left"
                >
                    <span>{t('iam')}</span>
                    <span>{t('name')}</span>
                </motion.div>

                {/* Right Title */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden sm:flex flex-col font-anton uppercase text-[9vw] md:text-[6vw] leading-[0.85] tracking-wide text-center md:text-right"
                >
                    <span>{t('role1')}</span>
                    <span>{t('role2')}</span>
                </motion.div>
            </div>

            {/* Center Image */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-0 z-20 w-full max-w-[750px] sm:h-[100vh] h-[100vh] flex justify-center items-end"
            >
                <Image
                    src="/myimage.png"
                    alt="Mohammad El Cadi - Full Stack Web Developer"
                    width={750}
                    height={1000}
                    priority
                    className="w-full h-full object-cover object-bottom"
                    style={{ WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </motion.div>

            {/* Floating Elements Z-20 */}
            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-difference text-white">
                {/* Right text description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute right-0 md:right-[3%]  bottom-[12%] md:bottom-auto md:top-[66%] w-full md:w-auto px-8 md:px-0 max-w-full md:max-w-[280px] text-center md:text-left pointer-events-auto"
                >
                    <p className="text-[16px] md:text-[15px] font-inter font-medium leading-relaxed">
                        {t('description')}
                    </p>
                </motion.div>
            </div>

            {/* Bottom Fade Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[15vh] md:h-[6vh] bg-gradient-to-t from-[#ffffff] via-[#ffffff]/80 to-transparent z-30 pointer-events-none"></div>

        </main>
    );
}
