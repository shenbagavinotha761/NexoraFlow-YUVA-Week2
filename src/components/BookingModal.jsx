import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  AlertCircle, 
  Check, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const TIME_SLOTS = [
  { id: 'slot-1', label: '09:00 AM - 11:00 AM', period: 'Morning' },
  { id: 'slot-2', label: '11:30 AM - 01:30 PM', period: 'Midday' },
  { id: 'slot-3', label: '02:00 PM - 04:00 PM', period: 'Afternoon' },
  { id: 'slot-4', label: '04:30 PM - 06:30 PM', period: 'Late Afternoon' },
];

const TODAY_DATE_STR = new Date().toISOString().split('T')[0];

// Inner form component initialized with fresh state on every open
const BookingModalForm = ({ service, userProfile, onClose, onCreateBooking }) => {
  const todayStr = TODAY_DATE_STR;

  // Form fields state initialized directly
  const [formData, setFormData] = useState(() => ({
    customerName: userProfile?.name || '',
    customerEmail: userProfile?.email || '',
    customerPhone: userProfile?.phone || '',
    address: userProfile?.address || '',
    date: '',
    timeSlot: '09:00 AM - 11:00 AM',
    notes: '',
    preferredProvider: service.provider?.name || 'Assigned Certified Specialist'
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  // Pricing calculations
  const basePrice = Number(service.price || 0);
  const platformFee = 5.0;
  const tax = Number((basePrice * 0.08).toFixed(2));
  const totalPrice = Number((basePrice + platformFee + tax).toFixed(2));

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Select slot
  const handleSlotSelect = (slotLabel) => {
    setFormData((prev) => ({ ...prev, timeSlot: slotLabel }));
    if (errors.timeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: null }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email address is required.';
    } else if (!emailRegex.test(formData.customerEmail.trim())) {
      newErrors.customerEmail = 'Please provide a valid email format (e.g., name@example.com).';
    }

    const phoneRegex = /^[0-9+\s()-]{8,20}$/;
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Contact phone number is required.';
    } else if (!phoneRegex.test(formData.customerPhone.trim())) {
      newErrors.customerPhone = 'Please provide a valid contact phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Service location address is required for dispatch.';
    } else if (formData.address.trim().length < 8) {
      newErrors.address = 'Please provide full street and apartment/house details.';
    }

    if (!formData.date) {
      newErrors.date = 'Please pick a booking appointment date.';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Booking date cannot be in the past.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred arrival time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onCreateBooking({
        serviceId: service.id,
        serviceName: service.name,
        category: service.category,
        price: basePrice,
        date: formData.date,
        timeSlot: formData.timeSlot,
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        address: formData.address.trim(),
        provider: formData.preferredProvider || service.provider.name,
        notes: formData.notes.trim()
      });

      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={() => !isSubmitting && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className="modal-container modal-booking" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 id="booking-modal-title" className="modal-title">Schedule Service Booking</h2>
            <p className="modal-subtitle">Reserve a vetted specialist in a few simple steps</p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            aria-label="Cancel and close booking form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selected Service Quick Banner */}
        <div className="booking-service-banner">
          <div className="booking-service-info">
            <span className="service-category-tag">{service.category}</span>
            <h3 className="service-title-sm">{service.name}</h3>
            <p className="provider-sub">
              Assigned Pro: <strong>{service.provider?.name}</strong> • Est. Duration: <strong>{service.duration}</strong>
            </p>
          </div>
          <div className="booking-service-price">
            <span className="price-tag">${basePrice}</span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="modal-body booking-modal-body">
            
            {/* Section 1: Contact & Address */}
            <div className="form-section">
              <h4 className="form-section-title">
                <User size={16} />
                <span>Customer &amp; Location Details</span>
              </h4>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="customerName" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={16} className="field-icon" />
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      className={`form-input ${errors.customerName ? 'input-error' : ''}`}
                      placeholder="e.g. Venkatesh A."
                      value={formData.customerName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.customerName && (
                    <div className="field-error-msg">
                      <AlertCircle size={13} />
                      <span>{errors.customerName}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="customerEmail" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      className={`form-input ${errors.customerEmail ? 'input-error' : ''}`}
                      placeholder="e.g. venkatesh@example.com"
                      value={formData.customerEmail}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.customerEmail && (
                    <div className="field-error-msg">
                      <AlertCircle size={13} />
                      <span>{errors.customerEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="customerPhone" className="form-label">
                    Phone Number <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={16} className="field-icon" />
                    <input
                      type="tel"
                      id="customerPhone"
                      name="customerPhone"
                      className={`form-input ${errors.customerPhone ? 'input-error' : ''}`}
                      placeholder="e.g. +91 98401 23456"
                      value={formData.customerPhone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.customerPhone && (
                    <div className="field-error-msg">
                      <AlertCircle size={13} />
                      <span>{errors.customerPhone}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Service Street Address <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <MapPin size={16} className="field-icon" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                      placeholder="Apartment, Street, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && (
                    <div className="field-error-msg">
                      <AlertCircle size={13} />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Appointment Date & Time */}
            <div className="form-section">
              <h4 className="form-section-title">
                <Calendar size={16} />
                <span>Appointment Schedule</span>
              </h4>

              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Preferred Date <span className="req">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={todayStr}
                  className={`form-input ${errors.date ? 'input-error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <div className="field-error-msg">
                    <AlertCircle size={13} />
                    <span>{errors.date}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Arrival Time Slot <span className="req">*</span>
                </label>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = formData.timeSlot === slot.label;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        className={`slot-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSlotSelect(slot.label)}
                      >
                        <span className="slot-period">{slot.period}</span>
                        <span className="slot-time">{slot.label}</span>
                        {isSelected && <Check size={14} className="slot-check" />}
                      </button>
                    );
                  })}
                </div>
                {errors.timeSlot && (
                  <div className="field-error-msg">
                    <AlertCircle size={13} />
                    <span>{errors.timeSlot}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Notes & Instructions */}
            <div className="form-section">
              <h4 className="form-section-title">
                <FileText size={16} />
                <span>Additional Notes (Optional)</span>
              </h4>
              <textarea
                name="notes"
                id="notes"
                rows="2"
                className="form-textarea"
                placeholder="Gate code, parking instructions, or specific items to focus on..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Section 4: Price Breakdown */}
            <div className="price-breakdown-card">
              <h5 className="breakdown-title">Estimated Cost Breakdown</h5>
              <div className="breakdown-row">
                <span>Base Service Fee ({service.name})</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Platform Dispatch &amp; Safety Surcharge</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Taxes &amp; Regulatory Fees (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="breakdown-divider" />
              <div className="breakdown-row total-row">
                <span>Total Amount</span>
                <span className="total-price">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="safety-note">
                <ShieldCheck size={14} className="shield-icon" />
                <span>Zero pre-payment required. Pay securely after service completion.</span>
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spin-icon" />
                  <span>Processing Booking...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Confirm Booking (${totalPrice.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const BookingModal = () => {
  const { 
    selectedServiceForBooking, 
    setSelectedServiceForBooking, 
    userProfile, 
    createBooking 
  } = useBooking();

  const service = selectedServiceForBooking;

  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [service]);

  if (!service) return null;

  return (
    <BookingModalForm
      key={service.id}
      service={service}
      userProfile={userProfile}
      onClose={() => setSelectedServiceForBooking(null)}
      onCreateBooking={createBooking}
    />
  );
};

export default BookingModal;
