import React from "react";
import { motion } from "framer-motion";

/**
 * GradientGlows Component
 * Renders multiple blurred ambient radial gradient spots that slowly pulsate
 * and float, establishing depth and dark-mode elegance inspired by modern SaaS designs.
 */
export const GradientGlows: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Primary Indigo/Violet Soft Glow Top-Center */}
      <motion.div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[450px] w-[650px] sm:w-[850px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-blue-500/10 blur-[120px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Cyan Ambient Glow Bottom-Left */}
      <motion.div
        className="absolute bottom-[-10%] -left-[10%] h-[350px] w-[450px] rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-transparent blur-[100px]"
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Tertiary Violet Ambient Glow Right Side */}
      <motion.div
        className="absolute top-[30%] -right-[5%] h-[400px] w-[500px] rounded-full bg-gradient-to-l from-purple-500/15 via-indigo-600/10 to-transparent blur-[110px]"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid line accent pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  );
};
