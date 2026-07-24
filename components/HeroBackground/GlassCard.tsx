import React from "react";
import { FloatingElementConfig } from "./types";
import { FaCode, FaStar, FaMicrochip, FaShieldHalved, FaBolt } from "react-icons/fa6";

interface GlassCardProps {
  config: FloatingElementConfig;
}

export const GlassCard: React.FC<GlassCardProps> = ({ config }) => {
  const getIcon = () => {
    switch (config.iconType) {
      case "code":
        return <FaCode className="text-cyan-400 text-xs" />;
      case "sparkles":
        return <FaStar className="text-purple-400 text-xs" />;
      case "cpu":
        return <FaMicrochip className="text-indigo-400 text-xs" />;
      case "shield":
        return <FaShieldHalved className="text-emerald-400 text-xs" />;
      case "zap":
        return <FaBolt className="text-amber-400 text-xs" />;
      default:
        return null;
    }
  };

  switch (config.type) {
    case "glass-card":
      return (
        <div className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.07]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-inner">
            {getIcon()}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold text-gray-200 tracking-wide">
              {config.title}
            </span>
            {config.subtitle && (
              <span className="text-[10px] font-medium text-gray-400">
                {config.subtitle}
              </span>
            )}
          </div>
          {/* Subtle light streak highlight */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      );

    case "code-badge":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-950/20 px-3 py-1.5 backdrop-blur-md shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-mono text-[11px] font-medium text-purple-200">
            {config.title}
          </span>
        </div>
      );

    case "metrics-pill":
      return (
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 backdrop-blur-md shadow-md">
          {getIcon()}
          <span className="text-[10px] font-medium text-gray-300">
            {config.title}
          </span>
          {config.subtitle && (
            <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/20">
              {config.subtitle}
            </span>
          )}
        </div>
      );

    case "glowing-ring":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <div className="h-8 w-8 rounded-full border border-purple-400/40 bg-purple-500/10 animate-ping opacity-20" />
          <div className="absolute h-4 w-4 rounded-full bg-indigo-400/40 blur-xs" />
        </div>
      );

    case "polygon-chip":
      return (
        <div className="flex items-center gap-2 rounded-md border border-cyan-500/20 bg-cyan-950/20 px-2.5 py-1 backdrop-blur-md shadow-sm">
          {getIcon()}
          <span className="text-[10px] font-semibold tracking-wider text-cyan-200 uppercase">
            {config.title}
          </span>
        </div>
      );

    case "gradient-sphere":
      return (
        <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/10 backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(168,85,247,0.2)]">
          <div className="absolute top-1 left-2 h-3 w-3 rounded-full bg-white/40 blur-[1px]" />
        </div>
      );

    default:
      return null;
  }
};
