import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingConfirmationModal = () => {
  const { lastConfirmedBooking, setLastConfirmedBooking, showToast } = useBooking();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setLastConfirmedBooking(null);
  }, [setLastConfirmedBooking]);

  const handleGoToDashboard = () => {
    setLastConfirmedBooking(null);
    navigate('/dashboard');
  };

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (lastConfirmedBooking) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lastConfirmedBooking, handleClose]);

  if (!lastConfirmedBooking) return null;

  const booking = lastConfirmedBooking;

  const handleCopyId = () => {
    try {
      navigator.clipboard.writeText(booking.id);
      setCopied(true);
      showToast('Booking Reference ID copied to clipboard!', 'info');
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div 
        className="modal-container modal-confirmation" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn confirm-modal-close"
          onClick={handleClose}
          aria-label="Close confirmation dialog"
        >
          <X size={20} />
        </button>
        <div className="confirmation-header-graphic">
          <div className="confetti-ring">
            <CheckCircle2 size={48} className="confirm-check-icon" />
          </div>
          <span className="confirmation-badge">
            <Sparkles size={14} />
            Reservation Confirmed
          </span>
          <h2 id="confirm-modal-title" className="confirm-title">
            Your Service Has Been Booked!
          </h2>
          <p className="confirm-subtitle">
            A certified specialist has been notified and scheduled for your appointment.
          </p>
        </div>

        {/* Reference ID Pill */}
        <div className="reference-pill-box">
          <div className="reference-content">
            <span className="ref-label">Booking Reference:</span>
            <span className="ref-code">{booking.id}</span>
          </div>
          <button 
            type="button" 
            className="copy-btn" 
            onClick={handleCopyId}
            aria-label="Copy booking reference ID"
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Booking Summary Card */}
        <div className="confirm-summary-box">
          <div className="summary-item">
            <span className="summary-label">Service</span>
            <span className="summary-value font-semibold">{booking.serviceName}</span>
          </div>

          <div className="summary-row-grid">
            <div className="summary-item">
              <span className="summary-label">
                <Calendar size={13} />
                <span>Date</span>
              </span>
              <span className="summary-value">{booking.date}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">
                <Clock size={13} />
                <span>Arrival Window</span>
              </span>
              <span className="summary-value">{booking.timeSlot}</span>
            </div>
          </div>

          <div className="summary-row-grid">
            <div className="summary-item">
              <span className="summary-label">
                <UserCheck size={13} />
                <span>Assigned Specialist</span>
              </span>
              <span className="summary-value">{booking.provider}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Payable</span>
              <span className="summary-value price-green">${Number(booking.totalPrice).toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-item">
            <span className="summary-label">
              <MapPin size={13} />
              <span>Service Location</span>
            </span>
            <span className="summary-value text-muted">{booking.address}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="confirmation-actions">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={handleClose}
          >
            Close
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleGoToDashboard}
          >
            <span>View on Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
