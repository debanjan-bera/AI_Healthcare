import { VideoTrack, type TrackReference } from "@livekit/components-react";
import { AudioOrb } from "@/components/visualizers/AudioOrb";
import { SpeakingIndicator, type SpeakingKind } from "@/components/visualizers/SpeakingIndicator";

interface AvatarStageProps {
  name: string;
  kind: SpeakingKind;
  aiTrackRef?: TrackReference;
  className?: string;
}

/** Large immersive avatar area: AI video if available, else a reactive orb. */
export function AvatarStage({ name, kind, aiTrackRef, className = "" }: AvatarStageProps) {
  const aiSpeaking = kind === "speaking";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-conf-line bg-[radial-gradient(circle_at_50%_35%,#1b2230_0%,#0b0e13_70%)] ${className}`}
    >
      {/* ambient glow behind the avatar when AI speaks */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: aiSpeaking ? 0.9 : 0.25,
          background:
            "radial-gradient(circle at 50% 45%, rgba(124,77,255,0.35) 0%, transparent 60%)",
        }}
      />

      {aiTrackRef ? (
        <VideoTrack trackRef={aiTrackRef} className="h-full w-full object-cover" />
      ) : (
        <AudioOrb trackRef={aiTrackRef} size={200} />
      )}

      {/* name + status overlay */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-conf-line bg-conf-surface/70 px-4 py-2 backdrop-blur-md">
        <span className="text-sm font-semibold text-conf-text">{name}</span>
        <span className="h-1 w-1 rounded-full bg-conf-line" />
        <SpeakingIndicator kind={kind} />
      </div>
    </div>
  );
}
