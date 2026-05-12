import { ArrowUp, FileText, Mic, Paperclip, Plus, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

import { useChat } from "../hooks/ChatHook";
type ChatInputProps = {
    isConversation?: boolean;
    children?: React.ReactNode;
};

const ChatInputComponent = ({ isConversation, children }: ChatInputProps) => {
    const { isMultiline, setIsMultiline, inputValue, setInputValue, textareaRef, handleSend, startConversation, handleFileUpload } = useChat();

    const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async()=>{
         if (isConversation) await handleSend();
            
            else await startConversation();
    }
    const handleKeyDown = async(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await onSubmit()
        }
    };

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            await handleFileUpload(file);
            setIsPlusMenuOpen(false);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto w-full pointer-events-auto">
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept=".pdf"
                className="hidden"
            />
            <div className={`relative flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-400 dark:border-slate-700 px-1.5 shadow-[0_8px_40px_-12px_rgba(0,102,255,0.15)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 focus-within:border-primary/40 dark:focus-within:border-blue-500/40 focus-within:shadow-[0_12px_50px_-10px_rgba(0,102,255,0.2)] dark:focus-within:shadow-[0_12px_50px_-10px_rgba(0,0,0,0.6)] ${isMultiline ? 'rounded-3xl' : 'rounded-4xl'}`}>

                <div className="flex items-end gap-2 mb-0.5">
                    {/* Left Side: Plus Menu */}
                    <div className="relative rounded-full  mb-1">
                        <button
                            onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
                            className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${isPlusMenuOpen ? 'bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-400 rotate-45' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-300/60 dark:hover:bg-slate-700 hover:text-slate-500 dark:hover:text-slate-400'}`}
                        >
                            <Plus size={22} strokeWidth={2.5} />
                        </button>

                        {/* Plus Popup Menu - Premium Styling */}
                        {isPlusMenuOpen && (
                            <div className="absolute bottom-full left-0 mb-4 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-3 animate-in fade-in zoom-in-95 slide-in-from-bottom-6 z-50 overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 to-transparent dark:from-blue-900/10 -z-10" />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full flex items-center gap-4 px-3 py-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-[20px] transition-all text-left group/item"
                                >
                                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:shadow-md transition-all">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-semibold text-slate-800 dark:text-white">Upload Lab Report</p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">PDF reports</p>
                                    </div>
                                </button>
                                {[{ icon: Paperclip, label: 'Medical Records', desc: 'All file types', color: 'text-emerald-500', bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-900/20' },
                                    { icon: Sparkles, label: 'AI Symptom Scan', desc: 'Visual analysis', color: 'text-purple-500', bg: 'bg-purple-50', darkBg: 'dark:bg-purple-900/20' },
                                ].map((item, i) => (
                                    <button key={i} className="w-full flex items-center gap-4 px-3 py-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-[20px] transition-all text-left group/item">
                                        <div className={`w-10 h-10 ${item.bg} ${item.darkBg} ${item.color} rounded-xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:shadow-md transition-all`}>
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-slate-800 dark:text-white">{item.label}</p>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{item.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main Textarea */}
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        placeholder="Ask AI Health Assistant anything..."
                        className="flex-1 min-h-11 max-h-55 py-3 px-2 resize-none border-none focus:ring-0 text-[16px] placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none font-normal text-slate-700 dark:text-slate-200 bg-transparent leading-relaxed"
                        rows={1}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = 'auto';
                            const newHeight = e.target.scrollHeight;
                            e.target.style.height = newHeight + 'px';
                            setIsMultiline(newHeight > 56);
                        }}
                    />

                    {/* Right Side: Mic & Send */}
                    <div className="flex items-center gap-1.5 mb-1 pr-1">
                        <button className="w-10 h-10 text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-primary dark:hover:text-blue-400 rounded-full transition-all flex items-center justify-center">
                            <Mic size={20} strokeWidth={1.5} />
                        </button>
                        <button
                        type="submit"
                            onClick={() => onSubmit()}
                            disabled={!inputValue.trim()}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inputValue.trim()
                                ? 'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-primary-dark dark:hover:bg-blue-700 hover:scale-105 active:scale-95'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            <ArrowUp size={20} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
            {children}
            <p className="text-center text-[11px] text-slate-400 mt-4 font-medium tracking-wide">
                AI can provide health information but is not a substitute for professional medical advice.
            </p>
        </div>
    )
}
export default ChatInputComponent
