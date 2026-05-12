import { Activity } from "lucide-react";
import ChatInputComponent from "../../components/ChatInputComponent";
import { useChat } from "../../hooks/ChatHook";


const ChatbotPage = () => {
    const { setInputValue } = useChat();

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#FAFBFF] dark:bg-slate-950 transition-colors duration-300">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="min-h-full w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col items-center justify-center gap-8 md:gap-12 animate-in fade-in zoom-in-95 duration-1000">

                    {/* Greeting Section */}
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-tr from-primary/15 to-primary/5 dark:from-blue-900/20 dark:to-blue-900/5 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-8 shadow-[0_8px_30px_rgb(0,102,255,0.1)] border border-blue-100/50 dark:border-blue-900/30">
                            <Activity size={28} className="text-primary dark:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-light text-slate-900 dark:text-white tracking-tight leading-tight px-2">
                            How can I assist with your <span className="font-medium text-primary dark:text-blue-400">health</span> today?
                        </h1>
                        <p className="text-slate-400 dark:text-slate-500 text-base md:text-lg font-light max-w-md mx-auto px-4">
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
                                            className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[13px] text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:border-primary/30 dark:hover:border-blue-700 hover:text-primary dark:hover:text-blue-400 hover:shadow-[0_4px_20px_rgba(0,102,255,0.08)] transition-all duration-300 font-medium"
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
                <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/30 dark:bg-blue-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 dark:bg-blue-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
            </div>
        </div>
    );
};

export default ChatbotPage;
