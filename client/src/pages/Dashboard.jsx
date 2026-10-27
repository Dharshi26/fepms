import React from 'react';

function FrontendStatus() {
  return (
    <div className="inline-flex items-start gap-3 border rounded-xl px-5 py-4 border-green-200 bg-green-50">
      <span className="mt-1 w-2.5 h-2.5 rounded-full shrink-0 bg-green-500" />
      <div>
        <p className="text-sm font-semibold text-slate-700">Frontend Mode</p>
        <p className="text-sm text-slate-600">Mock Data Active</p>
        <p className="text-xs text-slate-400 mt-1">
          Using local mock data - No backend required
        </p>
      </div>
    </div>
  );
}

const STAT_CARDS = [
  { label: 'Franchises',        value: '—', icon: '🏢', color: 'bg-blue-500'   },
  { label: 'Outlets',           value: '—', icon: '📍', color: 'bg-indigo-500' },
  { label: 'Equipment',         value: '—', icon: '⚙️',  color: 'bg-violet-500' },
  { label: 'Maintenance Due',   value: '—', icon: '🔧', color: 'bg-amber-500'  },
  { label: 'Overdue',           value: '—', icon: '⚠️',  color: 'bg-red-500'    },
  { label: 'Completed',         value: '—', icon: '✅', color: 'bg-green-500'  },
  { label: 'Warranties Expiring', value: '—', icon: '🛡️', color: 'bg-orange-500' },
  { label: 'Expired Warranties', value: '—', icon: '❌', color: 'bg-rose-500'  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Welcome back 👋</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Franchise Equipment Preventative Maintenance System
          </p>
        </div>
        <FrontendStatus />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-xl`}>
              {icon}
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Phase notice */}
      <div className="rounded-xl border border-dashed border-primary-300 bg-primary-50 p-6 text-center">
        <p className="text-primary-700 font-semibold text-sm">Phase 1 — Foundation Complete</p>
        <p className="text-primary-600 text-xs mt-1">
          Authentication, CRUD operations, maintenance scheduling, and reports will be enabled in subsequent phases.
        </p>
      </div>

      {/* Placeholder tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlaceholderTable title="Upcoming Maintenance" />
        <PlaceholderTable title="Recent Service Logs" />
      </div>
    </div>
  );
}

function PlaceholderTable({ title }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <span className="text-3xl mb-2">📋</span>
        <p className="text-sm">Available from Phase 3</p>
      </div>
    </div>
  );
}
