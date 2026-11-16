import { Mic, MicOff, PhoneOff, Volume2, VolumeX } from "lucide-react";

interface VoiceControlsProps {
  isConnected: boolean;
  micMuted: boolean;
  speakerMuted: boolean;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
  onEnd: () => void;
  className?: string;
}

function RoundButton({
  label,
  onClick,
  active,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-150 ${
        danger
          ? "border-transparent bg-conf-danger text-white hover:brightness-110"
          : active
            ? "border-transparent bg-conf-accent text-white"
            : "border-conf-line bg-conf-raised/80 text-conf-text hover:bg-conf-raised"
      }`}
    >
      {children}
    </button>
  );
}

/** Floating control bar: mic / speaker / end call. */
export function VoiceControls({
  isConnected,
  micMuted,
  speakerMuted,
  onToggleMic,
  onToggleSpeaker,
  onEnd,
  className = "",
}: VoiceControlsProps) {
  return (
    <div
      className={`pointer-events-auto flex items-center justify-center gap-3 rounded-2xl border border-conf-line bg-conf-surface/70 px-5 py-3 shadow-2xl backdrop-blur-md ${className}`}
    >
      <RoundButton label={micMuted ? "Unmute microphone" : "Mute microphone"} onClick={onToggleMic} active={micMuted}>
        {micMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </RoundButton>

      <RoundButton label={speakerMuted ? "Unmute speaker" : "Mute speaker"} onClick={onToggleSpeaker} active={speakerMuted}>
        {speakerMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </RoundButton>

      <span
        className={`mx-1 h-2 w-2 rounded-full ${isConnected ? "bg-conf-live" : "bg-conf-muted"}`}
        title={isConnected ? "Connected" : "Disconnected"}
      />

      <RoundButton label="End conversation" onClick={onEnd} danger>
        <PhoneOff size={20} />
      </RoundButton>
    </div>
  );
}
