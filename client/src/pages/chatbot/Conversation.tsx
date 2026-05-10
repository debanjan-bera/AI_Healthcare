import { useRef, useEffect } from 'react';
import { Bot, MoreHorizontal, Copy, FileText, Pill } from 'lucide-react';

import { useChat } from '../../hooks/ChatHook';
import ChatInputComponent from '../../components/ChatInputComponent';


const ConversationPage = () => {
    const { messages, isTyping } = useChat()

    const messagesEndRef = useRef<HTMLDivElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);



    return (
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#FAFBFF]">
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                <div className="min-h-full w-full max-w-4xl mx-auto px-6 py-8 flex flex-col">

                    <div className="space-y-8 pb-24">
                        {messages.map((message, i) => (
                            <div
                                key={message.m_id || i}
                                className={`flex w-full gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                            >


                                <div className={`max-w-[85%] group relative ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                                    <div className={`px-5 py-3.5 rounded-[22px] text-[15px] leading-relaxed ${message.role === 'user'
                                        ? 'bg-primary text-white shadow-[0_4px_15px_rgba(0,102,255,0.2)] rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
                                        }`}>
                                        {message.content}

                                        {message.role === 'assistant' && message.meta?.fileName && (
                                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                                <div className="flex items-center gap-2 text-[13px] font-semibold text-primary bg-blue-50/50 px-3 py-2 rounded-xl border border-blue-100/50">
                                                    <FileText size={16} />
                                                    <span className="truncate">{message.meta.fileName}</span>
                                                </div>
                                                
                                                {message.meta.medicines && message.meta.medicines.length > 0 && (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider px-1">
                                                            <Pill size={14} className="text-emerald-500" />
                                                            Recommended Medicines / Found
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {message.meta.medicines.map((med, idx) => (
                                                                <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[12px] font-medium rounded-lg border border-emerald-100 flex items-center gap-1.5 shadow-sm">
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
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-md transition-colors">
                                                <Copy size={14} />
                                            </button>

                                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors ml-auto">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>


                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex w-full gap-4 justify-start animate-pulse">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-primary shrink-0 mt-1">
                                    <Bot size={18} />
                                </div>
                                <div className="bg-white border border-slate-100 px-5 py-3.5 rounded-[22px] rounded-tl-none shadow-sm">
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
            <div className="w-full absolute bottom-0 left-0 right-0 p-6 pointer-events-none bg-white">

                <ChatInputComponent isConversation={true} />
            </div>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/30 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        </div>
    );
};

export default ConversationPage;
