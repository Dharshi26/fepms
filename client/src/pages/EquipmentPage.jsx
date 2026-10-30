import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockEquipment } from '../mock/equipment';

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(mockEquipment.map(e => e.category))];
    return cats.sort();
  }, []);

  // Filter and search
  const filteredEquipment = useMemo(() => {
    let result = mockEquipment;

    // Search filter
    if (searchTerm) {
      result = result.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.outletName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(e => e.status === filterStatus);
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter(e => e.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'purchase-date':
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterStatus, filterCategory, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700';
      case 'repair':
        return 'bg-orange-100 text-orange-700';
      case 'retired':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return '✅';
      case 'maintenance':
        return '🔧';
      case 'repair':
        return '⚠️';
      case 'retired':
        return '🚫';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Equipment</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage all franchise equipment and assets
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm">
          <Plus size={18} />
          Add Equipment
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, serial number, or outlet..."
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
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Repair</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="status">Status</option>
              <option value="purchase-date">Purchase Date</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <Filter size={16} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-600">
          Showing <span className="font-semibold">{filteredEquipment.length}</span> of <span className="font-semibold">{mockEquipment.length}</span> equipment
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Equipment Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Serial Number</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Outlet</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Purchase Date</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map(equipment => (
                  <tr key={equipment.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{equipment.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{equipment.model}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700">{equipment.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono text-slate-600">{equipment.serialNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-700">{equipment.outletName}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${getStatusColor(equipment.status)}`}>
                        <span>{getStatusIcon(equipment.status)}</span>
                        {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">{new Date(equipment.purchaseDate).toLocaleDateString()}</span>
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
                      <span className="text-3xl">🔍</span>
                      <p className="text-sm">No equipment found matching your filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          label="Total Equipment" 
          value={mockEquipment.length} 
          color="bg-blue-50 text-blue-700"
        />
        <SummaryCard 
          label="Operational" 
          value={mockEquipment.filter(e => e.status === 'operational').length} 
          color="bg-green-50 text-green-700"
        />
        <SummaryCard 
          label="Needs Maintenance" 
          value={mockEquipment.filter(e => e.status === 'maintenance').length} 
          color="bg-amber-50 text-amber-700"
        />
        <SummaryCard 
          label="Requires Repair" 
          value={mockEquipment.filter(e => e.status === 'repair').length} 
          color="bg-red-50 text-red-700"
        />
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-xl border border-slate-100 p-4 ${color}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
