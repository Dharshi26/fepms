import React from 'react';

/**
 * FEPMS Badge Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'} props.variant - Badge style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Badge size
 * @param {'rounded' | 'pill'} props.shape - Badge shape
 * @param {boolean} props.dot - Show status dot
 * @param {boolean} props.removable - Show remove button
 * @param {Function} props.onRemove - Remove button click handler
 * @param {string} props.className - Additional CSS classes
 * @param {React.HTMLAttributes<HTMLSpanElement>} props.rest - Other span attributes
 */
const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  shape = 'pill',
  dot = false,
  removable = false,
  onRemove,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-brand-100 text-brand-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800',
    info: 'bg-brand-100 text-brand-800',
    neutral: 'bg-neutral-100 text-neutral-800',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };
  
  // Shape classes
  const shapeClasses = {
    rounded: 'rounded',
    pill: 'rounded-full',
  };
  
  // Status dot colors
  const dotColors = {
    primary: 'bg-brand-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    info: 'bg-brand-500',
    neutral: 'bg-neutral-500',
  };
  
  // Combined classes
  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`;
  
  // Remove button handler
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span className={badgeClasses} {...rest}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[variant]}`} />
      )}
      
      {children}
      
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1.5 -mr-0.5 p-0.5 hover:bg-black/10 rounded-full focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove badge"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

/**
 * Status Dot Component - Simple status indicator
 */
export const StatusDot = ({ 
  status = 'neutral',
  size = 'md',
  pulse = false,
  className = '',
}) => {
  const statusColors = {
    operational: 'bg-status-operational',
    maintenance: 'bg-status-maintenance',
    critical: 'bg-status-critical',
    standby: 'bg-status-standby',
    archived: 'bg-status-archived',
    neutral: 'bg-neutral-400',
  };
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };
  
  const pulseClass = pulse ? 'animate-pulse-subtle' : '';
  
  return (
    <span
      className={`inline-block rounded-full ${statusColors[status]} ${sizeClasses[size]} ${pulseClass} ${className}`}
      aria-label={`Status: ${status}`}
    />
  );
};

/**
 * Status Badge Component - Badge with status dot
 */
export const StatusBadge = ({
  status = 'neutral',
  label,
  showDot = true,
  size = 'md',
  className = '',
}) => {
  const statusLabels = {
    operational: 'Operational',
    maintenance: 'Maintenance',
    critical: 'Critical',
    standby: 'Standby',
    archived: 'Archived',
    neutral: 'Neutral',
  };
  
  const statusVariants = {
    operational: 'success',
    maintenance: 'warning',
    critical: 'danger',
    standby: 'info',
    archived: 'neutral',
    neutral: 'neutral',
  };
  
  return (
    <Badge
      variant={statusVariants[status]}
      size={size}
      dot={showDot}
      className={className}
    >
      {label || statusLabels[status]}
    </Badge>
  );
};

export default Badge;