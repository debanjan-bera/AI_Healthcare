import { motion } from "motion/react";
import { useTrackAnalyser } from "@/hooks/useTrackAnalyser";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";

interface AudioOrbProps {
  trackRef?: TrackReferenceOrPlaceholder;
  size?: number;
  className?: string;
  color?: string;
}

/** Audio-reactive orb: scales and glows with real track amplitude. */
export function AudioOrb({
  trackRef,
  size = 120,
  className = "",
  color = "var(--color-conf-accent)",
}: AudioOrbProps) {
  const { level } = useTrackAnalyser(trackRef);
  const scale = 0.9 + level * 0.35;

  return (
    <motion.div
      className={`relative rounded-full ${className}`}
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: 0.35 + level * 0.65 }}
        transition={{ duration: 0.15 }}
        style={{ background: `radial-gradient(circle at 35% 30%, ${color}, transparent 70%)`, filter: "blur(24px)" }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${color}cc, ${color}22 60%, transparent 75%)`,
          boxShadow: `0 0 ${20 + level * 60}px ${color}55`,
        }}
      />
      <div className="absolute inset-[22%] rounded-full bg-black/40" />
    </motion.div>
  );
}
