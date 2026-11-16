import { useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useRemoteParticipants,
  useRoomContext,
  useTracks,
  useConnectionState,
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import { Loader2, Video, Mic } from "lucide-react";
import { AvatarStage } from "@/components/avatar/AvatarStage";
import { ConversationPanel } from "@/components/conversation/ConversationPanel";
import { VoiceControls } from "@/components/controls/VoiceControls";
import { AudioVisualizer } from "@/components/visualizers/AudioVisualizer";
import { VoiceWaveform } from "@/components/visualizers/VoiceWaveform";
import { SpeakingIndicator, type SpeakingKind } from "@/components/visualizers/SpeakingIndicator";
import { useTrackAnalyser } from "@/hooks/useTrackAnalyser";

const TOKEN_ENDPOINT = "http://localhost:8000/getToken";

/* ---------- Join screen ---------- */

function JoinScreen({
  loading,
  error,
  onJoin,
}: {
  loading: boolean;
  error: string | null;
  onJoin: () => void;
}) {
  return (
    <div className="conf-app flex h-screen w-full flex-col items-center justify-center bg-conf-bg px-6 text-conf-text">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-conf-accent/15">
          <Video size={36} className="text-conf-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Video Consultation</h1>
          <p className="mt-2 text-sm text-conf-muted">
            Connect with your AI healthcare assistant in a real-time video call.
          </p>
        </div>

        {error && (
          <p className="w-full rounded-xl border border-conf-danger/30 bg-conf-danger/10 px-4 py-2 text-xs text-conf-danger">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onJoin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-conf-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8f66ff] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Connecting…
            </>
          ) : (
            <>
              <Mic size={18} /> Join consultation
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- Conference view (inside LiveKitRoom) ---------- */

function ConferenceView({ onLeave }: { onLeave: () => void }) {
  const room = useRoomContext();
  const local = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const connectionState = useConnectionState(room);

  const agent = remoteParticipants[0];
  const agentIdentity = agent?.identity;

  const micRefs = useTracks([Track.Source.Microphone], { onlySubscribed: true });
  const camRefs = useTracks([Track.Source.Camera]);

  const aiMicRef = micRefs.find((r) => r.participant.identity === agentIdentity);
  const aiCamRef = camRefs.find((r) => r.participant.identity === agentIdentity);
  const localMicRef = micRefs.find((r) => r.participant.isLocal);

  const aiLevel = useTrackAnalyser(aiMicRef).level;
  const kind: SpeakingKind = aiLevel > 0.04
    ? "speaking"
    : agent
      ? "listening"
      : "idle";
  const isConnected = connectionState === ConnectionState.Connected;

  const toggleMic = async () => {
    await local.localParticipant.setMicrophoneEnabled(!local.isMicrophoneEnabled);
  };

  const toggleSpeaker = async () => {
    const track = aiMicRef?.publication.track;
    const next = !track?.attachedElements[0]?.volume;
    track?.attachedElements.forEach((el) => {
      el.volume = next ? 1 : 0;
    });
  };

  const [confirmEnd, setConfirmEnd] = useState(false);

  const endCall = async () => {
    setConfirmEnd(false);
    await room.disconnect();
    onLeave();
  };

  return (
    <div className="conf-app flex h-screen w-full flex-col bg-conf-bg text-conf-text">
      <RoomAudioRenderer room={room} />
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:flex-row">
        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <AvatarStage
            name={agent?.name ?? "AI Assistant"}
            kind={kind}
            aiTrackRef={aiCamRef}
            className="min-h-0 flex-1"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center">
            <VoiceWaveform trackRef={aiMicRef} color="var(--color-conf-accent)" />
          </div>

          <div className="pointer-events-none absolute left-6 top-6 flex flex-col items-start gap-2 rounded-2xl border border-conf-line bg-conf-surface/60 px-4 py-3 backdrop-blur-md">
            <span className="text-xs font-medium text-conf-muted">You</span>
            <AudioVisualizer
              trackRef={localMicRef}
              color="var(--color-conf-live)"
              barCount={16}
            />
          </div>
        </main>

        <ConversationPanel
          agentIdentity={agentIdentity}
          className="hidden w-80 shrink-0 rounded-3xl border border-conf-line lg:flex"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-end justify-center gap-3">
        <VoiceControls
          isConnected={isConnected}
          micMuted={!local.isMicrophoneEnabled}
          speakerMuted={false}
          onToggleMic={toggleMic}
          onToggleSpeaker={toggleSpeaker}
          onEnd={() => setConfirmEnd(true)}
        />
      </div>

      {confirmEnd && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-conf-line bg-conf-surface p-6 text-center shadow-2xl">
            <h3 className="text-lg font-semibold text-conf-text">End conversation?</h3>
            <p className="mt-2 text-sm text-conf-muted">
              This will disconnect you from the AI assistant.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmEnd(false)}
                className="flex-1 rounded-full border border-conf-line bg-conf-raised py-2.5 text-sm font-medium text-conf-text hover:bg-conf-line"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={endCall}
                className="flex-1 rounded-full bg-conf-danger py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                End call
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-4 top-4">
        <SpeakingIndicator kind={kind} />
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function LivKit() {
  const [token, setToken] = useState<string>();
  const [serverUrl, setServerUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(TOKEN_ENDPOINT, { method: "POST" });
      const data = await res.json();
      if (!data.participant_token || !data.server_url) {
        throw new Error("Invalid token response from server");
      }
      setToken(data.participant_token);
      setServerUrl(data.server_url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !serverUrl) {
    return <JoinScreen loading={loading} error={error} onJoin={join} />;
  }

  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      audio
      video={false}
      onDisconnected={() => {
        setToken(undefined);
        setServerUrl(undefined);
      }}
      className="h-screen"
    >
      <ConferenceView onLeave={() => setToken(undefined)} />
    </LiveKitRoom>
  );
}
