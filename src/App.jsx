import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ServicesList from './pages/Services/ServicesList';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }
  
  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff4d00',
          borderRadius: 4,
        },
      }}
    >
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<PlaceholderPage title="Bookings" />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/charters" element={<PlaceholderPage title="Charters" />} />
            <Route path="/accounts" element={<PlaceholderPage title="Accounts" />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
            <Route path="/manage" element={<PlaceholderPage title="Manage" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/security" element={<PlaceholderPage title="Security Controls" />} />
            <Route path="/b2b" element={<PlaceholderPage title="B2B Network" />} />
            <Route path="/chart-sharing" element={<PlaceholderPage title="Chart Sharing" />} />
            <Route path="/new-reports" element={<PlaceholderPage title="New Reports" />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
