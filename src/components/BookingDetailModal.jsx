import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldAlert, 
  CheckCircle,
  Ban,
  Receipt
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingDetailModal = () => {
  const { 
    activeBookingForView, 
    setActiveBookingForView, 
    cancelBooking, 
    markBookingCompleted 
  } = useBooking();

  const booking = activeBookingForView;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveBookingForView(null);
      }
    };
    if (booking) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [booking, setActiveBookingForView]);

  if (!booking) return null;

  const handleCancelClick = () => {
    if (window.confirm(`Are you sure you want to cancel booking ${booking.id}?`)) {
      cancelBooking(booking.id, 'User requested cancellation from dashboard');
      setActiveBookingForView(null);
    }
  };

  const handleCompleteClick = () => {
    markBookingCompleted(booking.id);
    setActiveBookingForView((prev) => prev ? { ...prev, status: 'Completed' } : null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="status-badge status-confirmed">Confirmed</span>;
      case 'Pending':
        return <span className="status-badge status-pending">Pending</span>;
      case 'Completed':
        return <span className="status-badge status-completed">Completed</span>;
      case 'Cancelled':
        return <span className="status-badge status-cancelled">Cancelled</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={() => setActiveBookingForView(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-detail-title"
    >
      <div 
        className="modal-container modal-md" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="booking-ref-label">Reference ID:</span>
            <span className="booking-ref-value">{booking.id}</span>
            {getStatusBadge(booking.status)}
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={() => setActiveBookingForView(null)}
            aria-label="Close booking details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <h2 id="booking-detail-title" className="modal-title">{booking.serviceName}</h2>
          <p className="service-category-tag inline-tag">{booking.category}</p>

          {/* Schedule & Provider Card */}
          <div className="detail-grid-box">
            <div className="detail-item">
              <span className="detail-label">
                <Calendar size={14} />
                <span>Appointment Date</span>
              </span>
              <span className="detail-val font-semibold">{booking.date}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">
                <Clock size={14} />
                <span>Arrival Window</span>
              </span>
              <span className="detail-val font-semibold">{booking.timeSlot}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">
                <User size={14} />
                <span>Service Provider</span>
              </span>
              <span className="detail-val">{booking.provider}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">
                <Receipt size={14} />
                <span>Total Amount</span>
              </span>
              <span className="detail-val price-green font-bold">
                ${Number(booking.totalPrice).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Customer & Location */}
          <div className="modal-section">
            <h4 className="section-subtitle">Customer &amp; Location Information</h4>
            <div className="detail-info-list">
              <div className="info-line">
                <User size={14} className="info-icon" />
                <span><strong>Name:</strong> {booking.customerName}</span>
              </div>
              <div className="info-line">
                <Mail size={14} className="info-icon" />
                <span><strong>Email:</strong> {booking.customerEmail}</span>
              </div>
              <div className="info-line">
                <Phone size={14} className="info-icon" />
                <span><strong>Contact:</strong> {booking.customerPhone}</span>
              </div>
              <div className="info-line">
                <MapPin size={14} className="info-icon" />
                <span><strong>Address:</strong> {booking.address}</span>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          {booking.notes && (
            <div className="modal-section">
              <h4 className="section-subtitle">Customer Instructions / Notes</h4>
              <p className="notes-box">{booking.notes}</p>
            </div>
          )}

          {/* Cancellation Notice if cancelled */}
          {booking.status === 'Cancelled' && (
            <div className="cancellation-alert-box">
              <ShieldAlert size={16} />
              <div>
                <p className="alert-title">Booking Cancelled</p>
                <p className="alert-desc">
                  {booking.cancellationReason || 'This booking was cancelled.'}
                </p>
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="price-breakdown-card mini">
            <div className="breakdown-row">
              <span>Service Fee</span>
              <span>${Number(booking.price).toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Platform Fee</span>
              <span>${Number(booking.platformFee || 5.0).toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Taxes</span>
              <span>${Number(booking.tax || (booking.price * 0.08)).toFixed(2)}</span>
            </div>
            <div className="breakdown-divider" />
            <div className="breakdown-row total-row">
              <span>Grand Total</span>
              <span className="total-price">${Number(booking.totalPrice).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => setActiveBookingForView(null)}
          >
            Close
          </button>

          {/* Quick status actions for demonstration */}
          {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
            <>
              <button 
                type="button" 
                className="btn btn-danger-outline"
                onClick={handleCancelClick}
              >
                <Ban size={15} />
                <span>Cancel Booking</span>
              </button>
              <button 
                type="button" 
                className="btn btn-success"
                onClick={handleCompleteClick}
              >
                <CheckCircle size={15} />
                <span>Mark Completed</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
