import React, { useMemo } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockFranchises } from '../mock/franchises';
import { mockOutlets } from '../mock/outlets';
import { mockEquipment } from '../mock/equipment';
import { mockMaintenance } from '../mock/maintenance';
import { mockServiceLogs } from '../mock/serviceLogs';
import { mockWarranties } from '../mock/warranties';

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

function StatCard({ label, value, icon: Icon, color, trend }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-slate-600'}`}>
              <TrendingUp size={12} /> {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // Calculate metrics from mock data
  const metrics = useMemo(() => {
    const now = new Date();
    
    const maintenanceDue = mockMaintenance.filter(m => 
      new Date(m.scheduledDate) <= now && m.status !== 'completed'
    ).length;
    
    const overdue = mockMaintenance.filter(m => 
      new Date(m.scheduledDate) < now && m.status !== 'completed'
    ).length;
    
    const completed = mockServiceLogs.filter(m => m.status === 'completed').length;
    
    const warrantiesExpiring = mockWarranties.filter(w => {
      const expiry = new Date(w.expiryDate);
      return expiry > now && expiry <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    }).length;
    
    const expiredWarranties = mockWarranties.filter(w => 
      new Date(w.expiryDate) < now
    ).length;
    
    return {
      franchises: mockFranchises.length,
      outlets: mockOutlets.length,
      equipment: mockEquipment.length,
      maintenanceDue,
      overdue,
      completed,
      warrantiesExpiring,
      expiredWarranties,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Franchise Equipment Preventative Maintenance System
          </p>
        </div>
        <FrontendStatus />
      </div>

      {/* KPI Cards - Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Franchises" value={metrics.franchises} icon={()=><span>🏢</span>} color="bg-blue-500" />
        <StatCard label="Outlets" value={metrics.outlets} icon={()=><span>📍</span>} color="bg-indigo-500" />
        <StatCard label="Equipment" value={metrics.equipment} icon={()=><span>⚙️</span>} color="bg-violet-500" />
        <StatCard label="Total Assets" value={metrics.equipment + metrics.outlets} icon={()=><span>📊</span>} color="bg-cyan-500" />
      </div>

      {/* Maintenance Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Maintenance Due" 
          value={metrics.maintenanceDue} 
          icon={Clock} 
          color="bg-amber-500"
          trend={5}
        />
        <StatCard 
          label="Overdue" 
          value={metrics.overdue} 
          icon={AlertTriangle} 
          color="bg-red-500"
          trend={-3}
        />
        <StatCard 
          label="Completed (30d)" 
          value={metrics.completed} 
          icon={CheckCircle} 
          color="bg-green-500"
          trend={12}
        />
        <StatCard 
          label="Pending Tasks" 
          value={metrics.maintenanceDue + metrics.overdue} 
          icon={Clock} 
          color="bg-orange-500"
        />
      </div>

      {/* Warranty Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard 
          label="Warranties Expiring (30d)" 
          value={metrics.warrantiesExpiring} 
          icon={()=><span>🛡️</span>} 
          color="bg-purple-500"
        />
        <StatCard 
          label="Expired Warranties" 
          value={metrics.expiredWarranties} 
          icon={()=><span>❌</span>} 
          color="bg-rose-500"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMaintenanceCard />
        <RecentServiceLogsCard />
      </div>

      {/* Info Banner */}
      <div className="rounded-xl border border-dashed border-primary-300 bg-primary-50 p-6">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
          <div>
            <p className="text-primary-900 font-semibold text-sm">Mock Data Mode</p>
            <p className="text-primary-700 text-sm mt-1">
              This dashboard displays realistic mock data. All data is stored locally and resets on page refresh. 
              Backend integration and persistent storage will be added in Phase 2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentMaintenanceCard() {
  const recentMaintenance = mockMaintenance.slice(0, 5);
  
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Upcoming Maintenance</h3>
        <a href="/maintenance" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
          View All →
        </a>
      </div>
      <div className="divide-y divide-slate-100">
        {recentMaintenance.map((item) => (
          <div key={item.id} className="px-5 py-3 hover:bg-slate-50 transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{item.equipmentName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.maintenanceType}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                new Date(item.nextScheduledDate) < new Date() 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentServiceLogsCard() {
  const recentLogs = mockServiceLogs.slice(0, 5);
  
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Recent Service Activity</h3>
        <a href="/service-logs" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
          View All →
        </a>
      </div>
      <div className="divide-y divide-slate-100">
        {recentLogs.map((log) => (
          <div key={log.id} className="px-5 py-3 hover:bg-slate-50 transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{log.description}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(log.serviceDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                log.status === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : log.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
