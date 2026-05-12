import { useRef, useEffect } from 'react';
import { Bot, MoreHorizontal, Copy, FileText, Pill } from 'lucide-react';

import { useChat } from '../../hooks/ChatHook';
import ChatInputComponent from '../../components/ChatInputComponent';


const ConversationPage = () => {
    const { messages, isTyping, chatLoading } = useChat()

    const messagesEndRef = useRef<HTMLDivElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, chatLoading]);



    return (
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#FAFBFF] dark:bg-slate-950 transition-colors duration-300">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                <div className="min-h-full w-full max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col">

                    <div className="space-y-6 md:space-y-8 pb-32 md:pb-24">
                        {chatLoading ? (
                            // Skeleton Loading State
                            <div className="space-y-8 animate-pulse">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`flex w-full gap-4 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] w-full ${i % 2 === 0 ? 'order-1' : 'order-2'}`}>
                                            <div className={`h-16 bg-slate-200/60 dark:bg-slate-800/60 rounded-[22px] ${i % 2 === 0 ? 'rounded-tr-none' : 'rounded-tl-none'}`} />
                                            <div className="mt-2 h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded-md mx-2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            messages.map((message, i) => (
                                <div
                                    key={message.m_id || i}
                                    className={`flex w-full gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                                >


                                    <div className={`max-w-[85%] group relative ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                                        <div className={`px-5 py-3.5 rounded-[22px] text-[15px] leading-relaxed ${message.role === 'user'
                                            ? 'bg-primary dark:bg-blue-600 text-white shadow-[0_4px_15px_rgba(0,102,255,0.2)] rounded-tr-none'
                                            : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none'
                                            }`}>
                                            {message.content}

                                            {message.role === 'assistant' && message.meta?.fileName && (
                                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                                                    <div className="flex items-center gap-2 text-[13px] font-semibold text-primary dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 px-3 py-2 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                                                        <FileText size={16} />
                                                        <span className="truncate">{message.meta.fileName}</span>
                                                    </div>
                                                    
                                                    {message.meta.medicines && message.meta.medicines.length > 0 && (
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                                                                <Pill size={14} className="text-emerald-500" />
                                                                Recommended Medicines / Found
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {message.meta.medicines.map((med, idx) => (
                                                                    <span key={idx} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[12px] font-medium rounded-lg border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-1.5 shadow-sm">
                                                                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                                                                        {med}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {message.role === 'assistant' && (
                                            <div className="flex items-center gap-3 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                                                    <Copy size={14} />
                                                </button>

                                                <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors ml-auto">
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            ))
                        )}

                        {isTyping && (
                            <div className="flex w-full gap-4 justify-start animate-pulse">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 shrink-0 mt-1">
                                    <Bot size={18} />
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-5 py-3.5 rounded-[22px] rounded-tl-none shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Sticky Chat Input Container - Glassmorphic Fixed Bottom */}
            <div className="w-full absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none bg-linear-to-t from-[#FAFBFF] dark:from-slate-950 via-[#FAFBFF]/80 dark:via-slate-950/80 to-transparent">

                <ChatInputComponent isConversation={true} />
            </div>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/30 dark:bg-blue-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 dark:bg-blue-900/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

        </div>
    );
};

export default ConversationPage;
