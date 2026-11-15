/**
 * Admin Notifications Page
 */

import React, { useState } from 'react';

const AdminNotifications = () => {
  const mockNotifications = [
    { id: 1, type: 'maintenance', title: 'Maintenance Due', message: 'Equipment EQ-001 maintenance due today', timestamp: '2024-10-27 10:30', read: false },
    { id: 2, type: 'warranty', title: 'Warranty Expiring', message: 'Equipment EQ-002 warranty expiring in 5 days', timestamp: '2024-10-27 09:15', read: false },
    { id: 3, type: 'user', title: 'New User Registered', message: 'New technician account created', timestamp: '2024-10-26 16:45', read: true },
    { id: 4, type: 'claim', title: 'Claim Pending', message: 'New warranty claim requires review', timestamp: '2024-10-26 14:20', read: true },
    { id: 5, type: 'service', title: 'Service Completed', message: 'Service log EQ-003 marked as complete', timestamp: '2024-10-26 12:10', read: true },
  ];

  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState('all');

  const filtered = filterType === 'all' ? notifications : notifications.filter(n => n.read === (filterType === 'read'));

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    alert('Notification deleted!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-1">System notifications and alerts</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Unread</p>
          <p className="text-2xl font-bold text-primary-600">{unreadCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'all' ? 'bg-primary-600 text-white' : 'bg-white border border-slate-300'}`}>
          All ({notifications.length})
        </button>
        <button onClick={() => setFilterType('unread')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'unread' ? 'bg-primary-600 text-white' : 'bg-white border border-slate-300'}`}>
          Unread ({unreadCount})
        </button>
        <button onClick={() => setFilterType('read')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'read' ? 'bg-primary-600 text-white' : 'bg-white border border-slate-300'}`}>
          Read ({notifications.filter(n => n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map(notif => (
          <div key={notif.id} className={`bg-white rounded-lg shadow p-4 border-l-4 ${!notif.read ? 'border-primary-500' : 'border-slate-200'}`}>
            <div className="flex items-start gap-4">
              <span className="text-2xl">
                {notif.type === 'maintenance' && '📅'}
                {notif.type === 'warranty' && '🛡️'}
                {notif.type === 'user' && '👤'}
                {notif.type === 'claim' && '📄'}
                {notif.type === 'service' && '📋'}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 bg-primary-600 rounded-full"></span>}
                </div>
                <p className="text-slate-600 text-sm mt-1">{notif.message}</p>
                <p className="text-xs text-slate-500 mt-2">{notif.timestamp}</p>
              </div>
              <div className="flex gap-2">
                {!notif.read && (
                  <button onClick={() => handleMarkAsRead(notif.id)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                    Mark Read
                  </button>
                )}
                <button onClick={() => handleDelete(notif.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
