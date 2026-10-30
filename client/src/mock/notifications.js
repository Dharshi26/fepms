/**
 * Mock Notifications Data
 */

export const mockNotifications = [
  {
    id: 'NOTIF-001',
    type: 'maintenance_overdue',
    title: 'Maintenance Overdue',
    message: 'Walk-in Freezer at Downtown Main St is overdue for maintenance',
    equipment: 'Walk-in Freezer 10x15',
    outlet: 'Downtown Main St',
    severity: 'high',
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    actionUrl: '/maintenance',
  },
  {
    id: 'NOTIF-002',
    type: 'warranty_expiring',
    title: 'Warranty Expiring Soon',
    message: 'Warranty for Combi Oven expires in 45 days',
    equipment: 'Combi Oven 10-Pan Capacity',
    outlet: 'Westside Mall',
    severity: 'medium',
    isRead: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    actionUrl: '/warranty',
  },
  {
    id: 'NOTIF-003',
    type: 'equipment_critical',
    title: 'Equipment Critical Status',
    message: 'Blast Chiller at Uptown Center is in critical condition',
    equipment: 'Blast Chiller/Freezer',
    outlet: 'Uptown Center',
    severity: 'critical',
    isRead: false,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    actionUrl: '/equipment',
  },
  {
    id: 'NOTIF-004',
    type: 'service_completed',
    title: 'Service Completed',
    message: 'Commercial Refrigerator maintenance completed successfully',
    equipment: 'Commercial Refrigerator 6-Door',
    outlet: 'Downtown Main St',
    severity: 'low',
    isRead: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    actionUrl: '/service-logs',
  },
  {
    id: 'NOTIF-005',
    type: 'maintenance_due',
    title: 'Maintenance Due Today',
    message: 'Commercial Deep Fryer maintenance is due today',
    equipment: 'Commercial Deep Fryer 40lb',
    outlet: 'Midtown Plaza',
    severity: 'high',
    isRead: true,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000), // 1.5 days ago
    actionUrl: '/maintenance',
  },
  {
    id: 'NOTIF-006',
    type: 'warranty_claim_update',
    title: 'Warranty Claim Approved',
    message: 'Warranty claim CLAIM-003 has been approved for $180.00',
    equipment: 'Commercial Refrigerator 6-Door',
    outlet: 'Downtown Main St',
    severity: 'low',
    isRead: true,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    actionUrl: '/warranty',
  },
  {
    id: 'NOTIF-007',
    type: 'maintenance_upcoming',
    title: 'Upcoming Maintenance',
    message: 'Exhaust Hood maintenance scheduled for December 11, 2024',
    equipment: 'Exhaust Hood System 12ft',
    outlet: 'Tech Park',
    severity: 'low',
    isRead: true,
    timestamp: new Date(Date.now() - 60 * 60 * 60 * 1000), // 2.5 days ago
    actionUrl: '/maintenance',
  },
  {
    id: 'NOTIF-008',
    type: 'equipment_issue',
    title: 'Equipment Issue Detected',
    message: 'HVAC Unit temperature sensor showing abnormal readings',
    equipment: 'HVAC Unit Rooftop',
    outlet: 'Queens Blvd',
    severity: 'medium',
    isRead: true,
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    actionUrl: '/equipment',
  },
  {
    id: 'NOTIF-009',
    type: 'system_notification',
    title: 'System Maintenance Notice',
    message: 'Scheduled system maintenance completed successfully',
    equipment: null,
    outlet: null,
    severity: 'low',
    isRead: true,
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    actionUrl: null,
  },
  {
    id: 'NOTIF-010',
    type: 'maintenance_completion_pending',
    title: 'Maintenance Completion Pending',
    message: 'Ice Machine service completion awaiting certification',
    equipment: 'Ice Machine 300lb/day',
    outlet: 'Airport Terminal',
    severity: 'medium',
    isRead: true,
    timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000), // 5 days ago
    actionUrl: '/service-logs',
  },
];

export const notificationStats = {
  total: mockNotifications.length,
  unread: mockNotifications.filter(n => !n.isRead).length,
  critical: mockNotifications.filter(n => n.severity === 'critical').length,
  high: mockNotifications.filter(n => n.severity === 'high').length,
};

export const notificationTypes = [
  { label: 'Maintenance Due', value: 'maintenance_due', icon: '🔧', color: 'bg-blue-50' },
  { label: 'Maintenance Overdue', value: 'maintenance_overdue', icon: '⚠️', color: 'bg-red-50' },
  { label: 'Warranty Expiring', value: 'warranty_expiring', icon: '⏰', color: 'bg-yellow-50' },
  { label: 'Equipment Critical', value: 'equipment_critical', icon: '🚨', color: 'bg-red-50' },
  { label: 'Service Completed', value: 'service_completed', icon: '✅', color: 'bg-green-50' },
  { label: 'Warranty Claim Update', value: 'warranty_claim_update', icon: '📋', color: 'bg-purple-50' },
  { label: 'System Notification', value: 'system_notification', icon: '🔔', color: 'bg-neutral-50' },
];

export const notificationSeverities = [
  { label: 'Critical', value: 'critical', color: 'text-red-600', bgColor: 'bg-red-50' },
  { label: 'High', value: 'high', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { label: 'Medium', value: 'medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { label: 'Low', value: 'low', color: 'text-green-600', bgColor: 'bg-green-50' },
];
