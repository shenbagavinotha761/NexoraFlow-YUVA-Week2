import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Toast = () => {
  const { toast, hideToast } = useBooking();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon error" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className={`toast-container ${toast.type}`} role="alert" aria-live="assertive">
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button 
        type="button"
        className="toast-close-btn" 
        onClick={hideToast}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
