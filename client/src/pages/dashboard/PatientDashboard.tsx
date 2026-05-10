import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthHook';
import { 
  Search, Bell, User, Calendar, 
  Pill, Activity, FileText, AlertCircle, Plus, Watch, FolderOpen, ChevronRight, Stethoscope, MessageSquare, Sparkles
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#F8FAFC] font-inter selection:bg-blue-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Stethoscope size={22} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">HealthCore</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1 rounded-xl border border-gray-100">
            {['Dashboard', 'Pharmacy', 'Assistant', 'Doctors', 'Appointment'].map((tab) => (
              <button 
                key={tab}
                onClick={() => handleNavigation(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  tab === 'Dashboard' 
                    ? 'bg-white text-blue-600 shadow-sm border border-gray-200/50' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
              <Search size={22} />
            </button>
            <button className="text-gray-400 hover:text-gray-900 transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center cursor-pointer border-2 border-white shadow-sm ml-2 ring-2 ring-transparent hover:ring-blue-100 transition-all">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 mt-8 mb-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Good Morning, {user?.name ? user.name.split(' ')[0] : 'Patient'}!</h1>
        <p className="text-gray-500 mt-1">Here is your health overview for today.</p>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 gap-6 grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT PANEL - Quick Chat Action */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative overflow-hidden bg-white border border-blue-100 rounded-3xl shadow-[0_8px_30px_rgb(37,99,235,0.06)] p-6 flex flex-col items-center justify-center text-center h-full min-h-[380px] group hover:border-blue-200 transition-colors">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/80 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100/80 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50/80 rounded-full blur-3xl -ml-10 -mb-10 transition-colors duration-700"></div>
            
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-100/50 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></div>
              <div className="absolute inset-2 bg-blue-200/50 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-50"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MessageSquare size={28} className="text-white" strokeWidth={2} />
                <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">AI Assistant</h3>
            <p className="text-gray-500 mb-6 max-w-[200px] leading-relaxed text-sm">Need immediate medical advice? Start a quick chat with our AI healthcare assistant.</p>
            
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

        {/* CENTER MAIN PANEL */}
        <div className="lg:col-span-6 space-y-6">
          {/* Heart Rate Trend - Premium Empty */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-7 flex flex-col hover:border-blue-100 transition-colors min-h-[280px] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Heart Rate Trend
                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-xs font-semibold">Live</span>
              </h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl flex items-center justify-center mb-4 text-rose-400 border border-rose-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Watch size={28} strokeWidth={1.5} />
              </div>
              <p className="text-lg font-bold text-gray-900">No Devices Connected</p>
              <p className="text-gray-500 mt-2 max-w-[280px] text-sm">Pair a smartwatch or medical tracker to automatically sync real-time heart rate data.</p>
              
              <button className="mt-6 px-6 py-2.5 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-100 transition-colors flex items-center gap-2">
                Connect Device <ChevronRight size={16} />
              </button>
            </div>
            
            {/* Faded Background Graph representing empty state */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L0,50 C100,50 150,90 250,90 C350,90 400,20 500,20 C600,20 650,70 750,70 C850,70 900,40 1000,40 L1000,100 Z" fill="currentColor" className="text-gray-900" />
              </svg>
            </div>
          </div>

          {/* Diagnosis History - Premium Empty */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-7 flex flex-col flex-1 hover:border-blue-100 transition-colors min-h-[280px] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-lg font-bold text-gray-900">Diagnosis History</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 mt-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-blue-500 border border-blue-100 shadow-sm relative group-hover:-translate-y-2 transition-transform duration-500">
                  <FolderOpen size={28} strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">Clear Medical Record</p>
              <p className="text-gray-500 mt-2 max-w-[280px] text-sm">There are no previous diagnoses or medical documents uploaded yet.</p>
              
              <button className="mt-6 px-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors flex items-center gap-2">
                Upload Record <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Premium Empty Widgets */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-6 hover:shadow-lg transition-all duration-300 group">
            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar size={18} className="text-gray-400 group-hover:text-teal-500 transition-colors" /> Appointments
            </h3>
            <div className="flex flex-col items-center justify-center text-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 group-hover:border-teal-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 text-gray-300 group-hover:text-teal-400 transition-colors">
                <Calendar size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-gray-700">No upcoming visits</p>
              <p className="text-xs text-gray-400 mt-1">Book a consultation.</p>
            </div>
          </div>

          {/* Current Medications */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-6 hover:shadow-lg transition-all duration-300 group">
            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Pill size={18} className="text-gray-400 group-hover:text-purple-500 transition-colors" /> Medications
            </h3>
            <div className="flex flex-col items-center justify-center text-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 group-hover:border-purple-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 text-gray-300 group-hover:text-purple-400 transition-colors">
                <Pill size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-gray-700">No prescriptions</p>
              <p className="text-xs text-gray-400 mt-1">No active medications.</p>
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-6 hover:shadow-lg transition-all duration-300 group">
            <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle size={18} className="text-gray-400 group-hover:text-orange-500 transition-colors" /> Allergies
            </h3>
            <div className="flex flex-col items-center justify-center text-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 group-hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 text-gray-300 group-hover:text-orange-400 transition-colors">
                <AlertCircle size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-gray-700">No allergies listed</p>
              <p className="text-xs text-gray-400 mt-1">Patient has no known allergies.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
