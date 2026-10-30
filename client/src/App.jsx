import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PremiumDashboardLayout from './layouts/PremiumDashboardLayout';
import Dashboard from './pages/Dashboard';
import FranchisesPage from './pages/FranchisesPage';
import OutletsPage from './pages/OutletsPage';
import EquipmentPage from './pages/EquipmentPage';
import MaintenancePage from './pages/MaintenancePage';
import ServiceLogsPage from './pages/ServiceLogsPage';
import WarrantyPage from './pages/WarrantyPage';
import ClaimsPage from './pages/ClaimsPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
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
        <Route path="equipment"       element={<EquipmentPage />} />
        <Route path="maintenance"     element={<MaintenancePage />} />
        <Route path="service-logs"    element={<ServiceLogsPage />} />
        <Route path="warranties"      element={<WarrantyPage />} />
        <Route path="claims"          element={<ClaimsPage />} />
        <Route path="reports"         element={<ReportsPage />} />
        <Route path="notifications"   element={<NotificationsPage />} />
        <Route path="settings"        element={<SettingsPage />} />
        <Route path="profile"         element={<ProfilePage />} />
        <Route path="*"               element={<NotFoundPage />} />
      </Route>

      {/* 404 for unmatched public routes */}
      <Route path="*" element={<NotFoundPage />} />
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
