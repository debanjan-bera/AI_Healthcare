import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthHook';
import {
  Search, Bell, Calendar,
  Watch, FolderOpen, ChevronRight, Stethoscope, MessageSquare, Sparkles,
  Activity, FileText
} from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigation = (tab: string) => {
    switch (tab) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Pharmacy':
        navigate('/pharmacy');
        break;
      case 'Assistant':
        navigate('/chat');
        break;
      case 'Doctors':
        navigate('/doctors');
        break;
      case 'Appointment':
        navigate('/appointment');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-inter selection:bg-blue-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-slate-800 sticky top-0 z-50 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Stethoscope size={22} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-400 tracking-tight">HealthCore</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-50/80 dark:bg-slate-800/50 p-1 rounded-xl border border-gray-100 dark:border-slate-700">
            {['Dashboard', 'Pharmacy', 'Assistant'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavigation(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${tab === 'Dashboard'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-slate-600'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-slate-800/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <ThemeToggle />
            <button className="text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Search size={22} />
            </button>
            <button className="text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm ml-2 ring-2 ring-transparent hover:ring-blue-100 dark:hover:ring-blue-900 transition-all">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 mt-8 mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Good Morning, {user?.name ? user.name.split(' ')[0] : 'Patient'}!</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Here is your health overview for today.</p>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 gap-6 grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN - Health Trends & History */}
        {/* LEFT COLUMN - Health Trends & History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Heart Rate Trend */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 dark:border-slate-800 p-7 flex flex-col hover:border-blue-100 dark:hover:border-blue-900 transition-colors min-h-[300px] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Watch size={20} className="text-rose-500" />
                Health Metrics
                <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
              </h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 rounded-2xl flex items-center justify-center mb-4 text-rose-400 border border-rose-100 dark:border-rose-900/50 shadow-sm group-hover:rotate-12 transition-transform duration-500">
                <Activity size={28} strokeWidth={1.5} />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Device Not Syncing</p>
              <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-[280px] text-sm leading-relaxed">Connect your HealthCore wearable to track heart rate, sleep, and activity levels.</p>

              <button className="mt-6 px-6 py-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-bold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all flex items-center gap-2 hover:gap-3">
                Pair Device <ChevronRight size={16} />
              </button>
            </div>

            {/* Faded Background Graph */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.03] dark:opacity-[0.1] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L0,50 C100,50 150,90 250,90 C350,90 400,20 500,20 C600,20 650,70 750,70 C850,70 900,40 1000,40 L1000,100 Z" fill="currentColor" className="text-rose-600" />
              </svg>
            </div>
          </div>

          {/* Diagnosis History */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 dark:border-slate-800 p-7 flex flex-col hover:border-blue-100 dark:hover:border-blue-900 transition-colors min-h-[300px] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FolderOpen size={20} className="text-blue-500" />
                Medical Records
              </h3>
              <button className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">View All</button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 mt-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl flex items-center justify-center mb-4 text-blue-500 border border-blue-100 dark:border-blue-900/50 shadow-sm relative group-hover:-translate-y-2 transition-transform duration-500">
                  <FileText size={28} strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Secure Cloud Storage</p>
              <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-[280px] text-sm leading-relaxed">No medical records found. Upload your prescriptions or test results for AI analysis.</p>

              <button className="mt-6 px-6 py-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all flex items-center gap-2 hover:gap-3">
                Upload Document <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Quick Actions & Assistant */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Appointment Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 dark:border-slate-800 p-6 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-blue-500" />
                Next Appointment
              </h3>
              <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition-all">View Schedule</button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 flex items-center gap-4 group/item hover:bg-blue-100/50 dark:hover:bg-blue-900/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex flex-col items-center justify-center shadow-sm border border-blue-100/50 dark:border-slate-700">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">May</span>
                <span className="text-lg font-black text-slate-900 dark:text-white leading-none">15</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Dr. Rajesh Kumar</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cardiology • 10:30 AM</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-slate-700 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>


         

          <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(37,99,235,0.06)] p-6 flex flex-col items-center justify-center text-center group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/80 dark:bg-blue-900/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-800/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50/80 dark:bg-indigo-900/10 rounded-full blur-3xl -ml-10 -mb-10 transition-colors duration-700"></div>

            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></div>
              <div className="absolute inset-2 bg-blue-200/50 dark:bg-blue-800/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-50"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MessageSquare size={28} className="text-white" strokeWidth={2} />
                <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">AI Assistant</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-[200px] leading-relaxed text-sm">Need immediate medical advice? Start a quick chat with our AI healthcare assistant.</p>

            <button
              onClick={() => navigate('/chat')}
              className="relative overflow-hidden group/btn px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgb(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 flex items-center gap-2 w-full justify-center"
            >
              <MessageSquare size={18} />
              <span>Start Quick Chat</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
