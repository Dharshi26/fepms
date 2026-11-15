/**
 * Admin Dashboard Layout
 * Provides sidebar and topbar for admin section
 */

import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Get page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path === '/admin/users') return 'User Management';
    if (path === '/admin/franchises') return 'Franchise Management';
    if (path === '/admin/outlets') return 'Outlet Management';
    if (path === '/admin/equipment') return 'Equipment Management';
    if (path === '/admin/maintenance') return 'Maintenance Management';
    if (path === '/admin/service-logs') return 'Service Logs';
    if (path === '/admin/warranties') return 'Warranty Management';
    if (path === '/admin/claims') return 'Claims Management';
    if (path === '/admin/reports') return 'Reports';
    if (path === '/admin/notifications') return 'Notifications';
    if (path === '/admin/audit-logs') return 'Audit Logs';
    if (path === '/admin/settings') return 'Settings';
    return 'Admin Panel';
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <AdminTopbar
          title={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
