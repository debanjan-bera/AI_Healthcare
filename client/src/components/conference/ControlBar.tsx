import type { ReactNode } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageCircle,
  Settings,
  PhoneOff,
} from "lucide-react";
import {
  PipecatClientCamToggle,
  PipecatClientMicToggle,
} from "@pipecat-ai/client-react";

interface ControlButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  danger?: boolean;
  children: ReactNode;
}

function ControlButton({
  label,
  onClick,
  disabled,
  active,
  danger,
  children,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-150 ${
        danger
          ? "border-transparent bg-conf-danger text-white hover:bg-[#ff5a60]"
          : active
            ? "border-transparent bg-conf-accent text-white"
            : "border-conf-line bg-conf-raised text-conf-text hover:bg-[#242d3a]"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export interface ControlBarProps {
  isReady: boolean;
  onEndCall: () => void;
  onToggleChat: () => void;
  chatOpen: boolean;
  disableMedia: boolean;
  /** Screen share is active. */
  sharing: boolean;
  onToggleShare: () => void;
}

export function ControlBar({
  isReady,
  onEndCall,
  onToggleChat,
  chatOpen,
  disableMedia,
  sharing,
  onToggleShare,
}: ControlBarProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 px-4 py-4">
      <PipecatClientMicToggle>
        {({ disabled, isMicEnabled, onClick }) => (
          <ControlButton
            label={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
            onClick={onClick}
            disabled={disabled || disableMedia}
            active={!isMicEnabled}
          >
            {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </ControlButton>
        )}
      </PipecatClientMicToggle>

      <PipecatClientCamToggle>
        {({ disabled, isCamEnabled, onClick }) => (
          <ControlButton
            label={isCamEnabled ? "Turn camera off" : "Turn camera on"}
            onClick={onClick}
            disabled={disabled || disableMedia}
            active={!isCamEnabled}
          >
            {isCamEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </ControlButton>
        )}
      </PipecatClientCamToggle>

      <ControlButton
        label="Share screen"
        onClick={onToggleShare}
        disabled={!isReady}
        active={sharing}
      >
        <MonitorUp size={20} />
      </ControlButton>

      <ControlButton label="Chat" onClick={onToggleChat} active={chatOpen}>
        <MessageCircle size={20} />
      </ControlButton>

      <ControlButton label="Settings">
        <Settings size={20} />
      </ControlButton>

      <ControlButton label="End call" onClick={onEndCall} danger>
        <PhoneOff size={20} />
      </ControlButton>
    </div>
  );
}
