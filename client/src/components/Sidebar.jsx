import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/',              label: 'Dashboard',             icon: '🏠' },
  { path: '/franchises',    label: 'Franchises',            icon: '🏢' },
  { path: '/outlets',       label: 'Outlets',               icon: '📍' },
  { path: '/equipment',     label: 'Equipment',             icon: '⚙️'  },
  { path: '/maintenance',   label: 'Preventive Maintenance', icon: '🔧' },
  { path: '/service-logs',  label: 'Service Logs',          icon: '📋' },
  { path: '/warranties',    label: 'Warranty',              icon: '🛡️'  },
  { path: '/claims',        label: 'Warranty Claims',       icon: '📄' },
  { path: '/reports',       label: 'Reports',               icon: '📊' },
  { path: '/notifications', label: 'Notifications',         icon: '🔔' },
  { path: '/profile',       label: 'Profile',               icon: '👤' },
  { path: '/settings',      label: 'Settings',              icon: '⚙️'  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-800 z-30
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            FE
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">FEPMS</p>
            <p className="text-slate-400 text-xs">Maintenance System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <span className="text-base leading-none">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-700">
          <p className="text-slate-500 text-xs text-center">v1.0.0 · Phase 1</p>
        </div>
      </aside>
    </>
  );
}
