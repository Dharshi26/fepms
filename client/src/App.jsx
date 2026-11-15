import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PremiumDashboardLayout from './layouts/PremiumDashboardLayout';
import AdminLayout from './layouts/AdminLayout';
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

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminFranchises from './pages/admin/AdminFranchises';
import AdminOutlets from './pages/admin/AdminOutlets';
import AdminEquipment from './pages/admin/AdminEquipment';
import AdminMaintenance from './pages/admin/AdminMaintenance';
import AdminServiceLogs from './pages/admin/AdminServiceLogs';
import AdminWarranties from './pages/admin/AdminWarranties';
import AdminClaims from './pages/admin/AdminClaims';
import AdminReports from './pages/admin/AdminReports';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';
import AdminSettings from './pages/admin/AdminSettings';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes - Admin Panel (must come before main dashboard to match specific /admin/* paths) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index                       element={<AdminDashboard />} />
        <Route path="users"                element={<AdminUsers />} />
        <Route path="franchises"           element={<AdminFranchises />} />
        <Route path="outlets"              element={<AdminOutlets />} />
        <Route path="equipment"            element={<AdminEquipment />} />
        <Route path="maintenance"          element={<AdminMaintenance />} />
        <Route path="service-logs"         element={<AdminServiceLogs />} />
        <Route path="warranties"           element={<AdminWarranties />} />
        <Route path="claims"               element={<AdminClaims />} />
        <Route path="reports"              element={<AdminReports />} />
        <Route path="notifications"        element={<AdminNotifications />} />
        <Route path="audit-logs"           element={<AdminAuditLogs />} />
        <Route path="settings"             element={<AdminSettings />} />
      </Route>

      {/* Protected routes - Main FEPMS Dashboard */}
      <Route
        path="/*"
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
      </Route>

      {/* 404 for unmatched routes */}
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
