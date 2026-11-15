import { useEffect, useState } from "react";

/**
 * Elapsed time in seconds since `active` became true.
 * Resets to 0 whenever the call leaves the active state.
 */
export function useCallTimer(active: boolean) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - start) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [active]);

  return active ? elapsed : 0;
}

export function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
