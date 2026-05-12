import React, { useState } from 'react';
import { 
  Users, Search, 
  Mail, Phone,
  UserCheck, UserMinus, MapPin
} from 'lucide-react';

const PATIENTS = [
  { id: 'p1', name: 'Amit Shah', age: 45, gender: 'Male', status: 'Active', email: 'amit.shah@example.com', phone: '+91 98765 43210', city: 'Mumbai', lastVisit: '2 days ago' },
  { id: 'p2', name: 'Sunita Gupta', age: 38, gender: 'Female', status: 'Active', email: 'sunita.g@example.com', phone: '+91 98765 43211', city: 'Delhi', lastVisit: '1 week ago' },
  { id: 'p3', name: 'Rahul Verma', age: 12, gender: 'Male', status: 'Active', email: 'rahul.v@example.com', phone: '+91 98765 43212', city: 'Bangalore', lastVisit: 'Yesterday' },
  { id: 'p4', name: 'Neha Iyer', age: 29, gender: 'Female', status: 'Inactive', email: 'neha.iyer@example.com', phone: '+91 98765 43213', city: 'Chennai', lastVisit: '3 months ago' },
  { id: 'p5', name: 'Rohan Deshmukh', age: 52, gender: 'Male', status: 'Active', email: 'rohan.d@example.com', phone: '+91 98765 43214', city: 'Pune', lastVisit: '4 days ago' },
  { id: 'p6', name: 'Sneha Kulkarni', age: 26, gender: 'Female', status: 'Active', email: 'sneha.k@example.com', phone: '+91 98765 43215', city: 'Hyderabad', lastVisit: '10 days ago' },
  { id: 'p7', name: 'Vikram Rathore', age: 61, gender: 'Male', status: 'Active', email: 'vikram.r@example.com', phone: '+91 98765 43216', city: 'Jaipur', lastVisit: '2 weeks ago' },
  { id: 'p8', name: 'Ishaan Malhotra', age: 8, gender: 'Male', status: 'Active', email: 'ishaan.m@example.com', phone: '+91 98765 43217', city: 'Chandigarh', lastVisit: 'Yesterday' },
  { id: 'p9', name: 'Ananya Rao', age: 31, gender: 'Female', status: 'Active', email: 'ananya.rao@example.com', phone: '+91 98765 43218', city: 'Kolkata', lastVisit: '5 days ago' },
  { id: 'p10', name: 'Sanjay Mehra', age: 48, gender: 'Male', status: 'Active', email: 'sanjay.m@example.com', phone: '+91 98765 43219', city: 'Ahmedabad', lastVisit: '3 days ago' },
];

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredPatients = PATIENTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {['All', 'Active', 'Inactive'].map((status) => (
              <button
                key={status}
                onClick={() => handleFilter(status)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === status 
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20 active:scale-95">
          <Users size={18} />
          Add New Patient
        </button>
      </div>

      {/* Patient Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Patient</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Last Visit</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm border-2 border-white dark:border-slate-800 shadow-sm">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{patient.age} years • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400 dark:text-slate-500" /> {patient.email}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400 dark:text-slate-500" /> {patient.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-400 dark:text-slate-500" /> {patient.city}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      patient.status === 'Active' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
                        <UserCheck size={18} />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
                        <UserMinus size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mx-auto mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No patients found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Showing {paginatedPatients.length} of {filteredPatients.length} patients (Page {currentPage} of {totalPages || 1})
          </p>
          <div className="flex gap-2">
            <button 
              className={`px-4 py-1.5 border rounded-lg text-xs font-bold transition-all ${
                currentPage === 1 
                  ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 bg-white dark:bg-slate-900 cursor-not-allowed" 
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
              }`}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button 
              className={`px-4 py-1.5 border rounded-lg text-xs font-bold transition-all ${
                currentPage >= totalPages 
                  ? "border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 bg-white dark:bg-slate-900 cursor-not-allowed" 
                  : "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 shadow-sm shadow-blue-100 dark:shadow-none"
              }`}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
