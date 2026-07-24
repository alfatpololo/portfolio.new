import { MotionValue } from "framer-motion";

export type ElementType = "glass-card" | "code-badge" | "metrics-pill" | "glowing-ring" | "polygon-chip" | "gradient-sphere";

export interface FloatingElementConfig {
  id: string;
  type: ElementType;
  /** Initial top position as percentage string e.g. "15%" */
  top: string;
  /** Initial left position as percentage string e.g. "20%" */
  left: string;
  /** Relative scale / size factor */
  scale: number;
  /** Parallax depth factor (0.1 to 1.0) - higher moves faster with cursor */
  depth: number;
  /** Initial rotation angle in degrees */
  rotation: number;
  /** Slow float animation duration in seconds */
  floatDuration: number;
  /** Floating delay in seconds */
  floatDelay: number;
  /** Vertical float range in pixels */
  floatDistance: number;
  /** Content text or label for glass cards */
  title?: string;
  subtitle?: string;
  iconType?: "code" | "sparkles" | "cpu" | "shield" | "zap";
}

export interface FloatingElementProps {
  config: FloatingElementConfig;
  /** Smooth spring motion value representing normalized mouse X offset (-1 to 1) */
  mouseX: MotionValue<number>;
  /** Smooth spring motion value representing normalized mouse Y offset (-1 to 1) */
  mouseY: MotionValue<number>;
}
