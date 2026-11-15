/**
 * Admin Warranty Management Page
 */

import React, { useState } from 'react';
import { mockWarranties } from '../../mock/warranties';

const AdminWarranties = () => {
  const [warranties, setWarranties] = useState(mockWarranties);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);

  const getWarrantyStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 30) return 'expiring';
    return 'active';
  };

  const filtered = warranties.filter(w => {
    const matchesSearch = searchQuery === '' || w.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    const status = getWarrantyStatus(w.expiryDate);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Warranty Management</h1>
        <p className="text-slate-600 mt-1">Manage equipment warranties</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Search warranties..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg" />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Equipment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Coverage</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map(w => {
              const status = getWarrantyStatus(w.expiryDate);
              return (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{w.equipment}</td>
                  <td className="px-6 py-4 text-sm">{w.provider}</td>
                  <td className="px-6 py-4 text-sm">{w.startDate}</td>
                  <td className="px-6 py-4 text-sm">{w.expiryDate}</td>
                  <td className="px-6 py-4 text-sm">{w.coverageType}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${status === 'active' ? 'bg-green-100 text-green-700' : status === 'expiring' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><button onClick={() => { setSelectedWarranty(w); setShowModal(true); }} className="p-1 hover:bg-slate-200 rounded">👁️</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">Showing {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Previous</button>
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* View Modal */}
      {showModal && selectedWarranty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b"><h2 className="text-xl font-bold">Warranty Details</h2></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-medium">{selectedWarranty.equipment}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Provider:</span><span className="font-medium">{selectedWarranty.provider}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Start Date:</span><span className="font-medium">{selectedWarranty.startDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Expiry Date:</span><span className="font-medium">{selectedWarranty.expiryDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Coverage:</span><span className="font-medium">{selectedWarranty.coverageType}</span></div>
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

export default AdminWarranties;
