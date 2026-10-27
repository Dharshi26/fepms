import React, { useEffect } from 'react';

/**
 * FEPMS Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether modal is open
 * @param {Function} props.onClose - Close modal handler
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.title - Modal title
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} props.size - Modal size
 * @param {boolean} props.closeOnOverlayClick - Close modal when clicking overlay
 * @param {boolean} props.showCloseButton - Show close button
 * @param {Function} props.onConfirm - Confirm button handler
 * @param {Function} props.onCancel - Cancel button handler
 * @param {string} props.confirmText - Confirm button text
 * @param {string} props.cancelText - Cancel button text
 * @param {'primary' | 'danger' | 'success'} props.confirmVariant - Confirm button variant
 * @param {boolean} props.confirmLoading - Show loading on confirm button
 * @param {boolean} props.hideFooter - Hide footer entirely
 * @param {React.ReactNode} props.footer - Custom footer content
 * @param {string} props.className - Additional CSS classes
 */
const Modal = ({
  open = false,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  confirmLoading = false,
  hideFooter = false,
  footer,
  className = '',
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Confirm button variant classes
  const confirmButtonClasses = {
    primary: 'btn-primary',
    danger: 'btn-danger',
    success: 'btn-success',
  };

  // Don't render if not open
  if (!open) return null;

  return (
    <div className="modal-container">
      {/* Overlay */}
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        className={`modal-content ${sizeClasses[size]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="modal-header flex items-center justify-between">
            {title && (
              <h2
                id="modal-title"
                className="text-heading-3 text-text-primary"
              >
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm p-1 -mr-2"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className="modal-body">
          {children}
        </div>
        
        {/* Footer */}
        {!hideFooter && (footer || onConfirm || onCancel) && (
          <div className="modal-footer">
            {footer ? (
              footer
            ) : (
              <>
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="btn btn-outline"
                    disabled={confirmLoading}
                  >
                    {cancelText}
                  </button>
                )}
                
                {onConfirm && (
                  <button
                    onClick={onConfirm}
                    className={`btn ${confirmButtonClasses[confirmVariant]}`}
                    disabled={confirmLoading}
                  >
                    {confirmLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Confirmation Dialog Component
 */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  confirmLoading = false,
}) => {
  const variantIcons = {
    primary: (
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 mb-4">
        <svg className="h-6 w-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.806-.833-2.572 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
        </svg>
      </div>
    ),
    danger: (
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-danger-100 mb-4">
        <svg className="h-6 w-6 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.806-.833-2.572 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
        </svg>
      </div>
    ),
    success: (
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
        <svg className="h-6 w-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      hideFooter={false}
      onConfirm={onConfirm}
      onCancel={onClose}
      confirmText={confirmText}
      cancelText={cancelText}
      confirmVariant={variant}
      confirmLoading={confirmLoading}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center">
        {variantIcons[variant]}
        <h3 className="text-heading-3 text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-body text-text-secondary">
          {message}
        </p>
      </div>
    </Modal>
  );
};

/**
 * Loading Modal Component
 */
export const LoadingModal = ({
  open,
  title = 'Loading',
  message = 'Please wait while we process your request.',
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      size="sm"
      hideFooter={true}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mb-4"></div>
        <h3 className="text-heading-3 text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-body text-text-secondary">
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default Modal;