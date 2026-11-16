import { motion } from "motion/react";
import { useTrackAnalyser } from "@/hooks/useTrackAnalyser";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";

interface VoiceWaveformProps {
  trackRef?: TrackReferenceOrPlaceholder;
  barCount?: number;
  className?: string;
  color?: string;
}

/** Smooth, mirrored voice waveform driven by real track audio. */
export function VoiceWaveform({
  trackRef,
  barCount = 32,
  className = "",
  color = "var(--color-conf-accent)",
}: VoiceWaveformProps) {
  const { bands } = useTrackAnalyser(trackRef);
  const bars = bands.slice(0, barCount);

  return (
    <div className={`flex h-12 items-center justify-center gap-[2px] ${className}`}>
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className="w-[3px] origin-center rounded-full"
          animate={{ scaleY: Math.max(0.05, b) }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ background: color, height: "100%", width: 4 }}
        />
      ))}
    </div>
  );
}
