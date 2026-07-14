"use client";

import { motion } from "framer-motion";
import { FaAws } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiFramer,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiDocker,
  SiGit,
  SiGraphql,
  SiVercel,
  SiHtml5,
  SiCss,
  SiJavascript
} from "react-icons/si";

const languagesRow1 = [
  { name: "React", icon: SiReact, color: "#000000ff" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000ff" },
  { name: "TypeScript", icon: SiTypescript, color: "#000000ff" },
  { name: "Node.js", icon: SiNodedotjs, color: "#000000ff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#000000ff" },
  { name: "Figma", icon: SiFigma, color: "#000000ff" },
  { name: "Framer", icon: SiFramer, color: "#000000ff" },
  { name: "HTML5", icon: SiHtml5, color: "#000000ff" },
  { name: "CSS3", icon: SiCss, color: "#000000ff" },
];

const languagesRow2 = [
  { name: "PostgreSQL", icon: SiPostgresql, color: "#000000ff" },
  { name: "MongoDB", icon: SiMongodb, color: "#000000ff" },
  { name: "Python", icon: SiPython, color: "#000000ff" },
  { name: "AWS", icon: FaAws, color: "#000000ff" },
  { name: "Docker", icon: SiDocker, color: "#000000ff" },
  { name: "Git", icon: SiGit, color: "#000000ff" },
  { name: "GraphQL", icon: SiGraphql, color: "#000000ff" },
  { name: "Vercel", icon: SiVercel, color: "#000000ff" },
  { name: "JavaScript", icon: SiJavascript, color: "#000000ff" },
];

const MarqueeItem = ({ item }: { item: { name: string, icon: any, color: string } }) => {
  const Icon = item.icon;
  return (
    <div
      className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 mx-3 border border-gray-100 transition-transform duration-300"
      title={item.name}
    >
      <Icon className="w-10 h-10 md:w-14 md:h-14" style={{ color: item.color }} />
    </div>
  );
};

export default function Languages() {
  return (
    <section className="relative w-full py-8 overflow-hidden bg-[#ffffff] flex flex-col items-center">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.1,
        }}
      ></motion.div>
      {/* Marquee Rows */}
      <div className="relative w-full flex flex-col gap-6 overflow-hidden">
        {/* Row 1 - Moves Left */}
        <div className="flex w-fit">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 100,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Duplicated for seamless infinite loop */}
            {[...languagesRow1, ...languagesRow1, ...languagesRow1, ...languagesRow1].map((item, idx) => (
              <MarqueeItem key={idx} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-fit">
          <motion.div
            className="flex"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 100,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...languagesRow2, ...languagesRow2, ...languagesRow2, ...languagesRow2].map((item, idx) => (
              <MarqueeItem key={idx} item={item} />
            ))}
          </motion.div>
        </div>
      </div>


    </section>
  );
}
