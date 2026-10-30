import React, { useState } from 'react';
import { Bell, Check, Trash2, Archive } from 'lucide-react';
import { mockNotifications } from '../mock/notifications';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'alerts') return n.type === 'alert';
    if (filter === 'updates') return n.type === 'update';
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return '⚠️';
      case 'success': return '✅';
      case 'update': return '📢';
      case 'maintenance': return '🔧';
      default: return '📬';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert': return 'border-l-red-500 bg-red-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'update': return 'border-l-blue-500 bg-blue-50';
      case 'maintenance': return 'border-l-amber-500 bg-amber-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Stay updated with system alerts and maintenance reminders
          </p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard 
          label="Unread" 
          value={unreadCount} 
          color="bg-blue-50 text-blue-700"
          icon="📬"
        />
        <SummaryCard 
          label="Total Notifications" 
          value={notifications.length} 
          color="bg-slate-50 text-slate-700"
          icon="🔔"
        />
        <SummaryCard 
          label="Alerts" 
          value={notifications.filter(n => n.type === 'alert').length} 
          color="bg-red-50 text-red-700"
          icon="⚠️"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'unread' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('alerts')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'alerts' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setFilter('updates')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'updates' 
                ? 'bg-primary-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Updates
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`border-l-4 rounded-lg p-4 transition flex items-start gap-4 ${getNotificationColor(notification.type)} ${
                !notification.read ? 'ring-1 ring-primary-300' : ''
              }`}
            >
              <span className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{notification.title}</p>
                    <p className="text-sm text-slate-700 mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-3 h-3 rounded-full bg-primary-600 flex-shrink-0 mt-1" />
                  )}
                </div>
                
                <p className="text-xs text-slate-500 mt-2">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-2 text-slate-600 hover:bg-white/50 rounded-lg transition"
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 text-slate-600 hover:bg-white/50 hover:text-red-600 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
            <Bell size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium">No notifications</p>
            <p className="text-sm text-slate-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, icon }) {
  return (
    <div className={`rounded-xl border border-slate-100 p-4 ${color}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
