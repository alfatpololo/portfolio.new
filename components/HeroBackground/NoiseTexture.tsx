import React from "react";

/**
 * NoiseTexture Component
 * Renders an SVG turbulence noise texture layer with minimal opacity to give
 * the hero background a tactile, high-end SaaS aesthetic (similar to Vercel/Linear).
 */
export const NoiseTexture: React.FC = () => {
  return (
    <div className="aria-hidden:true pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.035] mix-blend-overlay">
      <svg className="h-full w-full">
        <filter id="hero-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#hero-noise-filter)"
        />
      </svg>
    </div>
  );
};
