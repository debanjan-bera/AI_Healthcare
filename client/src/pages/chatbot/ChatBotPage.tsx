import { Activity } from "lucide-react";
import ChatInputComponent from "../../components/ChatInputComponent";
import { useChat } from "../../hooks/ChatHook";


const ChatbotPage = () => {
    const { setInputValue } = useChat();

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#FAFBFF]">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="min-h-full w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center gap-12 animate-in fade-in zoom-in-95 duration-1000">

                    {/* Greeting Section */}
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-linear-to-tr from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_8px_30px_rgb(0,102,255,0.1)] border border-blue-100/50">
                            <Activity size={32} className="text-primary" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-4xl font-light text-slate-900 tracking-tight leading-tight">
                            How can I assist with your <span className="font-medium text-primary">health</span> today?
                        </h1>
                        <p className="text-slate-400 text-lg font-light max-w-md mx-auto">
                            Start a new consultation with your AI medical assistant for clinical guidance and health analysis.
                        </p>
                    </div>

                    {/* Chat Input Container - Premium Clinical Design */}
                    <div className="w-full flex flex-col items-center px-4">
                        <div className="w-full max-w-3xl group relative">
                            <ChatInputComponent isConversation={false}>

                                {/* Quick Suggestions - Premium Pills */}
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
                                            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-600 hover:bg-white hover:border-primary/30 hover:text-primary hover:shadow-[0_4px_20px_rgba(0,102,255,0.08)] transition-all duration-300 font-medium"
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
                <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/30 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default ChatbotPage;
