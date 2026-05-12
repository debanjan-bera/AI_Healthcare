import React from 'react';
import { CalendarDays } from 'lucide-react';
import AppointmentList from '../../components/AppointmentList';

const AppointmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-500" />
            Manage patient schedules and visits efficiently
          </p>
        </div>

        <AppointmentList />
      </div>
    </div>
  );
};

export default AppointmentPage;
