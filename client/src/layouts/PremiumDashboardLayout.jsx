import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PremiumSidebar from '../components/layout/PremiumSidebar';
import PremiumTopbar from '../components/layout/PremiumTopbar';

// Page titles and breadcrumbs mapping
const PAGE_CONFIGS = {
  '/': {
    title: 'Dashboard',
    breadcrumbs: ['Dashboard'],
  },
  '/franchises': {
    title: 'Franchises',
    breadcrumbs: ['Management', 'Franchises'],
  },
  '/franchises/:id': {
    title: 'Franchise Details',
    breadcrumbs: ['Management', 'Franchises', 'Details'],
  },
  '/outlets': {
    title: 'Outlets',
    breadcrumbs: ['Management', 'Outlets'],
  },
  '/outlets/:id': {
    title: 'Outlet Details',
    breadcrumbs: ['Management', 'Outlets', 'Details'],
  },
  '/equipment': {
    title: 'Equipment',
    breadcrumbs: ['Management', 'Equipment'],
  },
  '/equipment/:id': {
    title: 'Equipment Details',
    breadcrumbs: ['Management', 'Equipment', 'Details'],
  },
  '/maintenance': {
    title: 'Preventive Maintenance',
    breadcrumbs: ['Maintenance', 'Schedule'],
  },
  '/maintenance/:id': {
    title: 'Maintenance Details',
    breadcrumbs: ['Maintenance', 'Schedule', 'Details'],
  },
  '/service-logs': {
    title: 'Service Logs',
    breadcrumbs: ['Maintenance', 'Service Logs'],
  },
  '/service-logs/:id': {
    title: 'Service Log Details',
    breadcrumbs: ['Maintenance', 'Service Logs', 'Details'],
  },
  '/warranties': {
    title: 'Warranties',
    breadcrumbs: ['Warranty', 'Active Warranties'],
  },
  '/warranties/:id': {
    title: 'Warranty Details',
    breadcrumbs: ['Warranty', 'Active Warranties', 'Details'],
  },
  '/claims': {
    title: 'Warranty Claims',
    breadcrumbs: ['Warranty', 'Claims'],
  },
  '/claims/:id': {
    title: 'Claim Details',
    breadcrumbs: ['Warranty', 'Claims', 'Details'],
  },
  '/reports': {
    title: 'Reports',
    breadcrumbs: ['Analytics', 'Reports'],
  },
  '/notifications': {
    title: 'Notifications',
    breadcrumbs: ['Analytics', 'Notifications'],
  },
  '/users': {
    title: 'Users',
    breadcrumbs: ['Administration', 'Users'],
  },
  '/settings': {
    title: 'Settings',
    breadcrumbs: ['Administration', 'Settings'],
  },
  '/profile': {
    title: 'Profile',
    breadcrumbs: ['Administration', 'Profile'],
  },
};

/**
 * FEPMS Premium Dashboard Layout
 * 
 * Main layout wrapper with premium sidebar and topbar
 */
const PremiumDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Get page configuration based on current route
  const getPageConfig = () => {
    // Try to match exact path first
    const exactMatch = PAGE_CONFIGS[location.pathname];
    if (exactMatch) return exactMatch;
    
    // Try to match dynamic routes (with :id)
    for (const [pattern, config] of Object.entries(PAGE_CONFIGS)) {
      if (pattern.includes(':id')) {
        const basePath = pattern.split('/:id')[0];
        if (location.pathname.startsWith(basePath + '/')) {
          return config;
        }
      }
    }
    
    // Default fallback
    return {
      title: 'FEPMS',
      breadcrumbs: [],
    };
  };
  
  const pageConfig = getPageConfig();
  
  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  // Handle sidebar toggle (desktop)
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Handle mobile menu click
  const handleMobileMenuClick = () => {
    setSidebarOpen(true);
  };
  
  // Handle sidebar close (mobile)
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Premium Sidebar */}
      <PremiumSidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Premium Topbar */}
        <PremiumTopbar
          title={pageConfig.title}
          onMenuClick={handleMobileMenuClick}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={handleSidebarToggle}
          breadcrumbs={pageConfig.breadcrumbs}
        />
        
        {/* Main content with smooth transition */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Footer (optional) */}
        <footer className="border-t border-border bg-surface py-3 px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-text-tertiary">
              © {new Date().getFullYear()} FEPMS — Franchise Equipment Preventative Maintenance System
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-text-tertiary hover:text-text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-text-tertiary hover:text-text-primary">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-text-tertiary hover:text-text-primary">
                Support
              </a>
              <span className="text-xs text-text-disabled">
                v1.0.0 • Premium Edition
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PremiumDashboardLayout;