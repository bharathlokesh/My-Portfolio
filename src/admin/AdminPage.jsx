import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AdminDashboard /> : <Login />;
}

