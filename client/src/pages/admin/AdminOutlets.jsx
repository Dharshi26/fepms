/**
 * Admin Outlet Management Page
 */

import React, { useState } from 'react';
import { mockOutlets, outletStatuses, outletTypes } from '../../mock/outlets';

const AdminOutlets = () => {
  const [outlets, setOutlets] = useState(mockOutlets);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredOutlets = outlets.filter((o) => {
    const matchesSearch =
      searchQuery === '' ||
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || o.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOutlets.length / pageSize);
  const paginatedOutlets = filteredOutlets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEditOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setFormData({
      name: outlet.name,
      code: outlet.code,
      address: outlet.address,
      phone: outlet.phone,
      status: outlet.status,
    });
    setShowEditModal(true);
  };

  const handleUpdateOutlet = () => {
    setOutlets(
      outlets.map((o) =>
        o.id === selectedOutlet.id
          ? { ...o, ...formData }
          : o
      )
    );
    setShowEditModal(false);
    alert('Outlet updated successfully!');
  };

  const handleViewOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setShowViewModal(true);
  };

  const handleDeleteOutlet = (outletId) => {
    if (confirm('Are you sure you want to delete this outlet?')) {
      setOutlets(outlets.filter((o) => o.id !== outletId));
      alert('Outlet deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Outlet Management</h1>
        <p className="text-slate-600 mt-1">Manage franchise locations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search outlets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            {outletTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            {outletStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Address</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedOutlets.map((outlet) => (
              <tr key={outlet.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{outlet.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{outlet.code}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{outlet.address.street}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{outlet.contactPerson}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    outlet.status === 'active' ? 'bg-green-100 text-green-700' :
                    outlet.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {outlet.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleViewOutlet(outlet)} className="p-1 hover:bg-slate-200 rounded text-blue-600">👁️</button>
                    <button onClick={() => handleEditOutlet(outlet)} className="p-1 hover:bg-slate-200 rounded text-green-600">✏️</button>
                    <button onClick={() => handleDeleteOutlet(outlet.id)} className="p-1 hover:bg-slate-200 rounded text-red-600">🗑️</button>
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
          Showing {paginatedOutlets.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(currentPage * pageSize, filteredOutlets.length)} of {filteredOutlets.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedOutlet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200"><h2 className="text-xl font-bold">Edit Outlet</h2></div>
            <div className="p-6 space-y-4">
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              <input type="text" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="Code" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                {outletStatuses.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
              </select>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
              <button onClick={handleUpdateOutlet} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedOutlet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200"><h2 className="text-xl font-bold">Outlet Details</h2></div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Name:</span><span className="font-medium">{selectedOutlet.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Code:</span><span className="font-medium">{selectedOutlet.code}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Address:</span><span className="font-medium">{selectedOutlet.address.city}, {selectedOutlet.address.state}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Phone:</span><span className="font-medium">{selectedOutlet.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Equipment:</span><span className="font-medium">{selectedOutlet.equipmentCount}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="font-medium">{selectedOutlet.status}</span></div>
            </div>
            <div className="p-6 border-t border-slate-200">
              <button onClick={() => setShowViewModal(false)} className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOutlets;
