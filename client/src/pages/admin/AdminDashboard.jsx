/**
 * Admin Dashboard Page
 * System overview and key metrics for administrators
 */

import React from 'react';
import { mockAdminUsers, userStats } from '../../mock/adminUsers';
import { mockAuditLogs } from '../../mock/auditLogs';
import {
  mockFranchises,
  franchiseStats,
} from '../../mock/franchises';
import {
  mockOutlets,
  outletStats,
} from '../../mock/outlets';
import {
  mockEquipment,
  equipmentStats,
} from '../../mock/equipment';
import {
  mockMaintenance,
  maintenanceStats,
} from '../../mock/maintenance';
import { mockWarranties, mockWarrantyClaims } from '../../mock/warranties';

const AdminDashboard = () => {
  // Calculate stats
  const totalUsers = userStats.totalUsers;
  const activeUsers = userStats.activeUsers;
  const totalFranchises = mockFranchises.length;
  const totalOutlets = mockOutlets.length;
  const totalEquipment = mockEquipment.length;

  const upcomingMaintenance = mockMaintenance.filter(
    (m) => m.status === 'scheduled'
  ).length;
  const overdueMaintenance = mockMaintenance.filter(
    (m) => m.status === 'overdue'
  ).length;

  const expiringWarranties = mockWarranties.filter((w) => {
    const expiryDate = new Date(w.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  }).length;

  const pendingClaims = mockWarrantyClaims.filter(
    (c) => c.status === 'pending'
  ).length;

  // Recent activities
  const recentActivities = mockAuditLogs.slice(0, 5);
  const recentUsers = mockAdminUsers.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">System overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalUsers}</p>
            </div>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            <span className="text-green-600 font-medium">{activeUsers}</span> active
          </p>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{activeUsers}</p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            {Math.round((activeUsers / totalUsers) * 100)}% of total users
          </p>
        </div>

        {/* Total Franchises */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 text-sm font-medium">Franchises</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalFranchises}</p>
            </div>
            <span className="text-3xl">🏢</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            {totalOutlets} outlets managed
          </p>
        </div>

        {/* Total Outlets */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 text-sm font-medium">Outlets</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalOutlets}</p>
            </div>
            <span className="text-3xl">🏪</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Across {totalFranchises} franchises
          </p>
        </div>

        {/* Total Equipment */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-600 text-sm font-medium">Equipment</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalEquipment}</p>
            </div>
            <span className="text-3xl">⚙️</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Actively managed
          </p>
        </div>
      </div>

      {/* Maintenance & Warranty Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Maintenance Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Maintenance Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Upcoming</span>
              <span className="text-xl font-bold text-blue-600">{upcomingMaintenance}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Overdue</span>
              <span className="text-xl font-bold text-red-600">{overdueMaintenance}</span>
            </div>
          </div>
        </div>

        {/* Warranty Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Warranty Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Expiring Soon</span>
              <span className="text-xl font-bold text-yellow-600">{expiringWarranties}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Pending Claims</span>
              <span className="text-xl font-bold text-purple-600">{pendingClaims}</span>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">User Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Admins</span>
              <span className="text-xl font-bold text-indigo-600">{userStats.adminCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Managers</span>
              <span className="text-xl font-bold text-green-600">{userStats.managerCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Technicians</span>
              <span className="text-xl font-bold text-cyan-600">{userStats.technicianCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentActivities.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-1">
                    {log.action === 'create' && '➕'}
                    {log.action === 'update' && '✏️'}
                    {log.action === 'delete' && '🗑️'}
                    {log.action === 'export' && '📤'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{log.description}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {log.user} • {log.timestamp}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent User Registrations */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Recent Registrations</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{user.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                    user.role === 'manager' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
