import React from 'react';

/**
 * FEPMS Card Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {'default' | 'elevated' | 'dark'} props.variant - Card style variant
 * @param {boolean} props.hover - Enable hover effects
 * @param {boolean} props.padding - Whether to add default padding
 * @param {string} props.className - Additional CSS classes
 * @param {React.HTMLAttributes<HTMLDivElement>} props.rest - Other div attributes
 */
const Card = ({
  children,
  variant = 'default',
  hover = true,
  padding = true,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'card rounded-lg border transition-all duration-200';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-surface border-border shadow-card',
    elevated: 'bg-surface-elevated border-border-dark/10 shadow-md',
    dark: 'bg-surface-dark border-border-dark text-text-inverse shadow-lg',
  };
  
  // Hover classes
  const hoverClasses = hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 hover:border-brand-200' : '';
  
  // Padding classes
  const paddingClasses = padding ? 'p-6' : '';
  
  // Combined classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${paddingClasses} ${className}`;

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
export const CardHeader = ({ children, className = '', ...rest }) => (
  <div className={`pb-4 border-b border-border ${className}`} {...rest}>
    {children}
  </div>
);

/**
 * Card Title Component
 */
export const CardTitle = ({ children, className = '', ...rest }) => (
  <h3 className={`text-heading-3 text-text-primary ${className}`} {...rest}>
    {children}
  </h3>
);

/**
 * Card Description Component
 */
export const CardDescription = ({ children, className = '', ...rest }) => (
  <p className={`text-body-small text-text-tertiary mt-1 ${className}`} {...rest}>
    {children}
  </p>
);

/**
 * Card Content Component
 */
export const CardContent = ({ children, className = '', ...rest }) => (
  <div className={`pt-4 ${className}`} {...rest}>
    {children}
  </div>
);

/**
 * Card Footer Component
 */
export const CardFooter = ({ children, className = '', ...rest }) => (
  <div className={`pt-4 border-t border-border ${className}`} {...rest}>
    {children}
  </div>
);

/**
 * Stat Card Component - Specialized card for statistics
 */
export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = 'up', // 'up' or 'down'
  className = '',
}) => {
  const trendColors = {
    up: 'text-success-600',
    down: 'text-danger-600',
  };

  const trendIcons = {
    up: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  };

  return (
    <Card className={className} padding hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body-small text-text-tertiary">{title}</p>
          <div className="flex items-baseline mt-2">
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            {trend && (
              <div className={`flex items-center ml-3 ${trendColors[trendDirection]}`}>
                {trendIcons[trendDirection]}
                <span className="ml-1 text-sm font-medium">{trend}</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-body-xsmall text-text-tertiary mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-brand-50 rounded-lg">
            <div className="text-brand-600">{icon}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;