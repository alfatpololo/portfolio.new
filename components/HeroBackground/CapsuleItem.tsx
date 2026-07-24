import React from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { CapsuleItemProps } from "./types";

/**
 * CapsuleItem Component
 * Renders an individual static glowing capsule (rounded pill-shaped dash) with:
 * - Tiny slow float idle animation
 * - Smooth spring parallax attraction (max 10-20px) based on depth
 * - Gradient colors (purple -> blue -> pink) with 20%-60% opacity
 */
export const CapsuleItem: React.FC<CapsuleItemProps> = ({
  config,
  mouseX,
  mouseY,
}) => {
  // Parallax displacement scaled by depth layer (max 15px at depth=1.0)
  const maxDisplacementPx = 15 * config.depth;

  const targetX = useTransform(mouseX, [-1, 1], [-maxDisplacementPx, maxDisplacementPx]);
  const targetY = useTransform(mouseY, [-1, 1], [-maxDisplacementPx, maxDisplacementPx]);

  const springX = useSpring(targetX, {
    stiffness: 45,
    damping: 25,
    mass: 0.7,
  });

  const springY = useSpring(targetY, {
    stiffness: 45,
    damping: 25,
    mass: 0.7,
  });

  const getGradientClass = () => {
    switch (config.gradientType) {
      case "purple-blue":
        return "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]";
      case "blue-pink":
        return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.4)]";
      case "purple-pink":
        return "bg-gradient-to-r from-purple-600 to-pink-500 shadow-[0_0_8px_rgba(147,51,234,0.4)]";
      case "indigo-cyan":
        return "bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]";
      default:
        return "bg-gradient-to-r from-purple-500 to-pink-500";
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        top: config.top,
        left: config.left,
        x: springX,
        y: springY,
        rotate: config.rotation,
        zIndex: Math.floor(config.depth * 5),
      }}
      className="pointer-events-none select-none will-change-transform"
    >
      {/* Inner float wrapper */}
      <motion.div
        animate={{
          y: [-config.floatDistance / 2, config.floatDistance / 2, -config.floatDistance / 2],
          opacity: [config.opacity * 0.8, config.opacity, config.opacity * 0.8],
        }}
        transition={{
          duration: config.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: config.floatDelay,
        }}
        className={`rounded-full ${getGradientClass()}`}
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
        }}
      />
    </motion.div>
  );
};
