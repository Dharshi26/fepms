import React, { useState } from 'react';
import { Download, Calendar, Filter, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30days');

  const reports = [
    {
      id: 1,
      title: 'Equipment Status Report',
      description: 'Summary of all equipment status, maintenance schedules, and warranty coverage',
      icon: '📊',
      category: 'Equipment',
      lastGenerated: '2024-11-15T10:30:00',
    },
    {
      id: 2,
      title: 'Maintenance Schedule Summary',
      description: 'Overview of completed, pending, and overdue maintenance tasks',
      icon: '🔧',
      category: 'Maintenance',
      lastGenerated: '2024-11-14T14:15:00',
    },
    {
      id: 3,
      title: 'Warranty Claims Analytics',
      description: 'Analysis of warranty claims, approvals, and financial impact',
      icon: '💰',
      category: 'Warranty',
      lastGenerated: '2024-11-13T09:45:00',
    },
    {
      id: 4,
      title: 'Service Activity Log',
      description: 'Detailed service history and technician performance metrics',
      icon: '📋',
      category: 'Service',
      lastGenerated: '2024-11-12T16:20:00',
    },
    {
      id: 5,
      title: 'Franchise Performance Report',
      description: 'Equipment utilization and maintenance compliance by franchise location',
      icon: '🏢',
      category: 'Franchise',
      lastGenerated: '2024-11-11T11:00:00',
    },
    {
      id: 6,
      title: 'Cost Analysis Report',
      description: 'Maintenance costs, warranty claims, and budget analysis',
      icon: '💵',
      category: 'Financial',
      lastGenerated: '2024-11-10T13:30:00',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Generate and download comprehensive system reports
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
              <Filter size={16} />
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary-600" />
          Key Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Equipment" value="47" trend="+3" />
          <MetricCard label="Maintenance Completed" value="23" trend="+8" />
          <MetricCard label="Avg. Response Time" value="2.4 hrs" trend="-15%" />
          <MetricCard label="Equipment Availability" value="94.2%" trend="+2.1%" />
        </div>
      </div>
    </div>
  );
}

function ReportCard({ report }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition p-5 space-y-4">
      <div className="flex items-start justify-between">
        <span className="text-3xl">{report.icon}</span>
        <span className="text-xs font-semibold px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
          {report.category}
        </span>
      </div>
      
      <div>
        <h3 className="font-semibold text-slate-900">{report.title}</h3>
        <p className="text-sm text-slate-600 mt-1">{report.description}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition flex items-center justify-center gap-2">
          <Download size={14} />
          Download
        </button>
        <button className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition">
          Preview
        </button>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
      <p className="text-xs text-slate-600 font-medium">{label}</p>
      <div className="flex items-baseline justify-between mt-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className={`text-xs font-semibold ${trend.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
