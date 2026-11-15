/**
 * Admin Audit Logs Page
 */

import React, { useState } from 'react';
import { mockAuditLogs, auditActions, auditModules } from '../../mock/auditLogs';

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const filtered = logs.filter(log => {
    const matchesSearch = searchQuery === '' || log.user.toLowerCase().includes(searchQuery.toLowerCase()) || log.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesAction && matchesModule;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedLogs = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getActionIcon = (action) => {
    switch(action) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'export': return '📤';
      case 'approve': return '✅';
      case 'reject': return '❌';
      default: return '•';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-slate-600 mt-1">System activity and user actions (Sample Data - For Demonstration)</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by user or action..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          />
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Actions</option>
            {auditActions.map(a => (<option key={a} value={a}>{a}</option>))}
          </select>
          <select
            value={moduleFilter}
            onChange={(e) => {
              setModuleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Modules</option>
            {auditModules.map(m => (<option key={m} value={m}>{m}</option>))}
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Action</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Module</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-mono text-slate-700">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{log.user}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="flex items-center gap-2">
                    {getActionIcon(log.action)}
                    <span className="capitalize">{log.action}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{log.module}</td>
                <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate">{log.description}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    log.status === 'success' ? 'bg-green-100 text-green-700' : 
                    log.status === 'failed' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          Showing {paginatedLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Previous</button>
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Important:</strong> This audit log is sample/demonstration data for testing the admin interface. In a production system, actual audit logs would track all user actions, database changes, and system events with real timestamps and complete context for compliance and security purposes.
        </p>
      </div>
    </div>
  );
};

export default AdminAuditLogs;
