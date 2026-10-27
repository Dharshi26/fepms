import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const PAGE_TITLES = {
  '/':                'Dashboard',
  '/franchises':      'Franchises',
  '/outlets':         'Outlets',
  '/equipment':       'Equipment',
  '/maintenance':     'Preventive Maintenance',
  '/service-logs':    'Service Logs',
  '/warranty':        'Warranty',
  '/warranty-claims': 'Warranty Claims',
  '/reports':         'Reports',
  '/notifications':   'Notifications',
  '/users':           'Users',
  '/settings':        'Settings',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? 'FEPMS';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
