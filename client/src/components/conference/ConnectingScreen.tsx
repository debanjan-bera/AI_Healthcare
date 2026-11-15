import { AudioVisualizerWave } from "@/components/pipecat/audio-visualizer-wave";

export type ConnectMode = "idle" | "connecting" | "failed";

export interface ConnectingScreenProps {
  mode: ConnectMode;
  statusText: string;
  onStart: () => void;
}

/**
 * Full-screen pre-call stage. Reuses the existing shader visualizer
 * as the animated connection indicator, and surfaces the connecting /
 * connected / failed states with a smooth rise into the conference.
 */
export function ConnectingScreen({
  mode,
  statusText,
  onStart,
}: ConnectingScreenProps) {
  const connecting = mode === "connecting";

  return (
    <div className="conf-app flex h-screen w-full flex-col items-center justify-center bg-conf-bg px-6 text-conf-text">
      <div className="relative flex flex-col items-center">
        {/* Animated aura / connection indicator */}
        <div className="relative">
          <AudioVisualizerWave
            participantType="bot"
            isConnecting={connecting}
            size={220}
            themeMode="dark"
            color="var(--color-conf-accent)"
            accentColor="#3ce36a"
          />
          {connecting && (
            <>
              <span className="conf-connect-ring pointer-events-none absolute inset-0 rounded-full border-2 border-conf-accent" />
              <span className="conf-connect-ring pointer-events-none absolute inset-0 rounded-full border-2 border-conf-accent [animation-delay:0.9s]" />
            </>
          )}
          {mode === "failed" && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-4 w-4 rounded-full bg-conf-danger conf-connect-pulse" />
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            AI Video Consultation
          </h1>
          <p className="mt-2 max-w-sm text-sm text-conf-muted">{statusText}</p>

          {mode === "failed" ? (
            <button
              type="button"
              onClick={onStart}
              className="mt-6 rounded-full bg-conf-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8f66ff]"
            >
              Try again
            </button>
          ) : (
            <button
              type="button"
              onClick={onStart}
              disabled={connecting}
              className="mt-6 rounded-full bg-conf-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8f66ff] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {connecting ? "Connecting…" : "Start Consultation"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
