import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { mockMaintenance } from '../mock/maintenance';

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Get unique maintenance types
  const maintenanceTypes = useMemo(() => {
    const types = [...new Set(mockMaintenance.map(m => m.maintenanceType))];
    return types.sort();
  }, []);

  // Filter and search
  const filteredMaintenance = useMemo(() => {
    let result = mockMaintenance;

    // Search filter
    if (searchTerm) {
      result = result.filter(m =>
        m.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.assignedTechnician.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(m => m.status === filterStatus);
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter(m => m.maintenanceType === filterType);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.scheduledDate) - new Date(b.scheduledDate);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'type':
          return a.maintenanceType.localeCompare(b.maintenanceType);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterStatus, filterType, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'due':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return '📅';
      case 'in_progress':
        return '🔄';
      case 'completed':
        return '✅';
      case 'overdue':
        return '⚠️';
      case 'due':
        return '🔔';
      default:
        return '❓';
    }
  };

  const isOverdue = (date) => {
    return new Date(date) < new Date();
  };

  const getDaysUntil = (date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Maintenance Schedule</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage and track all maintenance activities
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
          <Plus size={18} />
          Schedule Maintenance
        </button>
      </div>

      {/* Alert Cards for Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AlertCard
          label="Overdue"
          value={mockMaintenance.filter(m => isOverdue(m.scheduledDate) && m.status !== 'completed').length}
          color="bg-red-50 text-red-700 border-red-200"
          icon="⚠️"
        />
        <AlertCard
          label="Due This Week"
          value={mockMaintenance.filter(m => {
            const days = getDaysUntil(m.scheduledDate);
            return days >= 0 && days <= 7 && m.status !== 'completed';
          }).length}
          color="bg-amber-50 text-amber-700 border-amber-200"
          icon="📅"
        />
        <AlertCard
          label="In Progress"
          value={mockMaintenance.filter(m => m.status === 'in_progress').length}
          color="bg-blue-50 text-blue-700 border-blue-200"
          icon="🔄"
        />
        <AlertCard
          label="Completed (30d)"
          value={mockMaintenance.filter(m => {
            const created = new Date(m.scheduledDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return m.status === 'completed' && created >= thirtyDaysAgo;
          }).length}
          color="bg-green-50 text-green-700 border-green-200"
          icon="✅"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by equipment name or technician..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="all">All Types</option>
              {maintenanceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="date">Scheduled Date</option>
              <option value="status">Status</option>
              <option value="type">Type</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <Filter size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-600">
          Showing <span className="font-semibold">{filteredMaintenance.length}</span> of <span className="font-semibold">{mockMaintenance.length}</span> schedules
        </div>
      </div>

      {/* Maintenance Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Equipment</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Type</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Scheduled Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Technician</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Days Until</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMaintenance.length > 0 ? (
                filteredMaintenance.map(maintenance => {
                  const daysUntil = getDaysUntil(maintenance.scheduledDate);
                  const overdue = isOverdue(maintenance.scheduledDate);
                  
                  return (
                    <tr key={maintenance.id} className={`hover:bg-slate-50 transition ${overdue && maintenance.status !== 'completed' ? 'bg-red-50' : ''}`}>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">{maintenance.equipment}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{maintenance.maintenanceType}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{new Date(maintenance.scheduledDate).toLocaleDateString()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{maintenance.assignedTechnician.name}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${getStatusColor(maintenance.status)}`}>
                          <span>{getStatusIcon(maintenance.status)}</span>
                          {maintenance.status.charAt(0).toUpperCase() + maintenance.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-semibold ${
                          overdue ? 'text-red-600' : daysUntil <= 7 ? 'text-amber-600' : 'text-slate-700'
                        }`}>
                          {overdue ? '⚠️ Overdue' : `${daysUntil} days`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <Calendar size={32} />
                      <p className="text-sm">No maintenance schedules found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ label, value, color, icon }) {
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium opacity-75">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
