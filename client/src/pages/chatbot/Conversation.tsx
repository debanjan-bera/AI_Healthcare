import { useRef, useEffect } from 'react';
import { Bot, Copy, FileText, Pill, Check, Calendar, BookOpen, ChevronRight, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

import { useChat } from '../../hooks/ChatHook';
import ChatInputComponent from '../../components/ChatInputComponent';

const ConversationPage = () => {
    const { messages, isTyping, chatLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, chatLoading]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="flex-grow flex flex-col overflow-hidden relative bg-surface transition-colors duration-300">
            {/* Content Area */}
            <div className="flex-grow overflow-y-auto scroll-smooth custom-scrollbar pb-32">
                <div className="min-h-full w-full max-w-4xl mx-auto px-4 md:px-6 py-6 flex flex-col justify-end">
                    <div className="space-y-8">
                        {chatLoading ? (
                            // Skeleton Loading State
                            <div className="space-y-8 animate-pulse">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`flex w-full gap-4 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] w-full ${i % 2 === 0 ? 'order-1' : 'order-2'}`}>
                                            <div className={`h-16 bg-surface-container-high rounded-[22px] ${i % 2 === 0 ? 'rounded-tr-none' : 'rounded-tl-none'}`} />
                                            <div className="mt-2 h-3 w-24 bg-surface-container rounded-md mx-2" />
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
                                    {/* AI Assistant Avatar Icon */}
                                    {message.role === 'assistant' && (
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center text-primary mt-1 border border-primary/20">
                                            <Bot size={20} className="text-primary-container" />
                                        </div>
                                    )}

                                    <div className={`max-w-[85%] group relative ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                                        {message.role === 'user' ? (
                                            /* User Message Bubble: Sleek Dark Obsidian Box */
                                            <div className="bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-3xl rounded-tr-none shadow-sm">
                                                <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                                                <span className="text-[9px] opacity-60 mt-1.5 block text-right font-semibold">
                                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        ) : (
                                            /* AI Message Bubble: Clean Surface Box with Bento Highlights */
                                            <div className="space-y-4">
                                                <div className="bg-surface-container-lowest border border-outline-variant/20 p-5 md:p-6 rounded-3xl rounded-tl-none shadow-sm relative">
                                                    <p className="text-sm md:text-base leading-relaxed text-on-surface">{message.content}</p>

                                                    {/* File attachments analysis */}
                                                    {message.meta?.fileName && (
                                                        <div className="mt-4 pt-4 border-t border-outline-variant/20 space-y-3">
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/5 px-3.5 py-2.5 rounded-xl border border-primary/10">
                                                                <FileText size={16} />
                                                                <span className="truncate">{message.meta.fileName}</span>
                                                            </div>
                                                            
                                                            {message.meta.medicines && message.meta.medicines.length > 0 && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">
                                                                        <Pill size={14} className="text-primary-container" />
                                                                        Recommended Medicines / Found
                                                                    </div>
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                                        {message.meta.medicines.map((med, idx) => (
                                                                            <div key={idx} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
                                                                                <div className="w-6 h-6 bg-primary-container/20 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                                                                    <Check size={12} strokeWidth={3} />
                                                                                </div>
                                                                                <div>
                                                                                    <span className="font-bold text-xs block text-on-surface">{med}</span>
                                                                                    <p className="text-[10px] text-on-surface-variant mt-0.5">Please check prescriptions and guidelines before taking.</p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Default Stitch Action Buttons inside AI Consultation */}
                                                    {!message.meta?.fileName && message.content.toLowerCase().includes("metformin") && (
                                                        <div className="mt-5 space-y-4">
                                                            {/* Side effect items styled in low-surface boxes */}
                                                            <div className="space-y-2.5">
                                                                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
                                                                    <div className="w-6 h-6 bg-primary-container/20 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                                                        <Check size={12} strokeWidth={3} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold text-xs block text-on-surface">Digestive issues</span>
                                                                        <p className="text-[10px] text-on-surface-variant mt-0.5">The most common side effect, including nausea, bloating, or mild stomach discomfort.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-2xl border border-primary/10 transition-all hover:border-primary/30">
                                                                    <div className="w-6 h-6 bg-primary-container/20 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                                                        <Check size={12} strokeWidth={3} />
                                                                    </div>
                                                                    <div>
                                                                        <span className="font-bold text-xs block text-on-surface">Metallic taste</span>
                                                                        <p className="text-[10px] text-on-surface-variant mt-0.5">Many patients report a temporary metallic taste in the mouth during the first few weeks.</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Action buttons inside bubble */}
                                                            <div className="flex flex-wrap gap-2.5 pt-1">
                                                                <button 
                                                                    onClick={() => alert("Redirecting to appoinments schedule...")}
                                                                    className="bg-primary text-on-primary px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 hover:shadow-[0px_4px_20px_rgba(0,110,42,0.3)] transition-all active:scale-95"
                                                                >
                                                                    <Calendar size={14} />
                                                                    <span>Book Appointment</span>
                                                                </button>
                                                                <button 
                                                                    onClick={() => alert("Opening Metformin Medication Guidelines...")}
                                                                    className="border border-outline text-primary px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-primary-container/10 transition-all"
                                                                >
                                                                    <BookOpen size={14} />
                                                                    <span>Learn More</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Related Guide Attachment Card (Bento Style) */}
                                                    {!message.meta?.fileName && message.content.toLowerCase().includes("metformin") && (
                                                        <div className="mt-4 w-full max-w-md bg-gradient-to-br from-primary/5 to-secondary/5 border border-outline-variant/30 rounded-3xl p-4 flex gap-4 items-center group/guide cursor-pointer hover:border-primary/20 transition-all">
                                                            <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 bg-surface border border-outline-variant/20">
                                                                <img 
                                                                    alt="Medication" 
                                                                    className="w-full h-full object-cover group-hover/guide:scale-105 transition-transform" 
                                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQV7wSwfdUhv0wZkbRIAvqEycY0-CPiXkqkg4vFOxf25l_AC79FeS3y0s1kSVm3GWrYBNUDOlDex_3C-lsEnnzQhtpIuwCWEkpDgqWjsTR5ZuWURa2eyi6m84sSeXJCOIbv8isGrCkcwpdY_MI8JaB3hWVHqhkHR5wMRJ-gsFRTZNNL1mRQ7uvcZH_lFf3qDOahyBZOktkEzDt5SYHQMHGRLrFsBhjru0CLVDHgdgDgWRX6NwATiCDkPAZrtmo1a05ug_P1z0dJMR_"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-xs text-on-surface">Patient Guide: Metformin</h4>
                                                                <p className="text-[10px] text-on-surface-variant mt-0.5">Review the full clinical guidelines for your prescribed dosage.</p>
                                                            </div>
                                                            <ChevronRight size={16} className="text-primary group-hover/guide:translate-x-1 transition-transform" />
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-3 mt-4 px-1">
                                                        <span className="text-[9px] text-on-surface-variant/50 font-semibold">
                                                            MediAI Assistant • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        
                                                        <div className="flex gap-2 items-center ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            <button 
                                                                onClick={() => handleCopy(message.content)}
                                                                className="p-1 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-md transition-colors"
                                                                title="Copy response"
                                                            >
                                                                <Copy size={13} />
                                                            </button>
                                                            <button className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-md transition-colors">
                                                                <MoreHorizontal size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {isTyping && (
                            <div className="flex w-full gap-4 justify-start animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                                    <Bot size={20} className="text-primary-container" />
                                </div>
                                <div className="bg-surface-container-lowest border border-outline-variant/20 px-5 py-3.5 rounded-3xl rounded-tl-none shadow-sm flex items-center h-12">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Sticky Chat Input Container - Glassmorphic Fixed Bottom */}
            <div className="w-full absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none bg-linear-to-t from-background via-background/80 to-transparent">
                <ChatInputComponent isConversation={true} />
            </div>
            
            {/* Background Wash Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
};

export default ConversationPage;
