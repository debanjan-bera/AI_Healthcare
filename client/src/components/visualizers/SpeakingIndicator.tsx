import { motion } from "motion/react";

export type SpeakingKind = "idle" | "listening" | "thinking" | "speaking";

interface SpeakingIndicatorProps {
  kind: SpeakingKind;
  className?: string;
}

const COLOR: Record<SpeakingKind, string> = {
  idle: "var(--color-conf-muted)",
  listening: "var(--color-conf-live)",
  thinking: "#f5c451",
  speaking: "var(--color-conf-accent)",
};

const LABEL: Record<SpeakingKind, string> = {
  idle: "Idle",
  listening: "Listening",
  thinking: "Thinking",
  speaking: "Speaking",
};

/** Status dot that reflects the agent/user speaking state. */
export function SpeakingIndicator({ kind, className = "" }: SpeakingIndicatorProps) {
  const color = COLOR[kind];
  const active = kind === "speaking" || kind === "listening";

  return (
    <span className={`inline-flex items-center gap-2 text-xs font-medium ${className}`} style={{ color }}>
      <span className="relative flex h-2.5 w-2.5">
        {active && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            style={{ background: color }}
          />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      </span>
      {LABEL[kind]}
    </span>
  );
}
