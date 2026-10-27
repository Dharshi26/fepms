import React from 'react';

/**
 * FEPMS Empty State Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Custom icon component
 * @param {'search' | 'data' | 'error' | 'success' | 'warning'} props.variant - Empty state variant
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {React.ReactNode} props.action - Action button/component
 * @param {React.ReactNode} props.secondaryAction - Secondary action button/component
 * @param {'center' | 'left'} props.align - Text alignment
 * @param {boolean} props.compact - Compact layout
 * @param {string} props.className - Additional CSS classes
 */
const EmptyState = ({
  icon,
  variant = 'data',
  title,
  description,
  action,
  secondaryAction,
  align = 'center',
  compact = false,
  className = '',
}) => {
  // Default icons for each variant
  const defaultIcons = {
    search: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    data: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    error: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.806-.833-2.572 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
      </svg>
    ),
    success: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.806-.833-2.572 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
      </svg>
    ),
  };
  
  // Variant colors
  const variantColors = {
    search: 'text-neutral-400',
    data: 'text-neutral-400',
    error: 'text-danger-400',
    success: 'text-success-400',
    warning: 'text-warning-400',
  };
  
  // Default titles
  const defaultTitles = {
    search: 'No results found',
    data: 'No data available',
    error: 'Something went wrong',
    success: 'All caught up',
    warning: 'Attention needed',
  };
  
  // Default descriptions
  const defaultDescriptions = {
    search: 'Try adjusting your search or filter to find what you\'re looking for.',
    data: 'There are no records to display at the moment.',
    error: 'We couldn\'t load this information. Please try again.',
    success: 'Everything is up to date and running smoothly.',
    warning: 'There are some items that require your attention.',
  };
  
  // Use provided values or defaults
  const displayIcon = icon || defaultIcons[variant];
  const displayTitle = title || defaultTitles[variant];
  const displayDescription = description || defaultDescriptions[variant];
  
  // Alignment classes
  const alignClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  };
  
  // Compact classes
  const compactClasses = compact ? 'py-6' : 'py-12';

  return (
    <div className={`empty-state ${compactClasses} ${className}`}>
      <div className={`flex flex-col ${alignClasses[align]}`}>
        {/* Icon */}
        <div className={`empty-state-icon mb-4 ${variantColors[variant]}`}>
          {displayIcon}
        </div>
        
        {/* Title */}
        <h3 className="empty-state-title mb-2">
          {displayTitle}
        </h3>
        
        {/* Description */}
        <p className="empty-state-description mb-6">
          {displayDescription}
        </p>
        
        {/* Actions */}
        {(action || secondaryAction) && (
          <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-start'} gap-3`}>
            {action && <div>{action}</div>}
            {secondaryAction && <div>{secondaryAction}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Loading Skeleton Component
 */
export const LoadingSkeleton = ({
  type = 'card',
  count = 1,
  className = '',
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);
  
  // Card skeleton
  const CardSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-3 w-1/2"></div>
        </div>
        <div className="skeleton-circle w-10 h-10"></div>
      </div>
      <div className="space-y-2">
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-5/6"></div>
        <div className="skeleton-text w-4/6"></div>
      </div>
      <div className="flex gap-2 mt-6">
        <div className="skeleton h-8 w-20 rounded"></div>
        <div className="skeleton h-8 w-24 rounded"></div>
      </div>
    </div>
  );
  
  // Table skeleton
  const TableSkeleton = () => (
    <div className="table-container animate-pulse">
      <div className="px-4 py-3 border-b border-border">
        <div className="skeleton h-4 w-48"></div>
      </div>
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex items-center gap-4">
            <div className="skeleton-circle w-10 h-10"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-3 w-1/2"></div>
            </div>
            <div className="skeleton h-8 w-20 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // List skeleton
  const ListSkeleton = () => (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center gap-3 p-3 border border-border rounded">
          <div className="skeleton-circle w-12 h-12"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-3 w-1/2"></div>
          </div>
          <div className="skeleton h-8 w-24 rounded"></div>
        </div>
      ))}
    </div>
  );
  
  // Stat card skeleton
  const StatSkeleton = () => (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-4 w-32"></div>
        <div className="skeleton-circle w-10 h-10"></div>
      </div>
      <div className="skeleton h-8 w-24 mb-2"></div>
      <div className="skeleton h-3 w-48"></div>
    </div>
  );
  
  // Render based on type
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'table':
        return <TableSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'stat':
        return <StatSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className={className}>
      {skeletons.map((index) => (
        <div key={index} className={index > 0 ? 'mt-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

/**
 * Error State Component
 */
export const ErrorState = ({
  title = 'Something went wrong',
  description = 'We couldn\'t load this information. Please try again.',
  action,
  retryText = 'Try Again',
  onRetry,
  className = '',
}) => {
  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={action || (onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary"
        >
          {retryText}
        </button>
      ))}
      className={className}
    />
  );
};

/**
 * No Results State Component
 */
export const NoResultsState = ({
  title = 'No results found',
  description = 'Try adjusting your search or filter to find what you\'re looking for.',
  action,
  clearText = 'Clear Filters',
  onClear,
  className = '',
}) => {
  return (
    <EmptyState
      variant="search"
      title={title}
      description={description}
      action={action || (onClear && (
        <button
          onClick={onClear}
          className="btn btn-outline"
        >
          {clearText}
        </button>
      ))}
      className={className}
    />
  );
};

export default EmptyState;