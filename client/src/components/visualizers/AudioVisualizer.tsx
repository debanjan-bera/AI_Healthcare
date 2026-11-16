import { useTrackAnalyser } from "@/hooks/useTrackAnalyser";
import type { TrackReferenceOrPlaceholder } from "@livekit/components-core";

interface AudioVisualizerProps {
  trackRef?: TrackReferenceOrPlaceholder;
  barCount?: number;
  className?: string;
  color?: string;
}

function Bar({ height, color }: { height: number; color: string }) {
  return (
    <span
      className="w-[3px] rounded-full transition-[height] duration-150 ease-out"
      style={{ height: `${Math.max(4, height * 100)}%`, background: color }}
    />
  );
}

/** Multi-bar spectrum visualizer driven by real track audio. */
export function AudioVisualizer({
  trackRef,
  barCount = 24,
  className = "",
  color = "var(--color-conf-accent)",
}: AudioVisualizerProps) {
  const { bands } = useTrackAnalyser(trackRef);
  const bars = bands.slice(0, barCount);

  return (
    <div className={`flex h-16 items-center justify-center gap-[3px] ${className}`}>
      {bars.map((b, i) => (
        <Bar key={i} height={b} color={color} />
      ))}
    </div>
  );
}
