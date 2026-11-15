import type { ReactNode } from "react";
import { Mic, MicOff } from "lucide-react";

export interface ParticipantTileProps {
  name: string;
  /** Subtitle under the name (role, e.g. "You"/"Bot"). */
  subtitle?: string;
  /** The rendered media element (video). Renders above the avatar. */
  media?: ReactNode;
  /** Alternative to `media` — passed through as the video layer. */
  children?: ReactNode;
  /** Optional image URL for the avatar layer (falls back to initial letter). */

  micOn: boolean;
  /** True when this participant is actively speaking. */
  speaking: boolean;
  className?: string;
}

export function ParticipantTile({
  name,
  subtitle,
  media,
  children,
  micOn,
  speaking,
  className = "",
}: ParticipantTileProps) {
  const video = children ?? media;
  return (
    <div
      className={`conf-tile relative flex h-full min-h-0 items-center max-w-full justify-center overflow-hidden rounded-2xl bg-[#0e1219] border border-transparent ${className}`}
      data-speaking={speaking || undefined}
    >
      {/* {speaking && (
        <span className="conf-connect-ring pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#3ce36a]/70" />
      )} */}

      {/* Avatar layer: always rendered, sits beneath the video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        {/* {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
        )} */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b222d] text-lg font-semibold text-conf-text">
            {name.charAt(0).toUpperCase()}
          </div>
        {/* {!video && (
          <span className="text-xs text-conf-muted">Camera off</span>
        )} */}
      </div>

      {/* Video layer: on top when present */}
      {video && <div className="absolute inset-0">{video}</div>}

      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/55 px-2.5 py-1.5 backdrop-blur-sm">
        {micOn ? (
          <Mic size={13} className="text-conf-text" />
        ) : (
          <MicOff size={13} className="text-conf-danger" />
        )}
        <span className="text-xs font-medium text-conf-text">{name}</span>
        {subtitle && (
          <span className="text-[10px] text-conf-muted">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
