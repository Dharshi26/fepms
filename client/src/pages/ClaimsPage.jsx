import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { mockWarrantyClaims } from '../mock/warranties';

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and search
  const filteredClaims = useMemo(() => {
    let result = mockWarrantyClaims;

    // Search filter
    if (searchTerm) {
      result = result.filter(c =>
        c.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(c => c.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.claimDate) - new Date(a.claimDate);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'amount':
          return b.claimAmount - a.claimAmount;
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterStatus, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'in-review':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '❌';
      case 'in-review':
        return '🔍';
      default:
        return '❓';
    }
  };

  const totalClaimAmount = mockWarrantyClaims.reduce((sum, c) => sum + c.claimAmount, 0);
  const approvedAmount = mockWarrantyClaims
    .filter(c => c.status === 'approved')
    .reduce((sum, c) => sum + c.claimAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Warranty Claims</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Track and manage warranty claim submissions
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
          <Plus size={18} />
          New Claim
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Claims"
          value={mockWarrantyClaims.length}
          color="bg-slate-50 text-slate-700"
          icon="📋"
        />
        <SummaryCard
          label="Approved"
          value={mockWarrantyClaims.filter(c => c.status === 'approved').length}
          color="bg-green-50 text-green-700"
          icon="✅"
        />
        <SummaryCard
          label="In Review"
          value={mockWarrantyClaims.filter(c => c.status === 'in-review').length}
          color="bg-blue-50 text-blue-700"
          icon="🔍"
        />
        <SummaryCard
          label="Pending"
          value={mockWarrantyClaims.filter(c => c.status === 'pending').length}
          color="bg-amber-50 text-amber-700"
          icon="⏳"
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FinancialCard
          label="Total Claim Value"
          amount={totalClaimAmount}
          color="bg-slate-50 text-slate-700"
        />
        <FinancialCard
          label="Approved Amount"
          amount={approvedAmount}
          color="bg-green-50 text-green-700"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by claim number, equipment, or description..."
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
              <option value="approved">Approved</option>
              <option value="in-review">In Review</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="date">Claim Date (Latest)</option>
              <option value="status">Status</option>
              <option value="amount">Claim Amount</option>
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
          Showing <span className="font-semibold">{filteredClaims.length}</span> of <span className="font-semibold">{mockWarrantyClaims.length}</span> claims
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Claim Number</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Equipment</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Claim Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Description</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.length > 0 ? (
                filteredClaims.map(claim => (
                  <tr key={claim.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-900">{claim.claimNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700">{claim.equipmentName}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">{new Date(claim.claimDate).toLocaleDateString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-slate-900">${claim.claimAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${getStatusColor(claim.status)}`}>
                        <span>{getStatusIcon(claim.status)}</span>
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600 truncate max-w-xs">{claim.description}</span>
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <span className="text-3xl">📋</span>
                      <p className="text-sm">No claims found</p>
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

function FinancialCard({ label, amount, color }) {
  return (
    <div className={`rounded-xl border border-slate-100 p-5 ${color}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-2">${amount.toLocaleString()}</p>
    </div>
  );
}
