import { HeartPulse } from "lucide-react";
import ChatInputComponent from "../../components/ChatInputComponent";
import { useChat } from "../../hooks/ChatHook";

const ChatbotPage = () => {
    const { setInputValue } = useChat();

    return (
        <div className="flex-grow flex flex-col overflow-hidden relative bg-surface transition-colors duration-300">
            {/* Content Area */}
            <div className="flex-grow overflow-y-auto">
                <div className="min-h-full w-full max-w-4xl mx-auto px-4 md:px-6 py-12 flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in-95 duration-700">

                    {/* Greeting Section */}
                    <div className="text-center space-y-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(0,110,42,0.1)] border border-primary/20">
                            <HeartPulse size={28} className="text-primary animate-pulse" strokeWidth={1.5} />
                        </div>
                        <h1 className="font-display text-2xl md:text-4xl font-light text-on-surface tracking-tight leading-tight px-2">
                            How can I assist with your <span className="font-bold text-primary">health</span> today?
                        </h1>
                        <p className="text-on-surface-variant text-base md:text-lg font-light max-w-md mx-auto px-4">
                            Start a new consultation with your AI medical assistant for clinical guidance and health analysis.
                        </p>
                    </div>

                    {/* Chat Input Container */}
                    <div className="w-full flex flex-col items-center px-4">
                        <div className="w-full max-w-3xl group relative">
                            <ChatInputComponent isConversation={false}>
                                {/* Quick Suggestions */}
                                <div className="flex flex-wrap justify-center gap-3 mt-10">
                                    {[
                                        "Analyze My Blood Test",
                                        "Explain Fever Symptoms",
                                        "Is this medicine safe?",
                                        "Find a local specialist"
                                    ].map((tip, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInputValue(tip)}
                                            className="px-6 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl text-xs text-on-surface-variant hover:border-primary/30 hover:text-primary hover:shadow-[0_4px_20px_rgba(0,110,42,0.08)] transition-all duration-300 font-semibold"
                                        >
                                            {tip}
                                        </button>
                                    ))}
                                </div>
                            </ChatInputComponent>
                        </div>
                    </div>

                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default ChatbotPage;
