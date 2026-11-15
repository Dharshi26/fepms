/**
 * Admin Franchise Management Page
 * Manage franchise records and operations
 */

import React, { useState } from 'react';
import { mockFranchises, franchiseStatuses, franchiseTypes } from '../../mock/franchises';

const AdminFranchises = () => {
  const [franchises, setFranchises] = useState(mockFranchises);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredFranchises = franchises.filter((f) => {
    const matchesSearch =
      searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || f.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFranchises.length / pageSize);
  const paginatedFranchises = filteredFranchises.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEditFranchise = (franchise) => {
    setSelectedFranchise(franchise);
    setFormData({
      name: franchise.name,
      code: franchise.code,
      contactPerson: franchise.contactPerson,
      email: franchise.email,
      phone: franchise.phone,
      status: franchise.status,
      type: franchise.type,
    });
    setShowEditModal(true);
  };

  const handleUpdateFranchise = () => {
    setFranchises(
      franchises.map((f) =>
        f.id === selectedFranchise.id
          ? { ...f, ...formData }
          : f
      )
    );
    setShowEditModal(false);
    alert('Franchise updated successfully!');
  };

  const handleViewFranchise = (franchise) => {
    setSelectedFranchise(franchise);
    setShowViewModal(true);
  };

  const handleDeleteFranchise = (franchiseId) => {
    if (confirm('Are you sure you want to delete this franchise?')) {
      setFranchises(franchises.filter((f) => f.id !== franchiseId));
      alert('Franchise deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Franchise Management</h1>
        <p className="text-slate-600 mt-1">Manage franchise organizations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or code..."
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
            {franchiseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
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
            {franchiseStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Outlets</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginatedFranchises.map((franchise) => (
              <tr key={franchise.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{franchise.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{franchise.code}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{franchise.type}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{franchise.contactPerson}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{franchise.outletsCount}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    franchise.status === 'active' ? 'bg-green-100 text-green-700' :
                    franchise.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {franchise.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewFranchise(franchise)}
                      className="p-1 hover:bg-slate-200 rounded text-blue-600"
                      title="View"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleEditFranchise(franchise)}
                      className="p-1 hover:bg-slate-200 rounded text-green-600"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteFranchise(franchise.id)}
                      className="p-1 hover:bg-slate-200 rounded text-red-600"
                      title="Delete"
                    >
                      🗑️
                    </button>
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
          Showing {paginatedFranchises.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
          {Math.min(currentPage * pageSize, filteredFranchises.length)} of {filteredFranchises.length}
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
      {showEditModal && selectedFranchise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Edit Franchise</h2>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Code"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                {franchiseStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFranchise}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedFranchise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Franchise Details</h2>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between"><span className="text-slate-600">Name:</span><span className="font-medium">{selectedFranchise.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Code:</span><span className="font-medium">{selectedFranchise.code}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Email:</span><span className="font-medium">{selectedFranchise.email}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Phone:</span><span className="font-medium">{selectedFranchise.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Type:</span><span className="font-medium">{selectedFranchise.type}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Outlets:</span><span className="font-medium">{selectedFranchise.outletsCount}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Status:</span><span className="font-medium capitalize">{selectedFranchise.status}</span></div>
            </div>
            <div className="p-6 border-t border-slate-200">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFranchises;
