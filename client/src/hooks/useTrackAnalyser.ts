import { useMultibandTrackVolume, useTrackVolume } from "@livekit/components-react";
import { isTrackReference, type TrackReferenceOrPlaceholder } from "@livekit/components-core";

/**
 * Real-time audio levels for a LiveKit track reference.
 * Backed by the Web Audio API via LiveKit's analyser hooks (no simulation).
 */
export function useTrackAnalyser(trackRef?: TrackReferenceOrPlaceholder) {
  const resolved = trackRef && isTrackReference(trackRef) ? trackRef : undefined;
  const level = useTrackVolume(resolved);
  const bands = useMultibandTrackVolume(resolved, { bands: 12 });
  return { level, bands };
}
