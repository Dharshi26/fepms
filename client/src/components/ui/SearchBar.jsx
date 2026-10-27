import React, { useState } from 'react';

/**
 * FEPMS Search Bar Component
 * 
 * @param {Object} props
 * @param {string} props.placeholder - Search placeholder text
 * @param {Function} props.onSearch - Search handler function
 * @param {boolean} props.loading - Show loading indicator
 * @param {string} props.value - Controlled search value
 * @param {Function} props.onChange - Change handler for controlled input
 * @param {'sm' | 'md' | 'lg'} props.size - Search bar size
 * @param {string} props.className - Additional CSS classes
 */
const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  loading = false,
  value: controlledValue,
  onChange: controlledOnChange,
  size = 'md',
  className = '',
}) => {
  const [localValue, setLocalValue] = useState('');
  
  // Use controlled value if provided, otherwise use local state
  const value = controlledValue !== undefined ? controlledValue : localValue;
  const setValue = controlledOnChange || setLocalValue;
  
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };
  
  const handleClear = () => {
    setValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`
            form-input
            w-full
            ${sizeClasses[size]}
            pl-10
            pr-10
            border-border
            focus:ring-brand-500
            focus:border-transparent
          `}
          aria-label="Search"
        />
        
        {/* Search icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
          {loading ? (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;