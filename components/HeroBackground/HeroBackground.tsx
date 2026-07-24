import React, { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { FLOATING_ELEMENTS } from "./constants";
import { FloatingElement } from "./FloatingElement";
import { GradientGlows } from "./GradientGlows";
import { NoiseTexture } from "./NoiseTexture";
import { CapsuleField } from "./CapsuleField";

export interface HeroBackgroundProps {
  className?: string;
}

/**
 * HeroBackground Component
 * Premium interactive hero background component inspired by SaaS platforms (Antigravity, Linear, Vercel).
 * Features:
 * - Interactive static field of 120 glowing capsules (rounded pill dashes)
 * - 10 floating geometric and glassmorphism elements
 * - Zero-re-render Framer Motion spring physics tracking cursor
 * - Ambient gradient glows & ultra-subtle noise texture
 * - pointer-events: none (completely unobtrusive to hero content)
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion values for normalized mouse positions (-1 to +1)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to container center normalized between -1 and 1
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      rawMouseX.set(normX);
      rawMouseY.set(normY);
    };

    const handleMouseLeave = () => {
      // Smoothly return elements back to original rest positions when mouse leaves
      rawMouseX.set(0);
      rawMouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawMouseX, rawMouseY]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Background Gradient Spot Glows */}
      <GradientGlows />

      {/* Tactile Noise Texture Layer */}
      <NoiseTexture />

      {/* Static Field of Glowing Pill Capsules */}
      <CapsuleField mouseX={rawMouseX} mouseY={rawMouseY} />

      {/* Layered Floating Geometric & Glassmorphism Elements */}
      <div className="absolute inset-0 z-10">
        {FLOATING_ELEMENTS.map((config) => (
          <FloatingElement
            key={config.id}
            config={config}
            mouseX={rawMouseX}
            mouseY={rawMouseY}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackground;
