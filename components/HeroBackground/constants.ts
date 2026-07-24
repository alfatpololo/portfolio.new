import { FloatingElementConfig, CapsuleConfig } from "./types";

/**
 * 10 Floating Geometric & Glassmorphism Elements
 * Configured with random-looking initial positions, varying scales, float durations,
 * and parallax depth layers for high visual interest & realistic spatial depth.
 */
export const FLOATING_ELEMENTS: FloatingElementConfig[] = [
  {
    id: "card-saas-metrics",
    type: "glass-card",
    top: "12%",
    left: "8%",
    scale: 0.95,
    depth: 0.8,
    rotation: -4,
    floatDuration: 7.2,
    floatDelay: 0,
    floatDistance: 16,
    title: "System Performance",
    subtitle: "99.98% ⚡ 60 FPS",
    iconType: "zap",
  },
  {
    id: "badge-next15",
    type: "code-badge",
    top: "18%",
    left: "75%",
    scale: 1.05,
    depth: 0.9,
    rotation: 6,
    floatDuration: 8.5,
    floatDelay: 1.2,
    floatDistance: 20,
    title: "<Engine v15.0 />",
    subtitle: "React 19 Core",
    iconType: "code",
  },
  {
    id: "ring-glowing-1",
    type: "glowing-ring",
    top: "58%",
    left: "5%",
    scale: 1.2,
    depth: 0.35,
    rotation: 45,
    floatDuration: 11.0,
    floatDelay: 0.5,
    floatDistance: 24,
  },
  {
    id: "chip-polygon-1",
    type: "polygon-chip",
    top: "72%",
    left: "82%",
    scale: 0.85,
    depth: 0.65,
    rotation: -12,
    floatDuration: 6.8,
    floatDelay: 2.1,
    floatDistance: 14,
    title: "GPU Accelerated",
    iconType: "cpu",
  },
  {
    id: "sphere-gradient-1",
    type: "gradient-sphere",
    top: "32%",
    left: "88%",
    scale: 1.1,
    depth: 0.45,
    rotation: 0,
    floatDuration: 9.6,
    floatDelay: 1.8,
    floatDistance: 18,
  },
  {
    id: "pill-metrics-1",
    type: "metrics-pill",
    top: "78%",
    left: "18%",
    scale: 0.9,
    depth: 0.75,
    rotation: 3,
    floatDuration: 7.8,
    floatDelay: 0.8,
    floatDistance: 15,
    title: "Security Shield",
    subtitle: "Encrypted",
    iconType: "shield",
  },
  {
    id: "card-code-preview",
    type: "glass-card",
    top: "62%",
    left: "68%",
    scale: 0.88,
    depth: 0.7,
    rotation: -5,
    floatDuration: 10.2,
    floatDelay: 2.5,
    floatDistance: 22,
    title: "Interactive Motion",
    subtitle: "Framer Motion 11",
    iconType: "sparkles",
  },
  {
    id: "chip-polygon-2",
    type: "polygon-chip",
    top: "10%",
    left: "48%",
    scale: 0.75,
    depth: 0.5,
    rotation: 15,
    floatDuration: 8.0,
    floatDelay: 3.0,
    floatDistance: 12,
    title: "TypeScript 5.0",
    iconType: "code",
  },
  {
    id: "ring-glowing-2",
    type: "glowing-ring",
    top: "22%",
    left: "32%",
    scale: 0.7,
    depth: 0.3,
    rotation: -30,
    floatDuration: 12.5,
    floatDelay: 1.0,
    floatDistance: 26,
  },
  {
    id: "sphere-gradient-2",
    type: "gradient-sphere",
    top: "82%",
    left: "45%",
    scale: 0.95,
    depth: 0.4,
    rotation: 0,
    floatDuration: 9.0,
    floatDelay: 0.3,
    floatDistance: 14,
  },
];

/**
 * Deterministically generates 120 static glowing capsules distributed evenly across the Hero canvas.
 * Deterministic pseudo-randomness ensures SSR & client-side hydration render identically.
 */
function generateCapsules(count: number = 120): CapsuleConfig[] {
  const capsules: CapsuleConfig[] = [];
  const gradients: CapsuleConfig["gradientType"][] = [
    "purple-blue",
    "blue-pink",
    "purple-pink",
    "indigo-cyan",
  ];

  // Pseudo-random helper (Mulberry32 PRNG with fixed seed)
  let seed = 4294967291;
  const pseudoRandom = () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const cols = 12;
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Calculate base position with random jitter
    const colWidth = 96 / cols;
    const rowHeight = 96 / rows;

    const leftVal = 2 + col * colWidth + pseudoRandom() * (colWidth * 0.8);
    const topVal = 2 + row * rowHeight + pseudoRandom() * (rowHeight * 0.8);

    const width = Math.floor(4 + pseudoRandom() * 10); // 4px to 14px length
    const height = Math.floor(2 + pseudoRandom() * 3); // 2px to 5px thickness
    const rotation = Math.floor(pseudoRandom() * 360 - 180);
    const opacity = Number((0.2 + pseudoRandom() * 0.4).toFixed(2)); // 0.20 to 0.60
    const depth = Number((0.25 + pseudoRandom() * 0.75).toFixed(2)); // 0.25 to 1.0
    const floatDuration = Number((4.5 + pseudoRandom() * 4.5).toFixed(1)); // 4.5s to 9.0s
    const floatDelay = Number((pseudoRandom() * 3.5).toFixed(1));
    const floatDistance = Math.floor(3 + pseudoRandom() * 5); // 3px to 8px float
    const gradientType = gradients[i % gradients.length];

    capsules.push({
      id: `capsule-${i}`,
      top: `${topVal.toFixed(2)}%`,
      left: `${leftVal.toFixed(2)}%`,
      width,
      height,
      rotation,
      opacity,
      depth,
      floatDuration,
      floatDelay,
      floatDistance,
      gradientType,
    });
  }

  return capsules;
}

export const CAPSULE_FIELD_ITEMS: CapsuleConfig[] = generateCapsules(120);
