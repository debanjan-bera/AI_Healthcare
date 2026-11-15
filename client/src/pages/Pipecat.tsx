import { useCallback, useEffect, useRef, useState } from "react";

import {
  PipecatClient,
  RTVIEvent,
  type TransportState,
} from "@pipecat-ai/client-js";

import {
  PipecatClientProvider,
  PipecatClientAudio,
  PipecatClientVideo,
  usePipecatClient,
  usePipecatConversation,
  usePipecatClientTransportState,
  usePipecatClientScreenShareControl,
  useRTVIClientEvent,
  type ConversationMessage,
} from "@pipecat-ai/client-react";

import { SmallWebRTCTransport } from "@pipecat-ai/small-webrtc-transport";

import {
  Send,
  Paperclip,
  MessageCircle,
} from "lucide-react";

import { ConnectingScreen } from "@/components/conference/ConnectingScreen";
import { ConferenceLayout } from "@/components/conference/ConferenceLayout";
import {
  ParticipantGrid,
} from "@/components/conference/ParticipantGrid";
import { ParticipantTile } from "@/components/conference/ParticipantTile";

// --------------------------------------------------
// Pipecat Client
// --------------------------------------------------

const client = new PipecatClient({
  transport: new SmallWebRTCTransport(),
  enableMic: true,
  enableCam: true,
});

// --------------------------------------------------
// Provider
// --------------------------------------------------

export function PipecatProvider() {
  return (
    <PipecatClientProvider client={client}>
      <VoiceBot />
      <PipecatClientAudio />
    </PipecatClientProvider>
  );
}

// --------------------------------------------------
// Main Voice UI
// --------------------------------------------------

function VoiceBot() {
  const pcClient = usePipecatClient();
  const transportState = usePipecatClientTransportState();
  const { messages } = usePipecatConversation();
  const { isScreenShareEnabled, enableScreenShare } =
    usePipecatClientScreenShareControl();

  const [botSpeaking, setBotSpeaking] = useState(false);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(true);
  const [connectError, setConnectError] = useState(false);
  const [started, setStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isReady = transportState === "ready";

  // --------------------------------------------------
  // Transport events
  // --------------------------------------------------

  useRTVIClientEvent(
    RTVIEvent.TransportStateChanged,
    useCallback((state: TransportState) => {
      console.log("Transport state:", state);
      if (state === "ready") setConnectError(false);
    }, [])
  );

  useRTVIClientEvent(
    RTVIEvent.BotStartedSpeaking,
    useCallback(() => setBotSpeaking(true), [])
  );
  useRTVIClientEvent(
    RTVIEvent.BotStoppedSpeaking,
    useCallback(() => setBotSpeaking(false), [])
  );

  // --------------------------------------------------
  // Auto-scroll chat
  // --------------------------------------------------

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // --------------------------------------------------
  // Start session
  // --------------------------------------------------

  const startConversation = async () => {
    setStarted(true);
    setConnectError(false);
    try {
      await pcClient?.startBotAndConnect({
        endpoint: "http://localhost:7860/start",
        requestData: {
          transport: "webrtc",
        },
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      setConnectError(true);
    }
  };

  // --------------------------------------------------
  // Disconnect
  // --------------------------------------------------

  const disconnectConversation = async () => {
    setStarted(false);
    setConnectError(false);
    try {
      await pcClient?.disconnect();
    } catch (error) {
      console.error("Disconnect failed:", error);
    }
  };

  // --------------------------------------------------
  // Send text message
  // --------------------------------------------------

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || !isReady) return;
    try {
      setInput("");
      await pcClient?.sendText(message, {
        run_immediately: true,
        audio_response: true,
      });
    } catch (error) {
      console.error("Message sending failed:", error);
      setInput(message);
    }
  };

  // --------------------------------------------------
  // Message renderer
  // --------------------------------------------------

  const renderMessage = (message: ConversationMessage) => {
    return message.parts
      ?.map((part) => {
        const value = part.text;
        if (value && typeof value === "object" && "spoken" in value) {
          return `${value.spoken ?? ""}${value.unspoken ?? ""}`;
        }
        return typeof value === "string" ? value : "";
      })
      .join("");
  };

  // --------------------------------------------------
  // Connecting / pre-call screen
  // --------------------------------------------------

  if (!isReady) {
    const mode = connectError ? "failed" : started ? "connecting" : "idle";
    const statusText = connectError
      ? "We couldn't establish the connection. Please check that the Pipecat agent is running and try again."
      : started
        ? "Establishing secure WebRTC connection with your AI assistant…"
        : "Connect with your AI assistant for a real-time video consultation.";

    return (
      <ConnectingScreen
        mode={mode}
        statusText={statusText}
        onStart={startConversation}
      />
    );
  }

  // --------------------------------------------------
  // Conference window
  // --------------------------------------------------

  return (
    <ConferenceLayout
      title="AI Video Consultation"
      subtitle="Real-time AI assistant"
      isReady={isReady}
      isFailed={connectError}
      onEndCall={disconnectConversation}
      chatOpen={chatOpen}
      onToggleChat={() => setChatOpen((v) => !v)}
      disableMedia={false}
      sharing={isScreenShareEnabled}
      onToggleShare={() => enableScreenShare(!isScreenShareEnabled)}
      extraSidebar={chatOpen ? (
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          onClose={() => setChatOpen(false)}
          renderMessage={renderMessage}
          messagesEndRef={messagesEndRef}
          isReady={isReady}
        />
      ) : null}
    >
      <ParticipantGrid>
        <ParticipantTile
          name="AI Assistant"
          subtitle="Bot"
          micOn={true}
          speaking={botSpeaking}
        >
          <PipecatClientVideo participant="bot" fit="cover" className="h-full w-full" />
        </ParticipantTile>
      </ParticipantGrid>
          {/* <PipecatClientVideo participant="bot" fit="cover" /> */}

    </ConferenceLayout>
  );
}

// --------------------------------------------------
// Chat panel
// --------------------------------------------------

interface ChatPanelProps {
  messages: ConversationMessage[];
  input: string;
  setInput: (v: string) => void;
  sendMessage: (e: React.FormEvent) => void;
  onClose: () => void;
  renderMessage: (m: ConversationMessage) => string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
}

function ChatPanel({
  messages,
  input,
  setInput,
  sendMessage,
  onClose,
  renderMessage,
  messagesEndRef,
  isReady,
}: ChatPanelProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-l border-conf-line bg-conf-surface">
      <div className="flex items-center justify-between border-b border-conf-line px-4 py-3">
        <h2 className="text-sm font-semibold text-conf-text">Chat</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-1.5 text-conf-muted transition-colors hover:bg-conf-raised hover:text-conf-text"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 rounded-full bg-conf-accent-soft p-4 text-conf-accent">
              <MessageCircle size={24} />
            </div>
            <p className="text-sm font-medium text-conf-text">No messages yet</p>
            <p className="mt-1 text-xs text-conf-muted">
              Start a conversation with your AI assistant.
            </p>
          </div>
        )}

        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const content = renderMessage(message);
          if (!content.trim()) return null;

          return (
            <div
              key={`${message.createdAt}-${index}`}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[90%]">
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? "rounded-br-sm bg-conf-accent text-white"
                      : "rounded-bl-sm bg-conf-raised text-conf-text"
                  }`}
                >
                  {content}
                </div>
                <p
                  className={`mt-1 text-[10px] text-conf-muted ${
                    isUser ? "text-right" : "text-left"
                  }`}
                >
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="shrink-0 border-t border-conf-line p-3">
        <div className="flex items-center gap-2 rounded-xl bg-conf-raised px-3 py-2.5">
          <button
            type="button"
            className="text-conf-muted"
            title="Attachment"
            aria-label="Attachment"
          >
            <Paperclip size={17} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your message…"
            disabled={!isReady}
            className="min-w-0 flex-1 bg-transparent text-sm text-conf-text outline-none placeholder:text-conf-muted"
          />
          <button
            type="submit"
            disabled={!isReady || !input.trim()}
            className="rounded-lg p-1.5 text-conf-accent transition-colors hover:bg-conf-accent-soft disabled:opacity-40"
            title="Send message"
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </div>
      </form>
    </aside>
  );
}
