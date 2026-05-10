import { Outlet, useNavigate } from "react-router-dom"
import { FileText, HeartPulse, Plus, Search, History as HistoryIcon, ArrowLeft, LogOut } from "lucide-react"
import { useAuth } from "../hooks/AuthHook";
import { useChat } from "../hooks/ChatHook";

export const ChatborLayout = () => {
    const navigate = useNavigate()
    const { user, loading, logout } = useAuth();
    const {sessions} = useChat()
    return (
        <div className="fixed inset-0 flex bg-[#FAFBFF] animate-in fade-in duration-700 font-inter antialiased text-slate-800">
            {/* Sidebar - Refined & Clinical */}
            <aside className="w-60 border-r border-blue-100 flex flex-col bg-white shrink-0 relative z-10">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <HeartPulse size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-[15px] tracking-tight leading-none text-slate-900">AI Healthcare</h2>
                            <p className="text-[9px] tracking-[0.15em] text-slate-400 font-bold uppercase mt-1">Assistant</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 mb-4 rounded-lg text-[13px] transition-all duration-300 text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-100"
                    >
                        <ArrowLeft size={16} strokeWidth={2} />
                        Back to Dashboard
                    </button>

                    {[
                        { icon: Plus, label: 'New Consultation', active: true, navigate: '/chat' },
                        { icon: Search, label: 'Search', navigate: '/chat' },
                        { icon: FileText, label: 'Reports', navigate: '/chat' },
                        { icon: HistoryIcon, label: 'History', navigate: '/chat' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.navigate)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] transition-all duration-300 ${item.active
                                ? "bg-blue-100 text-[#0066FF] font-medium shadow-[0_4px_12px_rgba(0,102,255,0.03)]"
                                : "text-neutral-600 font-normal hover:bg-slate-100 hover:text-neutral-800"}`
                            }
                        >
                            <item.icon size={18} strokeWidth={2} className={item.active ? "text-[#0066FF]" : "text-neutral-400"} />
                            {item.label}
                        </button>
                    ))}

                    <div className="pt-8 pb-3 px-4">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Recent Activity</p>
                    </div>
                    {sessions.map((data) => (
                        <button key={data.sessionId}
                        onClick={()=> navigate(`/chat/c/${data.sessionId}`)}
                        className="w-full text-left px-4 py-2 rounded-xl text-[12px] text-neutral-600 font-light hover:bg-slate-100 hover:text-slate-700 truncate transition-all">
                            {data.chatName}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 mt-auto">
                    {loading ? (
                        <div className="p-2 text-sm text-slate-400 text-center">Loading...</div>
                    ) : user ? (
                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[11px] border border-blue-100 shadow-sm">
                                    {user.name ? user.name.substring(0, 2).toUpperCase() : 'AB'}
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                    <p className="text-[13px] font-semibold text-slate-900 truncate">{user.name || 'User'}</p>
                                    <p className="text-[11px] font-medium text-slate-500 capitalize truncate">{user.role || 'Patient'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => logout()}
                                className="p-2 shrink-0 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                title="Logout"
                            >
                                <LogOut size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                    ) : null}
                </div>
            </aside>

            {/* Main Workspace Wrapper */}
            <Outlet />
        </div>
    )
}
