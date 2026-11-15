/**
 * Admin Maintenance Management Page
 */

import React, { useState } from 'react';
import { mockMaintenance, maintenanceStatuses, maintenanceTypes } from '../../mock/maintenance';

const AdminMaintenance = () => {
  const [maintenance, setMaintenance] = useState(mockMaintenance);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedMaint, setSelectedMaint] = useState(null);

  const filtered = maintenance.filter(m => {
    const matchesSearch = searchQuery === '' || m.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Maintenance Management</h1>
        <p className="text-slate-600 mt-1">Manage maintenance schedules</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg" />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg">
            <option value="all">All Status</option>
            {maintenanceStatuses.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Equipment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Scheduled Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{m.equipment}</td>
                <td className="px-6 py-4 text-sm">{m.maintenanceType}</td>
                <td className="px-6 py-4 text-sm">{m.scheduledDate}</td>
                <td className="px-6 py-4 text-sm">{m.assignedTechnician.name}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${m.status === 'completed' ? 'bg-green-100 text-green-700' : m.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4"><button onClick={() => { setSelectedMaint(m); setShowModal(true); }} className="p-1 hover:bg-slate-200 rounded">👁️</button></td>
              </tr>
            ))}
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
      {showModal && selectedMaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b"><h2 className="text-xl font-bold">Maintenance Details</h2></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-medium">{selectedMaint.equipment}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Type:</span><span className="font-medium">{selectedMaint.maintenanceType}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Scheduled:</span><span className="font-medium">{selectedMaint.scheduledDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Technician:</span><span className="font-medium">{selectedMaint.assignedTechnician.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="font-medium">{selectedMaint.status}</span></div>
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

export default AdminMaintenance;
