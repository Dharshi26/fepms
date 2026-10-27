/**
 * FEPMS Components Master Export
 * 
 * Import components from their respective categories:
 * 
 * import { Button, Card, Input } from './components/ui';
 * import { Table } from './components/data';
 * import { Modal, EmptyState } from './components/feedback';
 * import { MapVisualization } from './components/visualization';
 */

// Re-export all UI components
export * from './ui';

// Re-export all Data components
export * from './data';

// Re-export all Feedback components
export * from './feedback';

// Re-export all Visualization components
export * from './visualization';

// Export layout components
export { default as DashboardLayout } from '../layouts/DashboardLayout';
export { default as Sidebar } from './Sidebar';
export { default as Topbar } from './Topbar';
export { default as ProtectedRoute } from './ProtectedRoute';