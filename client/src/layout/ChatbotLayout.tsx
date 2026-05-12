import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { 
  FileText, HeartPulse, Plus, Search, 
  History as HistoryIcon, ArrowLeft, LogOut, 
  Menu, X, MoreHorizontal 
} from "lucide-react"
import { useAuth } from "../hooks/AuthHook";
import { useChat } from "../hooks/ChatHook";

export const ChatbotLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading, logout } = useAuth();
    const { sessions, createNewSession, currentSession } = useChat()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navigationItems = [
        { icon: Search, label: 'Search', path: '/chat/search' },
        { icon: FileText, label: 'Reports', path: '/chat/reports' },
        { icon: HistoryIcon, label: 'History', path: '/chat/history' },
    ];

    return (
        <div className="fixed inset-0 flex flex-col md:flex-row bg-[#FAFBFF] dark:bg-slate-950 transition-colors duration-300 font-inter antialiased text-slate-800 dark:text-slate-200">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <HeartPulse size={16} strokeWidth={2.5} />
                    </div>
                    <h2 className="font-semibold text-[14px] text-slate-900 dark:text-white">AI Healthcare</h2>
                </div>
                <button 
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col z-40 transition-transform duration-300 md:relative md:translate-x-0 md:z-10
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Brand Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <HeartPulse size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="font-bold text-[17px] text-slate-900 dark:text-white leading-none">AI Healthcare</h2>
                            <p className="text-[10px] tracking-[0.2em] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">Assistant</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                    {/* Back Button */}
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-sm mb-4"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </button>

                    {/* New Consultation Button */}
                    <button 
                        onClick={() => {
                            createNewSession();
                            setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 shadow-sm border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                    >
                        <Plus size={18} />
                        <span>New Consultation</span>
                    </button>

                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        {navigationItems.map((item) => (
                            <button
                                key={item.label}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium text-sm"
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Recent Activity Section */}
                    <div className="mt-8 px-4">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h3>
                        <div className="space-y-1">
                            {sessions?.length > 0 ? (
                                sessions.map((session: any) => (
                                    <button
                                        key={session.sessionId}
                                        onClick={() => {
                                            navigate(`/chat/c/${session.sessionId}`);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all truncate ${
                                            location.pathname.includes(session.sessionId)
                                                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                    >
                                        {session.chatName || "New Consultation"}
                                    </button>
                                ))
                            ) : (
                                <p className="px-4 text-xs text-slate-400 dark:text-slate-600 italic">No recent chats</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    {loading ? (
                        <div className="p-2 text-sm text-slate-400 text-center animate-pulse">Loading profile...</div>
                    ) : user ? (
                        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs border-2 border-white dark:border-slate-800 shadow-sm">
                                {user.name ? user.name.substring(0, 2).toUpperCase() : 'AB'}
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">{user.name || 'User'}</p>
                                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 capitalize truncate">{user.role || 'Patient'}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    logout();
                                }}
                                className="p-2 shrink-0 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors md:opacity-0 md:group-hover:opacity-100"
                                title="Logout"
                            >
                                <LogOut size={16} strokeWidth={2.5} />
                            </button>
                            <MoreHorizontal size={16} className="text-slate-300 dark:text-slate-600 md:group-hover:hidden" />
                        </div>
                    ) : null}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full relative">
                <Outlet />
            </main>
        </div>
    )
}
