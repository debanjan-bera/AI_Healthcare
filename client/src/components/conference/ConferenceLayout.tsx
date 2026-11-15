import type { ReactNode } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useCallTimer, formatElapsed } from "@/hooks/useCallTimer";
import { ControlBar, type ControlBarProps } from "./ControlBar";

export interface ConferenceLayoutProps extends ControlBarProps {
  title: string;
  subtitle: string;
  isReady: boolean;
  isFailed: boolean;
  /** The video stage / participant grid content. */
  children: ReactNode;
  /** Optional additional right-hand panel (e.g. chat). */
  extraSidebar?: ReactNode;
}

function NetworkIndicator({
  isReady,
  isFailed,
}: {
  isReady: boolean;
  isFailed: boolean;
}) {
  if (isFailed) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-conf-danger" title="Connection failed">
        <WifiOff size={14} /> Offline
      </span>
    );
  }
  if (!isReady) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-conf-muted" title="Connecting">
        <span className="h-2 w-2 rounded-full bg-conf-accent conf-connect-pulse" />
        Connecting
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-conf-live" title="Connected">
      <Wifi size={14} /> Stable
    </span>
  );
}

export function ConferenceLayout({
  title,
  subtitle,
  isReady,
  isFailed,
  children,
  onEndCall,
  onToggleChat,
  chatOpen,
  disableMedia,
  sharing,
  onToggleShare,
  extraSidebar,
}: ConferenceLayoutProps) {
  const elapsed = useCallTimer(isReady);

  return (
    <div className="conf-app flex h-screen w-full flex-col bg-conf-bg text-conf-text">
      {/* Header: title + live status + timer */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-conf-line px-4">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">{title}</h1>
          <p className="truncate text-[11px] text-conf-muted">{subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <NetworkIndicator isReady={isReady} isFailed={isFailed} />
          {isReady && (
            <span className="font-mono text-sm tabular-nums text-conf-text">
              {formatElapsed(elapsed)}
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Main stage */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <ControlBar
            isReady={isReady}
            onEndCall={onEndCall}
            onToggleChat={onToggleChat}
            chatOpen={chatOpen}
            disableMedia={disableMedia}
            sharing={sharing}
            onToggleShare={onToggleShare}
          />
        </main>

        {/* Extra panel (chat) */}
        {extraSidebar}
      </div>
    </div>
  );
}
