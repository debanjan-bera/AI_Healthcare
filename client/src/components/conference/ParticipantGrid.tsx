import type { ReactNode } from "react";

export interface ParticipantGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive grid of participant tiles. Grid columns grow with panel width
 * and cap at three across so tiles stay watchable.
 */
export function ParticipantGrid({ children, className = "" }: ParticipantGridProps) {
  return (
    <div
      className={`grid h-full auto-rows-fr  ${className}`}
    >
      {children}
    </div>
  );
}
