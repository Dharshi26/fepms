/**
 * Admin Topbar Component
 * Header for admin panel with title and user menu
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminTopbar({ title, onMenuClick }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            onClick={onMenuClick}
            title="Toggle menu"
          >
            <span className="text-xl">☰</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <span className="text-lg">🔔</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="text-lg">👤</span>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{user?.role || 'admin'}</p>
              </div>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-slate-500">{user?.email || 'admin@fepms.com'}</p>
                </div>
                <div className="py-2">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      handleBackToMain();
                      setShowUserMenu(false);
                    }}
                  >
                    📊 Back to Main Dashboard
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                  >
                    👤 Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                  >
                    ⚙️ Settings
                  </button>
                </div>
                <div className="border-t border-slate-200 py-2">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
