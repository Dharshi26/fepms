import React from 'react';

/**
 * FEPMS Table Component
 * 
 * @param {Object} props
 * @param {Array} props.columns - Table column definitions
 * @param {Array} props.data - Table data
 * @param {Function} props.renderRow - Custom row render function
 * @param {boolean} props.loading - Show loading state
 * @param {boolean} props.striped - Add striped rows
 * @param {boolean} props.hover - Enable row hover effects
 * @param {boolean} props.compact - Compact table style
 * @param {string} props.emptyText - Text to show when no data
 * @param {React.ReactNode} props.emptyState - Custom empty state component
 * @param {Function} props.onRowClick - Row click handler
 * @param {string} props.className - Additional CSS classes
 */
const Table = ({
  columns = [],
  data = [],
  renderRow,
  loading = false,
  striped = true,
  hover = true,
  compact = false,
  emptyText = 'No data available',
  emptyState,
  onRowClick,
  className = '',
}) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className={`table-container ${className}`}>
        <table className="w-full">
          <thead className="table-header">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="table-cell-header">
                  <div className="skeleton h-4 w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="table-row">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="table-cell">
                    <div className="skeleton h-4 w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    if (emptyState) {
      return emptyState;
    }
    
    return (
      <div className={`table-container flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="text-neutral-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No Data Found</h3>
        <p className="text-text-tertiary max-w-md text-center">{emptyText}</p>
      </div>
    );
  }

  // Row hover classes
  const rowClasses = hover ? 'hover:bg-neutral-50 cursor-pointer transition-colors duration-150' : '';

  // Compact classes
  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';
  const headerPadding = compact ? 'px-3 py-2.5' : 'px-4 py-3';

  // Default row renderer
  const defaultRenderRow = (item, rowIndex) => (
    <tr
      key={rowIndex}
      className={`
        table-row
        ${striped && rowIndex % 2 === 0 ? 'bg-neutral-50' : ''}
        ${rowClasses}
      `}
      onClick={() => onRowClick && onRowClick(item, rowIndex)}
    >
      {columns.map((column, colIndex) => {
        const cellValue = column.accessor 
          ? (typeof column.accessor === 'function' 
            ? column.accessor(item) 
            : item[column.accessor])
          : null;
        
        return (
          <td
            key={colIndex}
            className={`
              ${cellPadding}
              text-sm text-text-secondary
              ${column.align === 'right' ? 'text-right' : ''}
              ${column.align === 'center' ? 'text-center' : ''}
              ${column.className || ''}
            `}
          >
            {column.render 
              ? column.render(cellValue, item, rowIndex)
              : cellValue
            }
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className={`table-container ${className}`}>
      <table className="w-full">
        <thead className="table-header">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`
                  ${headerPadding}
                  text-left text-xs font-medium text-text-tertiary uppercase tracking-wider
                  ${column.align === 'right' ? 'text-right' : ''}
                  ${column.align === 'center' ? 'text-center' : ''}
                  ${column.headerClassName || ''}
                `}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) =>
            renderRow
              ? renderRow(item, rowIndex)
              : defaultRenderRow(item, rowIndex)
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Table Action Bar Component
 */
export const TableActions = ({ 
  children, 
  selectedCount = 0,
  className = '',
}) => (
  <div className={`
    bg-neutral-50 border-b border-border px-4 py-3
    flex items-center justify-between
    ${className}
  `}>
    <div>
      {selectedCount > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary">
            {selectedCount} selected
          </span>
          <div className="h-4 w-px bg-border"></div>
        </div>
      )}
    </div>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

/**
 * Table Pagination Component
 */
export const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  className = '',
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div className={`
      border-t border-border px-4 py-3
      flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
      ${className}
    `}>
      <div className="text-sm text-text-tertiary">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      
      <div className="flex items-center gap-4">
        {/* Page size selector */}
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-text-tertiary">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="form-input py-1 px-2 text-sm"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn btn-ghost btn-sm px-2 py-1 disabled:opacity-50"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`
                  btn btn-ghost btn-sm min-w-[2rem]
                  ${currentPage === pageNum 
                    ? 'bg-brand-50 text-brand-700 hover:bg-brand-100' 
                    : ''
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn btn-ghost btn-sm px-2 py-1 disabled:opacity-50"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;