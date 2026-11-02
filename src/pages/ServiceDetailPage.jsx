import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Check, 
  Loader2, 
  ChevronRight, 
  ArrowLeft,
  Award,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const TODAY_DATE_STR = new Date().toISOString().split('T')[0];

const TIME_SLOTS = [
  { id: 'slot-1', label: '09:00 AM - 11:00 AM', period: 'Morning' },
  { id: 'slot-2', label: '11:30 AM - 01:30 PM', period: 'Midday' },
  { id: 'slot-3', label: '02:00 PM - 04:00 PM', period: 'Afternoon' },
  { id: 'slot-4', label: '04:30 PM - 06:30 PM', period: 'Late Afternoon' },
  { id: 'slot-5', label: '07:00 PM - 09:00 PM', period: 'Evening' }
];

export const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services, userProfile, createBooking } = useBooking();

  // Find target service
  const service = services.find((s) => s.id === serviceId);

  // Form state
  const [formData, setFormData] = useState(() => ({
    customerName: userProfile?.name || '',
    customerEmail: userProfile?.email || '',
    customerPhone: userProfile?.phone || '',
    address: userProfile?.address || '',
    date: '',
    timeSlot: '09:00 AM - 11:00 AM',
    notes: '',
    preferredProvider: service ? (service.provider?.name || 'Assigned Certified Specialist') : ''
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If service does not exist in catalog
  if (!service) {
    return (
      <div className="page-container section-padding text-center">
        <div className="not-found-card">
          <AlertCircle size={48} className="text-amber not-found-icon" />
          <h2 className="section-title">Service Not Found</h2>
          <p className="section-subtitle">
            The service reference "<strong>{serviceId}</strong>" does not exist in our catalog or may have been updated.
          </p>
          <div className="mt-6">
            <Link to="/services" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Back to Services Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cost calculations
  const basePrice = Number(service.price || 0);
  const platformFee = 5.0;
  const tax = Number((basePrice * 0.08).toFixed(2));
  const totalPrice = Number((basePrice + platformFee + tax).toFixed(2));

  // Form change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSlotSelect = (slotLabel) => {
    setFormData((prev) => ({ ...prev, timeSlot: slotLabel }));
    if (errors.timeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: null }));
    }
  };

  // Validation
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
    } else if (formData.date < TODAY_DATE_STR) {
      newErrors.date = 'Booking date cannot be in the past.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred arrival time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Booking Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      createBooking({
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
      // Navigate to Dashboard so user sees the newly booked item
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="service-detail-page">
      {/* Breadcrumb Navigation */}
      <section className="detail-breadcrumb-bar">
        <div className="page-container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <Link to="/services" className="breadcrumb-link">Services Catalog</Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{service.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero Header Strip */}
      <section className="detail-hero-strip">
        <div className="page-container">
          <div className="detail-hero-content">
            <div className="detail-tag-row">
              <span className="service-category-tag">{service.category}</span>
              {service.badge && <span className="service-badge-pill">{service.badge}</span>}
              <span className="verified-shield-pill">
                <ShieldCheck size={14} />
                <span>Verified Pro Guarantee</span>
              </span>
            </div>

            <h1 className="detail-page-title">{service.name}</h1>

            <div className="detail-page-meta-row">
              <div className="rating-pill">
                <Star size={16} className="star-icon fill-amber" />
                <span className="rating-num">{service.rating}</span>
              </div>
              <span className="review-count">({service.reviewCount} customer ratings)</span>
              <span className="meta-separator">•</span>
              <div className="service-duration">
                <Clock size={16} />
                <span>{service.duration}</span>
              </div>
              <span className="meta-separator">•</span>
              <div className="provider-snippet">
                <span>By <strong>{service.provider.name}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Body */}
      <div className="page-container section-padding">
        <div className="detail-page-grid">
          
          {/* Left Column: Full Service Details */}
          <div className="detail-main-column">
            
            {/* Overview */}
            <section className="detail-card-section">
              <h2 className="section-title-sm">Service Overview</h2>
              <p className="detail-lead-paragraph">{service.fullDescription}</p>
              <p className="detail-sub-paragraph">{service.shortDescription}</p>
            </section>

            {/* Provider Spotlight */}
            <section className="detail-card-section">
              <h2 className="section-title-sm">Assigned Specialist Company</h2>
              <div className="modal-provider-box">
                <div className="provider-avatar-box">
                  <Award className="provider-icon" size={28} />
                </div>
                <div className="provider-info-box">
                  <div className="provider-title-row">
                    <span className="provider-box-name">{service.provider.name}</span>
                    {service.provider.verified && (
                      <span className="verified-badge">
                        <CheckCircle2 size={13} />
                        Identity &amp; Police Background Verified
                      </span>
                    )}
                  </div>
                  <div className="provider-metrics-row">
                    <span>{service.provider.experience} field experience</span>
                    <span>•</span>
                    <span>{service.provider.completedJobs}+ verified jobs</span>
                    <span>•</span>
                    <span>{service.provider.rating}★ customer satisfaction</span>
                  </div>
                </div>
              </div>
            </section>

            {/* What's Included */}
            {service.features && service.features.length > 0 && (
              <section className="detail-card-section">
                <h2 className="section-title-sm">What Is Included In Every Visit</h2>
                <div className="inclusions-grid">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="inclusion-item">
                      <div className="inclusion-icon-box">
                        <CheckCircle2 size={18} className="text-emerald" />
                      </div>
                      <span className="inclusion-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="detail-card-section">
                <h2 className="section-title-sm">Frequently Asked Questions</h2>
                <div className="faqs-list">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="faq-box">
                      <p className="faq-question">
                        <HelpCircle size={16} className="faq-icon" />
                        <span>{faq.q}</span>
                      </p>
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Platform Guarantee */}
            <div className="guarantee-banner">
              <ShieldCheck size={24} className="guarantee-icon" />
              <div>
                <h3 className="guarantee-title">NexoraFlow 100% Satisfaction Protection</h3>
                <p className="guarantee-desc">
                  Every booking is protected by upfront fixed pricing, certified workmanship, and a complimentary 7-day touch-up if any item is not completed to your full satisfaction.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <aside className="detail-sidebar-column">
            <div className="booking-sticky-card">
              <div className="sidebar-card-header">
                <div>
                  <span className="sidebar-card-eyebrow">Instant Reservation</span>
                  <h3 className="sidebar-card-title">Book This Service</h3>
                </div>
                <div className="sidebar-price-pill">
                  <span className="sidebar-currency">$</span>
                  <span className="sidebar-price">{basePrice}</span>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="sidebar-booking-form" noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="detail-customerName" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={16} className="field-icon" />
                    <input
                      type="text"
                      id="detail-customerName"
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

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="detail-customerEmail" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      type="email"
                      id="detail-customerEmail"
                      name="customerEmail"
                      className={`form-input ${errors.customerEmail ? 'input-error' : ''}`}
                      placeholder="name@example.com"
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

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="detail-customerPhone" className="form-label">
                    Phone Number <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={16} className="field-icon" />
                    <input
                      type="tel"
                      id="detail-customerPhone"
                      name="customerPhone"
                      className={`form-input ${errors.customerPhone ? 'input-error' : ''}`}
                      placeholder="+91 98401 23456"
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

                {/* Service Address */}
                <div className="form-group">
                  <label htmlFor="detail-address" className="form-label">
                    Service Street Address <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <MapPin size={16} className="field-icon" />
                    <input
                      type="text"
                      id="detail-address"
                      name="address"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                      placeholder="Flat, Building, Street, Area"
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

                {/* Appointment Date */}
                <div className="form-group">
                  <label htmlFor="detail-date" className="form-label">
                    Appointment Date <span className="req">*</span>
                  </label>
                  <input
                    type="date"
                    id="detail-date"
                    name="date"
                    min={TODAY_DATE_STR}
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

                {/* Arrival Slot */}
                <div className="form-group">
                  <label className="form-label">
                    Preferred Time Slot <span className="req">*</span>
                  </label>
                  <div className="time-slots-grid compact-slots">
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

                {/* Notes */}
                <div className="form-group">
                  <label htmlFor="detail-notes" className="form-label">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="detail-notes"
                    name="notes"
                    rows="2"
                    className="form-textarea"
                    placeholder="Gate code, landmark, or specific requests..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                {/* Live Price Calculation Box */}
                <div className="sidebar-price-breakdown">
                  <div className="breakdown-row">
                    <span>Base Service Fee</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Dispatch &amp; Safety Surcharge</span>
                    <span>${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Taxes &amp; Surcharges (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-divider" />
                  <div className="breakdown-row total-row">
                    <span className="total-label">Total Payable</span>
                    <span className="total-price">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spin-icon" />
                      <span>Securing Appointment...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Confirm &amp; Book Now (${totalPrice.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <p className="sidebar-security-footnote">
                  <ShieldCheck size={13} className="text-emerald" />
                  <span>No prepayment required. Pay after service completion.</span>
                </p>
              </form>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
