/**
 * Admin Service Logs Page
 */

import React, { useState } from 'react';
import { mockServiceLogs } from '../../mock/serviceLogs';

const AdminServiceLogs = () => {
  const [logs, setLogs] = useState(mockServiceLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const filtered = logs.filter(log => {
    const matchesSearch = searchQuery === '' || log.description.toLowerCase().includes(searchQuery.toLowerCase()) || log.technician.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Service Logs</h1>
        <p className="text-slate-600 mt-1">View service work records</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Search logs..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg" />
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-lg">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Equipment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Service Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{log.equipment}</td>
                <td className="px-6 py-4 text-sm truncate">{log.issueReported}</td>
                <td className="px-6 py-4 text-sm">{log.technician.name}</td>
                <td className="px-6 py-4 text-sm">{log.serviceDate}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${log.status === 'completed' ? 'bg-green-100 text-green-700' : log.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4"><button onClick={() => { setSelectedLog(log); setShowModal(true); }} className="p-1 hover:bg-slate-200 rounded">👁️</button></td>
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
      {showModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b"><h2 className="text-xl font-bold">Service Log Details</h2></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-medium">{selectedLog.equipment}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Technician:</span><span className="font-medium">{selectedLog.technician.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Service Date:</span><span className="font-medium">{selectedLog.serviceDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="font-medium">{selectedLog.status}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Description:</span><span className="font-medium text-right">{selectedLog.issueReported}</span></div>
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

export default AdminServiceLogs;
