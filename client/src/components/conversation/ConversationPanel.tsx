import { useEffect, useRef } from "react";
import { useTranscriptions, useRoomContext } from "@livekit/components-react";

interface ConversationPanelProps {
  agentIdentity?: string;
  className?: string;
}

/** Live transcript panel. Distinguishes user vs AI by participant identity. */
export function ConversationPanel({ agentIdentity, className = "" }: ConversationPanelProps) {
  const room = useRoomContext();
  const transcriptions = useTranscriptions({ room });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcriptions]);

  return (
    <aside className={`flex flex-col bg-conf-bg/80 backdrop-blur-md ${className}`}>
      <header className="border-b border-conf-line px-4 py-3">
        <h2 className="text-sm font-semibold text-conf-text">Live transcript</h2>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {transcriptions.length === 0 && (
          <p className="text-center text-xs text-conf-muted">No speech yet.</p>
        )}
        {transcriptions.map((t, i) => {
          const isUser = t.participantInfo.identity !== agentIdentity;
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  isUser
                    ? "rounded-br-sm bg-conf-accent text-white"
                    : "rounded-bl-sm bg-conf-raised text-conf-text"
                }`}
              >
                {t.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </aside>
  );
}
