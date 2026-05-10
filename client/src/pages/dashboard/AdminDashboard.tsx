import { useState } from 'react';
import { useAuth } from '../../hooks/AuthHook';
import { 
  Users, Activity, Calendar, Pill, ShieldCheck, 
  Search, Bell, Settings, LogOut, ChevronRight,
  Clock, AlertTriangle, FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  const STATS = [
    { label: 'Total Patients', value: '12,450', trend: '+14%', icon: Users, color: 'blue' },
    { label: 'Active Doctors', value: '342', trend: '+5%', icon: ShieldCheck, color: 'emerald' },
    { label: 'Consultations', value: '8,921', trend: '+22%', icon: Activity, color: 'indigo' },
    { label: 'Pending Approvals', value: '18', trend: '-2%', icon: AlertTriangle, color: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter flex text-slate-800">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 relative z-20">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <ShieldCheck size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-slate-900 tracking-tight leading-none">HealthCore</h2>
              <p className="text-[10px] tracking-[0.15em] text-blue-600 font-bold uppercase mt-1">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {[
            { icon: Activity, label: 'Overview' },
            { icon: Users, label: 'User Management' },
            { icon: Calendar, label: 'Appointments' },
            { icon: Pill, label: 'Pharmacy Inventory' },
            { icon: FileText, label: 'System Logs' },
            { icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                activeTab === item.label
                  ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                  : "text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.label ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[11px] shadow-sm border border-white">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[13px] font-semibold text-slate-900 truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] font-medium text-slate-500 capitalize truncate">{user?.role || 'System Admin'}</p>
              </div>
            </div>
            <button 
                onClick={() => logout()}
                className="p-2 shrink-0 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                title="Logout"
            >
                <LogOut size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200/60 sticky top-0 z-10 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-slate-900">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="relative text-slate-400 hover:text-slate-700 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} strokeWidth={2} />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900">Recent Registrations</h3>
                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Dr. Sarah Jenkins', role: 'Doctor', status: 'Pending', date: '2 mins ago', initial: 'SJ' },
                      { name: 'Michael Chen', role: 'Patient', status: 'Active', date: '1 hour ago', initial: 'MC' },
                      { name: 'Emily Roberts', role: 'Patient', status: 'Active', date: '3 hours ago', initial: 'ER' },
                      { name: 'Dr. James Wilson', role: 'Doctor', status: 'Active', date: '5 hours ago', initial: 'JW' },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                            {user.initial}
                          </div>
                          <span className="font-semibold text-sm text-slate-900">{user.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{user.role}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{user.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-blue-600 transition-colors">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions / System Health */}
            <div className="space-y-6">


              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Verify 4 Doctor Profiles', time: 'High Priority', icon: ShieldCheck, color: 'rose' },
                    { title: 'Update Pharmacy Stock', time: 'Medium', icon: Pill, color: 'amber' },
                    { title: 'Review System Backup', time: 'Low', icon: Clock, color: 'blue' }
                  ].map((action, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg bg-${action.color}-50 text-${action.color}-600 flex items-center justify-center shrink-0`}>
                        <action.icon size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{action.title}</h4>
                        <p className={`text-xs font-medium mt-0.5 ${
                            action.color === 'rose' ? 'text-rose-500' : 'text-slate-500'
                        }`}>{action.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
