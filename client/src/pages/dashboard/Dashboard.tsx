import React from 'react';
import { useAuth } from '../../hooks/AuthHook';
import AdminDashboard from './AdminDashboard';
import PatientDashboard from './PatientDashboard';
import Loading from '../../components/Loading';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // Check user role and return appropriate dashboard
  // Assuming roles are 'admin' and 'patient'
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  // Default to Patient Dashboard if role is patient or unspecified
  return <PatientDashboard />;
};

export default Dashboard;
