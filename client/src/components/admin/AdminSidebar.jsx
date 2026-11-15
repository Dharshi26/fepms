/**
 * Admin Sidebar Component
 * Navigation for admin panel
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: '📊',
      exact: true,
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: '👥',
    },
    {
      path: '/admin/franchises',
      label: 'Franchises',
      icon: '🏢',
    },
    {
      path: '/admin/outlets',
      label: 'Outlets',
      icon: '🏪',
    },
    {
      path: '/admin/equipment',
      label: 'Equipment',
      icon: '⚙️',
    },
    {
      path: '/admin/maintenance',
      label: 'Maintenance',
      icon: '📅',
    },
    {
      path: '/admin/service-logs',
      label: 'Service Logs',
      icon: '📋',
    },
    {
      path: '/admin/warranties',
      label: 'Warranties',
      icon: '🛡️',
    },
    {
      path: '/admin/claims',
      label: 'Claims',
      icon: '📄',
    },
    {
      path: '/admin/reports',
      label: 'Reports',
      icon: '📈',
    },
    {
      path: '/admin/notifications',
      label: 'Notifications',
      icon: '🔔',
    },
    {
      path: '/admin/audit-logs',
      label: 'Audit Logs',
      icon: '📝',
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const sidebarWidth = collapsed ? 'w-20' : 'w-64';
  const overlayClasses = isOpen ? 'block' : 'hidden';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarWidth} bg-slate-900 text-white flex flex-col fixed h-full left-0 top-0 z-50 lg:z-0 transition-all duration-300 overflow-hidden ${
          !isOpen ? '-translate-x-full lg:translate-x-0' : ''
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏭</span>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-sm font-bold truncate">FEPMS</div>
                  <div className="text-xs text-slate-400 truncate">Admin</div>
                </div>
              )}
            </div>
            <button
              className="hidden lg:block p-1 hover:bg-slate-800 rounded"
              onClick={onToggleCollapse}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: active }) => `
                  flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${
                    active
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }
                `}
                title={collapsed ? item.label : ''}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
              👩‍💼
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-xs font-medium truncate">Admin</div>
                <div className="text-xs text-slate-400 truncate">System</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer for desktop */}
      {!collapsed && <div className="hidden lg:block w-64" />}
      {collapsed && <div className="hidden lg:block w-20" />}
    </>
  );
};

export default AdminSidebar;
