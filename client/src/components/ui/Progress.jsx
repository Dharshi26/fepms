import React from 'react';

/**
 * FEPMS Progress Bar Component
 * 
 * @param {Object} props
 * @param {number} props.value - Current progress value (0-100)
 * @param {'sm' | 'md' | 'lg'} props.size - Progress bar size
 * @param {'primary' | 'success' | 'warning' | 'danger' | 'neutral'} props.variant - Progress bar color variant
 * @param {boolean} props.showLabel - Show percentage label
 * @param {string} props.label - Custom label text
 * @param {'left' | 'right' | 'center' | 'inside'} props.labelPosition - Label position
 * @param {boolean} props.animate - Animate progress bar fill
 * @param {number} props.max - Maximum value (default: 100)
 * @param {string} props.className - Additional CSS classes
 */
const Progress = ({
  value = 0,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  labelPosition = 'right',
  animate = true,
  max = 100,
  className = '',
}) => {
  // Ensure value is within bounds
  const normalizedValue = Math.max(0, Math.min(value, max));
  const percentage = (normalizedValue / max) * 100;
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-brand-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    neutral: 'bg-neutral-500',
  };
  
  // Label text
  const labelText = label || `${Math.round(percentage)}%`;
  
  // Animation class
  const animationClass = animate ? 'transition-all duration-500 ease-out' : '';

  return (
    <div className={`w-full ${className}`}>
      {/* Label above or left */}
      {(showLabel && (labelPosition === 'left' || labelPosition === 'above')) && (
        <div className={`flex ${labelPosition === 'above' ? 'justify-between mb-1' : 'items-center gap-3'}`}>
          {labelPosition === 'above' && (
            <span className="text-sm text-text-secondary">{labelText}</span>
          )}
          {labelPosition === 'left' && (
            <span className="text-sm text-text-secondary min-w-[3rem]">{labelText}</span>
          )}
          {labelPosition === 'left' && (
            <div className="flex-1">
              <ProgressBar 
                value={value}
                size={size}
                variant={variant}
                animate={animate}
                max={max}
                showLabel={false}
                labelPosition={labelPosition}
              />
            </div>
          )}
        </div>
      )}
      
      {/* Progress bar */}
      {labelPosition !== 'left' && (
        <div className="relative">
          <ProgressBar 
            value={value}
            size={size}
            variant={variant}
            animate={animate}
            max={max}
            showLabel={showLabel && labelPosition === 'inside'}
            labelPosition={labelPosition}
            labelText={labelText}
          />
        </div>
      )}
      
      {/* Label below or right */}
      {(showLabel && (labelPosition === 'right' || labelPosition === 'below')) && (
        <div className={`flex ${labelPosition === 'below' ? 'justify-between mt-1' : 'items-center gap-3'}`}>
          {labelPosition === 'below' && (
            <span className="text-sm text-text-secondary">{labelText}</span>
          )}
          {labelPosition === 'right' && (
            <>
              <div className="flex-1">
                <ProgressBar 
                  value={value}
                  size={size}
                  variant={variant}
                  animate={animate}
                  max={max}
                  showLabel={false}
                />
              </div>
              <span className="text-sm text-text-secondary min-w-[3rem] text-right">{labelText}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Progress Bar inner component
 */
const ProgressBar = ({
  value,
  size,
  variant,
  animate,
  max,
  showLabel,
  labelPosition,
  labelText,
}) => {
  const normalizedValue = Math.max(0, Math.min(value, max));
  const percentage = (normalizedValue / max) * 100;
  
  const sizeClasses = {
    sm: 'h-1.5 rounded',
    md: 'h-2.5 rounded',
    lg: 'h-4 rounded-md',
  };
  
  const variantClasses = {
    primary: 'bg-brand-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    neutral: 'bg-neutral-500',
  };
  
  const animationClass = animate ? 'transition-all duration-500 ease-out' : '';

  return (
    <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div
        className={`${variantClasses[variant]} ${animationClass} ${sizeClasses[size]}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {showLabel && labelPosition === 'inside' && (
          <div className="flex items-center justify-center h-full">
            <span className="text-xs font-medium text-white px-2">
              {labelText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Circular Progress Component
 */
export const CircularProgress = ({
  value = 0,
  size = 'md',
  variant = 'primary',
  showLabel = true,
  label,
  animate = true,
  max = 100,
  strokeWidth = 3,
  className = '',
}) => {
  const normalizedValue = Math.max(0, Math.min(value, max));
  const percentage = (normalizedValue / max) * 100;
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };
  
  const strokeColors = {
    primary: 'stroke-brand-500',
    success: 'stroke-success-500',
    warning: 'stroke-warning-500',
    danger: 'stroke-danger-500',
    neutral: 'stroke-neutral-500',
  };
  
  const textColors = {
    primary: 'text-brand-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600',
    neutral: 'text-neutral-600',
  };
  
  const radius = {
    sm: 18,
    md: 24,
    lg: 30,
    xl: 36,
  }[size];
  
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const labelText = label || `${Math.round(percentage)}%`;

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-neutral-200"
        />
        
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className={`fill-none ${strokeColors[variant]} ${animate ? 'transition-all duration-500 ease-out' : ''}`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-semibold ${textColors[variant]}`}>
            {labelText}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Progress Steps Component
 */
export const ProgressSteps = ({
  steps = [],
  currentStep = 0,
  variant = 'primary',
  className = '',
}) => {
  const variantColors = {
    primary: {
      active: 'bg-brand-500 text-white',
      completed: 'bg-brand-100 text-brand-700 border-brand-300',
      pending: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    },
    success: {
      active: 'bg-success-500 text-white',
      completed: 'bg-success-100 text-success-700 border-success-300',
      pending: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    },
    warning: {
      active: 'bg-warning-500 text-white',
      completed: 'bg-warning-100 text-warning-700 border-warning-300',
      pending: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    },
    danger: {
      active: 'bg-danger-500 text-white',
      completed: 'bg-danger-100 text-danger-700 border-danger-300',
      pending: 'bg-neutral-100 text-neutral-500 border-neutral-300',
    },
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;
        
        const stepState = isActive ? 'active' : isCompleted ? 'completed' : 'pending';
        const stepColors = variantColors[variant][stepState];
        
        return (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                  ${stepColors}
                  ${isActive ? 'ring-2 ring-offset-2 ring-opacity-50' : ''}
                  ${variant === 'primary' && isActive ? 'ring-brand-500' : ''}
                  ${variant === 'success' && isActive ? 'ring-success-500' : ''}
                  ${variant === 'warning' && isActive ? 'ring-warning-500' : ''}
                  ${variant === 'danger' && isActive ? 'ring-danger-500' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              
              {/* Step label */}
              <span className="mt-2 text-xs font-medium text-text-secondary whitespace-nowrap">
                {step.label}
              </span>
              
              {/* Optional description */}
              {step.description && (
                <span className="mt-1 text-xs text-text-tertiary text-center max-w-[8rem]">
                  {step.description}
                </span>
              )}
            </div>
            
            {/* Connector line */}
            {!isLast && (
              <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-brand-500' : 'bg-neutral-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Progress;