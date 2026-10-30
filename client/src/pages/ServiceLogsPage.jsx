import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Eye, Calendar, User } from 'lucide-react';
import { mockServiceLogs } from '../mock/serviceLogs';

export default function ServiceLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and search
  const filteredLogs = useMemo(() => {
    let result = mockServiceLogs;

    // Search filter
    if (searchTerm) {
      result = result.filter(log =>
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(log => log.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.serviceDate) - new Date(a.serviceDate);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'technician':
          return a.technician.localeCompare(b.technician);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterStatus, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'pending':
        return '📋';
      case 'in-progress':
        return '🔄';
      case 'cancelled':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Logs</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Track all equipment service and maintenance activities
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
          <Plus size={18} />
          New Service Log
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Logs"
          value={mockServiceLogs.length}
          color="bg-slate-50 text-slate-700"
          icon="📊"
        />
        <SummaryCard
          label="Completed"
          value={mockServiceLogs.filter(l => l.status === 'completed').length}
          color="bg-green-50 text-green-700"
          icon="✅"
        />
        <SummaryCard
          label="Pending"
          value={mockServiceLogs.filter(l => l.status === 'pending').length}
          color="bg-amber-50 text-amber-700"
          icon="📋"
        />
        <SummaryCard
          label="In Progress"
          value={mockServiceLogs.filter(l => l.status === 'in-progress').length}
          color="bg-blue-50 text-blue-700"
          icon="🔄"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by description, technician, or equipment..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="date">Service Date (Latest)</option>
              <option value="status">Status</option>
              <option value="technician">Technician</option>
            </select>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-end">
            <button className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <Filter size={16} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-600">
          Showing <span className="font-semibold">{filteredLogs.length}</span> of <span className="font-semibold">{mockServiceLogs.length}</span> service logs
        </div>
      </div>

      {/* Service Logs List (Card View for better mobile experience) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <ServiceLogCard key={log.id} log={log} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
            <Calendar size={48} className="mb-3 opacity-50" />
            <p className="text-lg font-medium">No service logs found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceLogCard({ log, getStatusColor, getStatusIcon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900">{log.equipmentName}</h3>
          <p className="text-xs text-slate-500 mt-1">{log.description}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ml-2 ${getStatusColor(log.status)}`}>
          <span>{getStatusIcon(log.status)}</span>
          {log.status.charAt(0).toUpperCase() + log.status.slice(1).replace('-', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-slate-700">{new Date(log.serviceDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <User size={14} className="text-slate-400" />
          <span className="text-slate-700">{log.technician}</span>
        </div>
      </div>

      {log.notes && (
        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
          <p className="font-medium text-slate-700 mb-1">Notes</p>
          <p>{log.notes}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs hover:bg-slate-50 transition flex items-center justify-center gap-1">
          <Eye size={14} />
          View
        </button>
        <button className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg font-medium text-xs hover:bg-primary-700 transition">
          Edit
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, icon }) {
  return (
    <div className={`rounded-xl border border-slate-100 p-4 ${color}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
