import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui';

/**
 * FEPMS Premium Sidebar Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether sidebar is open (mobile)
 * @param {Function} props.onClose - Close handler for mobile
 * @param {boolean} props.collapsed - Whether sidebar is collapsed (desktop)
 * @param {Function} props.onToggleCollapse - Toggle collapse handler
 */
const PremiumSidebar = ({
  isOpen = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState({});
  
  // Navigation groups with icons
  const NAVIGATION_GROUPS = [
    {
      title: null, // No title for main dashboard
      items: [
        { 
          path: '/', 
          label: 'Dashboard', 
          icon: 'dashboard',
          exact: true 
        },
      ],
    },
    {
      title: 'Management',
      items: [
        { 
          path: '/franchises', 
          label: 'Franchises', 
          icon: 'building',
          badge: '12' // Example badge count
        },
        { 
          path: '/outlets', 
          label: 'Outlets', 
          icon: 'store',
          badge: '45'
        },
        { 
          path: '/equipment', 
          label: 'Equipment', 
          icon: 'equipment',
          badge: '327'
        },
      ],
    },
    {
      title: 'Maintenance',
      items: [
        { 
          path: '/maintenance', 
          label: 'Preventive Maintenance', 
          icon: 'calendar',
          badge: '8',
          badgeVariant: 'warning'
        },
        { 
          path: '/service-logs', 
          label: 'Service Logs', 
          icon: 'clipboard',
          badge: '142'
        },
      ],
    },
    {
      title: 'Warranty',
      items: [
        { 
          path: '/warranties', 
          label: 'Warranties', 
          icon: 'shield',
          badge: '23',
          badgeVariant: 'warning'
        },
        { 
          path: '/claims', 
          label: 'Claims', 
          icon: 'file',
          badge: '5'
        },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { 
          path: '/reports', 
          label: 'Reports', 
          icon: 'chart'
        },
        { 
          path: '/notifications', 
          label: 'Notifications', 
          icon: 'bell',
          badge: '3',
          badgeVariant: 'danger'
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        { 
          path: '/admin', 
          label: 'Admin Panel', 
          icon: 'admin',
          badge: 'NEW'
        },
      ],
    },
    {
      title: 'Account',
      items: [
        { 
          path: '/settings', 
          label: 'Settings', 
          icon: 'settings'
        },
        { 
          path: '/profile', 
          label: 'Profile', 
          icon: 'users'
        },
      ],
    },
  ];
  
  // Icon mapping
  const Icon = ({ name, className = '' }) => {
    const icons = {
      dashboard: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      building: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      store: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      equipment: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      calendar: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      clipboard: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      shield: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      file: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      chart: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bell: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      users: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 4.75a4.5 4.5 0 01-9 0m9 0a4.5 4.5 0 00-9 0" />
        </svg>
      ),
      settings: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      admin: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      chevronDown: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ),
      chevronRight: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
    };
    
    return icons[name] || null;
  };
  
  // Toggle group expansion
  const toggleGroup = (groupTitle) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };
  
  // Check if item is active
  const isItemActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };
  
  // Badge variant mapping
  const badgeVariantMap = {
    warning: 'warning',
    danger: 'danger',
    default: 'neutral',
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          flex flex-col
          bg-surface border-r border-border
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-20' : 'w-64'}
          lg:translate-x-0 lg:static lg:z-30
          shadow-lg
        `}
      >
        {/* Logo header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-brand rounded-lg flex items-center justify-center text-white font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-text-primary">FEPMS</h1>
                <p className="text-xs text-text-tertiary">Maintenance System</p>
              </div>
            )}
          </div>
          
          {/* Collapse toggle button (desktop only) */}
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="hidden lg:inline-flex"
              icon="chevronLeft"
              iconPosition="left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAVIGATION_GROUPS.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6 last:mb-0">
              {/* Group title */}
              {group.title && !collapsed && (
                <div className="px-3 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                      {group.title}
                    </span>
                    
                    {group.title && (
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className="text-text-tertiary hover:text-text-primary"
                      >
                        <Icon 
                          name={expandedGroups[group.title] ? 'chevronDown' : 'chevronRight'} 
                          className="w-3 h-3"
                        />
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Group items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = isItemActive(item);
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      className={({ isActive: navIsActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm font-medium transition-all duration-150
                        ${isActive || navIsActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-text-tertiary hover:text-text-primary hover:bg-neutral-50'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      onClick={onClose}
                    >
                      <div className="relative">
                        <Icon 
                          name={item.icon} 
                          className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-current'}`}
                        />
                        
                        {/* Active indicator dot */}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
                        )}
                      </div>
                      
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          
                          {/* Badge */}
                          {item.badge && (
                            <span className={`
                              inline-flex items-center justify-center
                              min-w-[1.5rem] h-5 px-1.5
                              text-xs font-medium rounded-full
                              ${item.badgeVariant === 'warning' 
                                ? 'bg-warning-100 text-warning-800' 
                                : item.badgeVariant === 'danger'
                                ? 'bg-danger-100 text-danger-800'
                                : 'bg-neutral-100 text-neutral-800'
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        
        {/* Sidebar footer */}
        <div className="border-t border-border p-4">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                <span className="text-brand-700 font-semibold text-sm">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                <p className="text-xs text-text-tertiary">Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-tertiary hover:text-text-primary"
                icon="logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                <span className="text-brand-700 font-semibold text-sm">JD</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default PremiumSidebar;