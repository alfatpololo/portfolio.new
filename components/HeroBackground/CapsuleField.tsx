import React from "react";
import { MotionValue } from "framer-motion";
import { CAPSULE_FIELD_ITEMS } from "./constants";
import { CapsuleItem } from "./CapsuleItem";

interface CapsuleFieldProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * CapsuleField Component
 * Renders an elegant static field of ~120 glowing capsules (pill-shaped dashes).
 * Each capsule stays in its anchor position, floats with a tiny idle loop,
 * and responds to mouse cursor parallax with Framer Motion spring physics.
 */
export const CapsuleField: React.FC<CapsuleFieldProps> = ({ mouseX, mouseY }) => {
  return (
    <div className="aria-hidden:true pointer-events-none absolute inset-0 z-5 overflow-hidden">
      {CAPSULE_FIELD_ITEMS.map((config) => (
        <CapsuleItem
          key={config.id}
          config={config}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
};
