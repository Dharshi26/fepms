import React, { forwardRef, useState } from 'react';

/**
 * FEPMS Input Component
 */
const Input = forwardRef(({
  label,
  error,
  hint,
  required = false,
  disabled = false,
  readOnly = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  hintClassName = '',
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  type = 'text',
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;
  
  // Base input classes
  const baseClasses = 'form-input w-full px-3 py-2 text-sm transition-all duration-150';
  
  // State classes
  const stateClasses = error 
    ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' 
    : 'border-border focus:ring-brand-500 focus:border-transparent';
  
  // Disabled/readonly classes
  const disabledClasses = disabled || readOnly ? 'bg-neutral-50 cursor-not-allowed opacity-75' : 'bg-white';
  
  // Combined classes
  const inputClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;
  
  // Password toggle button
  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 rounded"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      tabIndex={-1}
    >
      {showPassword ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      )}
    </button>
  );

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className={`form-label ${labelClassName}`}>
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          readOnly={readOnly}
          className={`
            ${inputClasses}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || showPasswordToggle ? 'pr-10' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${rest.id}-error` : hint ? `${rest.id}-hint` : undefined}
          {...rest}
        />
        
        {rightIcon && !showPasswordToggle && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
            {rightIcon}
          </div>
        )}
        
        {showPasswordToggle && type === 'password' && <PasswordToggle />}
      </div>
      
      {hint && !error && (
        <p className={`form-hint ${hintClassName}`} id={`${rest.id}-hint`}>
          {hint}
        </p>
      )}
      
      {error && (
        <p className={`form-error ${errorClassName}`} id={`${rest.id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export const Textarea = forwardRef(({
  label,
  error,
  hint,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 3,
  className = '',
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  hintClassName = '',
  ...rest
}, ref) => {
  // Base classes
  const baseClasses = 'form-input w-full px-3 py-2 text-sm transition-all duration-150 resize-none';
  
  // State classes
  const stateClasses = error 
    ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' 
    : 'border-border focus:ring-brand-500 focus:border-transparent';
  
  // Disabled/readonly classes
  const disabledClasses = disabled || readOnly ? 'bg-neutral-50 cursor-not-allowed opacity-75' : 'bg-white';
  
  // Combined classes
  const textareaClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className={`form-label ${labelClassName}`}>
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${rest.id}-error` : hint ? `${rest.id}-hint` : undefined}
        {...rest}
      />
      
      {hint && !error && (
        <p className={`form-hint ${hintClassName}`} id={`${rest.id}-hint`}>
          {hint}
        </p>
      )}
      
      {error && (
        <p className={`form-error ${errorClassName}`} id={`${rest.id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select Component
 */
export const Select = forwardRef(({
  label,
  error,
  hint,
  required = false,
  disabled = false,
  options = [],
  placeholder = 'Select an option',
  className = '',
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  hintClassName = '',
  ...rest
}, ref) => {
  // Base classes
  const baseClasses = 'form-input w-full px-3 py-2 text-sm transition-all duration-150 appearance-none';
  
  // State classes
  const stateClasses = error 
    ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' 
    : 'border-border focus:ring-brand-500 focus:border-transparent';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-neutral-50 cursor-not-allowed opacity-75' : 'bg-white';
  
  // Combined classes
  const selectClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className={`form-label ${labelClassName}`}>
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${rest.id}-error` : hint ? `${rest.id}-hint` : undefined}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {hint && !error && (
        <p className={`form-hint ${hintClassName}`} id={`${rest.id}-hint`}>
          {hint}
        </p>
      )}
      
      {error && (
        <p className={`form-error ${errorClassName}`} id={`${rest.id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

/**
 * Form Group Component
 */
export const FormGroup = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

/**
 * Form Label Component
 */
export const FormLabel = ({ children, htmlFor, required = false, className = '' }) => (
  <label htmlFor={htmlFor} className={`form-label ${className}`}>
    {children}
    {required && <span className="text-danger-500 ml-1">*</span>}
  </label>
);

/**
 * Form Error Component
 */
export const FormError = ({ children, className = '' }) => (
  <p className={`form-error ${className}`} role="alert">
    {children}
  </p>
);

/**
 * Form Hint Component
 */
export const FormHint = ({ children, className = '' }) => (
  <p className={`form-hint ${className}`}>
    {children}
  </p>
);

export default Input;