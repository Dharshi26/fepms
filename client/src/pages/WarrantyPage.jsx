import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { mockWarranties } from '../mock/warranties';

export default function WarrantyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('expiry-date');

  // Filter and search
  const filteredWarranties = useMemo(() => {
    let result = mockWarranties;

    // Search filter
    if (searchTerm) {
      result = result.filter(w =>
        w.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.equipmentModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.provider.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(w => {
        const now = new Date();
        const expiry = new Date(w.expiryDate);
        if (filterStatus === 'active') return expiry > now;
        if (filterStatus === 'expiring-soon') {
          const thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
          return expiry > now && expiry <= thirtyDaysFromNow;
        }
        if (filterStatus === 'expired') return expiry < now;
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'expiry-date':
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        case 'provider':
          return a.provider.localeCompare(b.provider);
        case 'coverage':
          return a.coverageType.localeCompare(b.coverageType);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterStatus, sortBy]);

  const getWarrantyStatus = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    
    if (expiry < now) return { status: 'expired', icon: '❌', color: 'bg-red-100 text-red-700' };
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    if (expiry <= thirtyDaysFromNow) return { status: 'expiring-soon', icon: '⚠️', color: 'bg-amber-100 text-amber-700' };
    
    return { status: 'active', icon: '✅', color: 'bg-green-100 text-green-700' };
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Warranties</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage equipment warranties and coverage
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
          <Plus size={18} />
          Add Warranty
        </button>
      </div>

      {/* Warning Alert if there are expiring soon */}
      {mockWarranties.some(w => getWarrantyStatus(w.expiryDate).status === 'expiring-soon') && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {mockWarranties.filter(w => getWarrantyStatus(w.expiryDate).status === 'expiring-soon').length} warranties expiring soon
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Review and renew warranties that are expiring within the next 30 days
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Warranties"
          value={mockWarranties.length}
          color="bg-slate-50 text-slate-700"
          icon="📋"
        />
        <SummaryCard
          label="Active"
          value={mockWarranties.filter(w => getWarrantyStatus(w.expiryDate).status === 'active').length}
          color="bg-green-50 text-green-700"
          icon="✅"
        />
        <SummaryCard
          label="Expiring Soon"
          value={mockWarranties.filter(w => getWarrantyStatus(w.expiryDate).status === 'expiring-soon').length}
          color="bg-amber-50 text-amber-700"
          icon="⚠️"
        />
        <SummaryCard
          label="Expired"
          value={mockWarranties.filter(w => getWarrantyStatus(w.expiryDate).status === 'expired').length}
          color="bg-red-50 text-red-700"
          icon="❌"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by equipment, model, or provider..."
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
              <option value="active">Active</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="expiry-date">Expiry Date</option>
              <option value="provider">Provider</option>
              <option value="coverage">Coverage Type</option>
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
          Showing <span className="font-semibold">{filteredWarranties.length}</span> of <span className="font-semibold">{mockWarranties.length}</span> warranties
        </div>
      </div>

      {/* Warranties Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Equipment</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Provider</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Coverage Type</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Start Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Expiry Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWarranties.length > 0 ? (
                filteredWarranties.map(warranty => {
                  const status = getWarrantyStatus(warranty.expiryDate);
                  const daysUntil = getDaysUntilExpiry(warranty.expiryDate);
                  
                  return (
                    <tr key={warranty.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{warranty.equipmentName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{warranty.equipmentModel}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{warranty.provider}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">{warranty.coverageType}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">{new Date(warranty.startDate).toLocaleDateString()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-semibold ${daysUntil < 0 ? 'text-red-600' : daysUntil <= 30 ? 'text-amber-600' : 'text-slate-700'}`}>
                          {new Date(warranty.expiryDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${status.color}`}>
                          <span>{status.icon}</span>
                          {status.status.charAt(0).toUpperCase() + status.status.slice(1).replace('-', ' ')}
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
                      <p className="text-sm">No warranties found</p>
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
