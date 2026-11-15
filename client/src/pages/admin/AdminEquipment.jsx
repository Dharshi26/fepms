/**
 * Admin Equipment Management Page
 */

import React, { useState } from 'react';
import { mockEquipment, equipmentStatuses, equipmentCategories } from '../../mock/equipment';

const AdminEquipment = () => {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const filteredEquipment = equipment.filter((e) => {
    const matchesSearch =
      searchQuery === '' ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEquipment.length / pageSize);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteEquipment = (equipmentId) => {
    if (confirm('Delete this equipment?')) {
      setEquipment(equipment.filter((e) => e.id !== equipmentId));
      alert('Equipment deleted!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Equipment Management</h1>
        <p className="text-slate-600 mt-1">Manage all equipment</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Categories</option>
            {equipmentCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Status</option>
            {equipmentStatuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Serial Number</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Warranty Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedEquipment.map((eq) => (
              <tr key={eq.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{eq.name}</td>
                <td className="px-6 py-4 text-sm">{eq.category}</td>
                <td className="px-6 py-4 text-sm">{eq.serialNumber}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    eq.status === 'operational' ? 'bg-green-100 text-green-700' :
                    eq.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {eq.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{eq.warrantyExpiryDate}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedEquipment(eq); setShowModal(true); }} className="p-1 hover:bg-slate-200 rounded">👁️</button>
                    <button onClick={() => handleDeleteEquipment(eq.id)} className="p-1 hover:bg-slate-200 rounded text-red-600">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          Showing {paginatedEquipment.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(currentPage * pageSize, filteredEquipment.length)} of {filteredEquipment.length}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Previous</button>
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* View Modal */}
      {showModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b"><h2 className="text-xl font-bold">Equipment Details</h2></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Name:</span><span className="font-medium">{selectedEquipment.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Category:</span><span className="font-medium">{selectedEquipment.category}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Serial:</span><span className="font-medium">{selectedEquipment.serialNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="font-medium">{selectedEquipment.status}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Warranty:</span><span className="font-medium">{selectedEquipment.warrantyExpiryDate}</span></div>
            </div>
            <div className="p-6 border-t">
              <button onClick={() => setShowModal(false)} className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEquipment;
