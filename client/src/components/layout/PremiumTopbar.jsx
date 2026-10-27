import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, SearchBar } from '../ui';

/**
 * FEPMS Premium Topbar Component
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {Function} props.onMenuClick - Mobile menu click handler
 * @param {boolean} props.sidebarCollapsed - Whether sidebar is collapsed
 * @param {Function} props.onSidebarToggle - Sidebar toggle handler
 * @param {Array} props.breadcrumbs - Breadcrumb trail array
 */
const PremiumTopbar = ({
  title,
  onMenuClick,
  sidebarCollapsed = false,
  onSidebarToggle,
  breadcrumbs = [],
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Maintenance Due Tomorrow',
      description: 'Equipment #EQ-1024 requires preventive maintenance',
      time: '10 minutes ago',
      read: false,
      priority: 'warning',
      icon: 'calendar',
    },
    {
      id: 2,
      title: 'Warranty Expiring Soon',
      description: '3 equipment warranties expiring in 7 days',
      time: '2 hours ago',
      read: false,
      priority: 'warning',
      icon: 'shield',
    },
    {
      id: 3,
      title: 'Service Log Updated',
      description: 'Technician completed service on Refrigeration Unit #RU-458',
      time: '1 day ago',
      read: true,
      priority: 'info',
      icon: 'clipboard',
    },
    {
      id: 4,
      title: 'New Franchise Added',
      description: 'Burger King franchise registered in the system',
      time: '2 days ago',
      read: true,
      priority: 'info',
      icon: 'building',
    },
  ];
  
  // Unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Format time
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  // Handle search
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // In a real app, this would trigger search functionality
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowUserMenu(false);
  };
  
  // Notification icon component
  const NotificationIcon = ({ name }) => {
    const icons = {
      calendar: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      shield: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      clipboard: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      building: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    };
    
    return icons[name] || null;
  };
  
  // Priority colors
  const priorityColors = {
    warning: 'text-warning-600 bg-warning-50',
    danger: 'text-danger-600 bg-danger-50',
    info: 'text-brand-600 bg-brand-50',
  };

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm">
      {/* Left section: Menu button + title + breadcrumbs */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg text-text-tertiary hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop sidebar toggle */}
        <button
          className="hidden lg:inline-flex p-2 rounded-lg text-text-tertiary hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          onClick={onSidebarToggle}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Title and breadcrumbs */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          
          {breadcrumbs.length > 0 && (
            <div className="flex items-center text-sm text-text-tertiary">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <svg className="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <span className={index === breadcrumbs.length - 1 ? 'text-text-secondary font-medium' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Center section: Search bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <SearchBar
          placeholder="Search equipment, franchises, maintenance..."
          onSearch={handleSearch}
          value={searchQuery}
          onChange={setSearchQuery}
          size="sm"
        />
      </div>
      
      {/* Right section: Notifications, user, time */}
      <div className="flex items-center gap-3">
        {/* Time display */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-text-primary">{formattedTime}</span>
          <span className="text-xs text-text-tertiary">{formattedDate}</span>
        </div>
        
        {/* Quick actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon="plus"
            className="text-text-tertiary hover:text-text-primary"
          >
            <span className="hidden lg:inline">Quick Add</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            icon="download"
            className="text-text-tertiary hover:text-text-primary"
          >
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-text-tertiary hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full animate-pulse-subtle"></span>
            )}
          </button>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50 animate-scale-in">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                  <button className="text-xs text-brand-600 hover:text-brand-700">
                    Mark all as read
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        px-4 py-3 border-b border-border-light last:border-b-0
                        hover:bg-neutral-50 transition-colors duration-150
                        ${!notification.read ? 'bg-brand-50/50' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${priorityColors[notification.priority]}`}>
                          <NotificationIcon name={notification.icon} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-text-primary">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                            )}
                          </div>
                          
                          <p className="text-sm text-text-tertiary mt-1">
                            {notification.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-text-disabled">
                              {notification.time}
                            </span>
                            <button className="text-xs text-brand-600 hover:text-brand-700">
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-text-tertiary">No notifications</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 border-t border-border">
                <button className="w-full text-sm text-brand-600 hover:text-brand-700 text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-3 pr-2 py-1 border-l border-border hover:bg-neutral-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <div className="w-8 h-8 gradient-brand rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text-primary leading-tight">
                {user?.name || 'User'}
              </p>
              <span className="text-xs text-text-tertiary">
                {user?.role || 'Administrator'}
              </span>
            </div>
            
            <svg
              className={`w-4 h-4 text-text-tertiary transition ${showUserMenu ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {/* User menu dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-xl overflow-hidden z-50 animate-scale-in">
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="py-1">
                <button
                  onClick={() => navigate('/settings/profile')}
                  className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-neutral-50 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Settings
                </button>
                
                <button
                  onClick={() => navigate('/settings/account')}
                  className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-neutral-50 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>
                
                <button
                  onClick={() => navigate('/settings/notifications')}
                  className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-neutral-50 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notification Settings
                </button>
              </div>
              
              <div className="border-t border-border py-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-danger-50 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PremiumTopbar;