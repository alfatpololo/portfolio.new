import React from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { FloatingElementProps } from "./types";
import { GlassCard } from "./GlassCard";

/**
 * FloatingElement Component
 * Renders an individual floating geometric/glass element with:
 * 1. Infinite slow Y-floating loop animation
 * 2. Parallax mouse attraction using Framer Motion springs (max 15-20px based on depth layer)
 * 3. Hardware-accelerated transforms targeting 60fps without React re-renders.
 */
export const FloatingElement: React.FC<FloatingElementProps> = ({
  config,
  mouseX,
  mouseY,
}) => {
  // Max pixel attraction at depth=1.0 is 20px
  const maxAttractionPx = 20 * config.depth;

  // Map normalized mouse coords (-1 to 1) to depth-based pixel displacement
  const targetX = useTransform(mouseX, [-1, 1], [-maxAttractionPx, maxAttractionPx]);
  const targetY = useTransform(mouseY, [-1, 1], [-maxAttractionPx, maxAttractionPx]);

  // Apply spring physics so movement glides naturally toward cursor without snapping
  const springX = useSpring(targetX, {
    stiffness: 50,
    damping: 25,
    mass: 0.8,
  });
  
  const springY = useSpring(targetY, {
    stiffness: 50,
    damping: 25,
    mass: 0.8,
  });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: config.top,
        left: config.left,
        x: springX,
        y: springY,
        scale: config.scale,
        rotate: config.rotation,
        zIndex: Math.floor(config.depth * 10),
      }}
      className="pointer-events-none select-none will-change-transform"
      initial={{ opacity: 0, scale: config.scale * 0.8 }}
      animate={{ opacity: 1, scale: config.scale }}
      transition={{
        duration: 1.2,
        delay: config.floatDelay * 0.5,
        ease: "easeOut",
      }}
    >
      {/* Inner wrapper for continuous floating animation loop */}
      <motion.div
        animate={{
          y: [-config.floatDistance / 2, config.floatDistance / 2, -config.floatDistance / 2],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: config.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: config.floatDelay,
        }}
      >
        <GlassCard config={config} />
      </motion.div>
    </motion.div>
  );
};
