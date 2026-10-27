import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PremiumDashboardLayout from './layouts/PremiumDashboardLayout';
import Dashboard from './pages/Dashboard';
import FranchisesPage from './pages/FranchisesPage';
import OutletsPage from './pages/OutletsPage';
import Login from './pages/Login';
import PlaceholderPage from './pages/PlaceholderPage';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <PremiumDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index                  element={<Dashboard />} />
        <Route path="franchises"      element={<FranchisesPage />} />
        <Route path="outlets"         element={<OutletsPage />} />
        <Route path="equipment"       element={<PlaceholderPage />} />
        <Route path="maintenance"     element={<PlaceholderPage />} />
        <Route path="service-logs"    element={<PlaceholderPage />} />
        <Route path="warranties"      element={<PlaceholderPage />} />
        <Route path="claims"          element={<PlaceholderPage />} />
        <Route path="reports"         element={<PlaceholderPage />} />
        <Route path="notifications"   element={<PlaceholderPage />} />
        <Route path="users"           element={<PlaceholderPage />} />
        <Route path="settings"        element={<PlaceholderPage />} />
        <Route path="profile"         element={<PlaceholderPage />} />
        <Route path="*"               element={<PlaceholderPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
