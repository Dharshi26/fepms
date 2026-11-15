/**
 * Admin Reports Page with CSV Export
 */

import React, { useState } from 'react';
import { mockFranchises } from '../../mock/franchises';
import { mockOutlets } from '../../mock/outlets';
import { mockEquipment } from '../../mock/equipment';

const AdminReports = () => {
  const [dateRange, setDateRange] = useState('last_30_days');

  const generateCSV = (data, columns, filename) => {
    const headers = Object.keys(columns);
    const csv = [
      headers.map(h => `"${columns[h]}"`).join(','),
      ...data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    alert('Report exported successfully!');
  };

  const handleExportFranchises = () => {
    const columns = { name: 'Franchise Name', code: 'Code', status: 'Status', outletsCount: 'Outlets' };
    generateCSV(mockFranchises, columns, 'franchises_report.csv');
  };

  const handleExportOutlets = () => {
    const columns = { name: 'Outlet Name', code: 'Code', status: 'Status', equipmentCount: 'Equipment' };
    generateCSV(mockOutlets, columns, 'outlets_report.csv');
  };

  const handleExportEquipment = () => {
    const columns = { name: 'Equipment', category: 'Category', serialNumber: 'Serial', status: 'Status' };
    generateCSV(mockEquipment, columns, 'equipment_report.csv');
  };

  const reportCards = [
    { title: 'Franchise Report', icon: '🏢', onExport: handleExportFranchises, count: mockFranchises.length },
    { title: 'Outlet Report', icon: '🏪', onExport: handleExportOutlets, count: mockOutlets.length },
    { title: 'Equipment Report', icon: '⚙️', onExport: handleExportEquipment, count: mockEquipment.length },
    { title: 'Service Report', icon: '📋', onExport: () => alert('Service report exported!'), count: 142 },
    { title: 'Warranty Report', icon: '🛡️', onExport: () => alert('Warranty report exported!'), count: 23 },
    { title: 'Claims Report', icon: '📄', onExport: () => alert('Claims report exported!'), count: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600 mt-1">Generate and export system reports</p>
      </div>

      {/* Date Range */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-sm font-medium text-slate-700">Date Range:</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg">
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="this_year">This Year</option>
            <option value="all_time">All Time</option>
          </select>
          <button className="ml-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Apply</button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((report, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{report.icon}</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">Report</span>
            </div>
            <h3 className="font-bold text-slate-900">{report.title}</h3>
            <p className="text-slate-600 text-sm mt-2">Records: {report.count}</p>
            <button
              onClick={report.onExport}
              className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
            >
              📥 Export CSV
            </button>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm">Total Franchises</p>
          <p className="text-3xl font-bold mt-1">{mockFranchises.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm">Total Outlets</p>
          <p className="text-3xl font-bold mt-1">{mockOutlets.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm">Total Equipment</p>
          <p className="text-3xl font-bold mt-1">{mockEquipment.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm">System Uptime</p>
          <p className="text-3xl font-bold text-green-600 mt-1">99.8%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
