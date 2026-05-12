import React, { useState } from 'react';
import { 
  Users, Clock, Search, Filter, 
  ChevronRight, CheckCircle2, User, Activity, Calendar
} from 'lucide-react';
import { useAuth } from '../hooks/AuthHook';

// Indian naming origin mock data
const DOCTORS = [
  { id: '1', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist' },
  { id: '2', name: 'Dr. Anjali Sharma', specialty: 'Pediatrician' },
  { id: '3', name: 'Dr. Vikram Singh', specialty: 'Neurologist' },
  { id: '4', name: 'Dr. Priya Patel', specialty: 'General Physician' }
];

const APPOINTMENTS = [
  { 
    id: 'a1', 
    doctorId: '1', 
    patientName: 'Amit Shah', 
    time: '10:30 AM', 
    date: '2026-05-13', 
    status: 'Confirmed',
    age: 45,
    gender: 'Male',
    complaint: 'Chest pain and palpitations'
  },
  { 
    id: 'a2', 
    doctorId: '1', 
    patientName: 'Sunita Gupta', 
    time: '11:45 AM', 
    date: '2026-05-13', 
    status: 'Pending',
    age: 38,
    gender: 'Female',
    complaint: 'Routine heart checkup'
  },
  { 
    id: 'a3', 
    doctorId: '2', 
    patientName: 'Rahul Verma', 
    time: '09:00 AM', 
    date: '2026-05-13', 
    status: 'Confirmed',
    age: 12,
    gender: 'Male',
    complaint: 'High fever and cold'
  },
  { 
    id: 'a4', 
    doctorId: '2', 
    patientName: 'Neha Iyer', 
    time: '02:15 PM', 
    date: '2026-05-13', 
    status: 'Cancelled',
    age: 29,
    gender: 'Female',
    complaint: 'Follow-up consultation'
  },
  { 
    id: 'a5', 
    doctorId: '3', 
    patientName: 'Rohan Deshmukh', 
    time: '03:30 PM', 
    date: '2026-05-13', 
    status: 'Confirmed',
    age: 52,
    gender: 'Male',
    complaint: 'Severe migraines'
  },
  { 
    id: 'a6', 
    doctorId: '4', 
    patientName: 'Sneha Kulkarni', 
    time: '11:00 AM', 
    date: '2026-05-14', 
    status: 'Confirmed',
    age: 26,
    gender: 'Female',
    complaint: 'General fatigue'
  },
  { 
    id: 'a7', 
    doctorId: '1', 
    patientName: 'Vikram Rathore', 
    time: '04:00 PM', 
    date: '2026-05-14', 
    status: 'Confirmed',
    age: 61,
    gender: 'Male',
    complaint: 'Blood pressure monitoring'
  },
  { 
    id: 'a8', 
    doctorId: '2', 
    patientName: 'Ishaan Malhotra', 
    time: '12:30 PM', 
    date: '2026-05-14', 
    status: 'Pending',
    age: 8,
    gender: 'Male',
    complaint: 'Allergy symptoms'
  }
];

const AppointmentList: React.FC = () => {
  const { user } = useAuth();
  const isPatient = user?.role === 'patient';
  
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter based on role
  const filteredAppointments = isPatient 
    ? APPOINTMENTS.filter(app => 
        app.patientName.toLowerCase() === user?.name?.toLowerCase() &&
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : APPOINTMENTS.filter(app => 
        app.doctorId === selectedDoctorId &&
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const selectedDoctor = DOCTORS.find(d => d.id === selectedDoctorId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full animate-in fade-in duration-500">
      {/* Sidebar - Doctor Selection (Hidden for patients) */}
      {!isPatient && (
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Select Doctor</h3>
            <div className="space-y-2">
              {DOCTORS.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctorId(doctor.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    selectedDoctorId === doctor.id
                      ? "bg-blue-600 dark:bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    selectedDoctorId === doctor.id ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}>
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-[13px] font-bold truncate dark:text-white">{doctor.name}</p>
                    <p className={`text-[11px] truncate ${selectedDoctorId === doctor.id ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}>
                      {doctor.specialty}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 text-white shadow-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Today's Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
                    <Users size={16} />
                  </div>
                  <span className="text-sm font-medium">Total Patients</span>
                </div>
                <span className="text-lg font-bold">{filteredAppointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-medium">Confirmed</span>
                </div>
                <span className="text-lg font-bold">
                  {filteredAppointments.filter(a => a.status === 'Confirmed').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Appointment List */}
      <div className={`${isPatient ? 'lg:col-span-12' : 'lg:col-span-9'} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {isPatient ? 'My Appointments' : `Patient List for ${selectedDoctor?.name}`}
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search patient..." 
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 transition-all w-48 shadow-sm text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800 whitespace-nowrap">
              {filteredAppointments.length} Patients
            </span>
          </div>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments.map((app) => (
              <div 
                key={app.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-0 right-0 p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                    app.status === 'Confirmed' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50' :
                    app.status === 'Cancelled' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800/50' :
                    'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    <User size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{app.patientName}</h4>
                    <div className="flex items-center gap-3 text-[12px] text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {app.time}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                         {app.age} yrs • {app.gender}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Chief Complaint</span>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{app.complaint}</p>
                    </div>
                    <button className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all shrink-0">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
              <Activity size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No appointments found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-xs">There are no appointments scheduled for this doctor matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
