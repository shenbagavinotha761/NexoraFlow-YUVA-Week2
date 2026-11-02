import React, { useEffect } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  CalendarDays,
  Award
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const ServiceDetailModal = () => {
  const { 
    selectedServiceForDetail, 
    setSelectedServiceForDetail, 
    setSelectedServiceForBooking 
  } = useBooking();

  const service = selectedServiceForDetail;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedServiceForDetail(null);
      }
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [service, setSelectedServiceForDetail]);

  if (!service) return null;

  const handleProceedToBooking = () => {
    const targetService = service;
    setSelectedServiceForDetail(null);
    setSelectedServiceForBooking(targetService);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={() => setSelectedServiceForDetail(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
    >
      <div 
        className="modal-container modal-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-badges">
            <span className="service-category-tag">{service.category}</span>
            {service.badge && <span className="service-badge-pill">{service.badge}</span>}
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={() => setSelectedServiceForDetail(null)}
            aria-label="Close service details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="service-detail-title" className="modal-title">{service.name}</h2>

          <div className="modal-meta-bar">
            <div className="rating-pill">
              <Star size={15} className="star-icon fill-amber" />
              <span className="rating-num">{service.rating}</span>
            </div>
            <span className="review-count">Based on {service.reviewCount} customer reviews</span>
            <div className="meta-separator">•</div>
            <div className="service-duration">
              <Clock size={15} />
              <span>{service.duration}</span>
            </div>
            <div className="meta-separator">•</div>
            <div className="price-tag-highlight">
              ${service.price} <span className="subtext">all-inclusive</span>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-subtitle">Service Overview</h4>
            <p className="modal-description-text">{service.fullDescription}</p>
          </div>

          {/* Provider Card */}
          <div className="modal-provider-box">
            <div className="provider-avatar-box">
              <Award className="provider-icon" size={24} />
            </div>
            <div className="provider-info-box">
              <div className="provider-title-row">
                <span className="provider-box-name">{service.provider.name}</span>
                {service.provider.verified && (
                  <span className="verified-badge">
                    <CheckCircle2 size={13} />
                    Verified Provider
                  </span>
                )}
              </div>
              <div className="provider-metrics-row">
                <span>{service.provider.experience} in business</span>
                <span>•</span>
                <span>{service.provider.completedJobs}+ jobs completed</span>
                <span>•</span>
                <span>{service.provider.rating}★ pro rating</span>
              </div>
            </div>
          </div>

          {/* Features / Inclusions Checklist */}
          {service.features && service.features.length > 0 && (
            <div className="modal-section">
              <h4 className="section-subtitle">What's Included in This Service</h4>
              <ul className="modal-features-list">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <CheckCircle2 size={16} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="modal-section">
              <h4 className="section-subtitle">Frequently Asked Questions</h4>
              <div className="faqs-list">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-box">
                    <p className="faq-question">
                      <HelpCircle size={15} className="faq-icon" />
                      <span>{faq.q}</span>
                    </p>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NexoraFlow Assurance */}
          <div className="guarantee-banner">
            <ShieldCheck size={20} className="guarantee-icon" />
            <div>
              <p className="guarantee-title">NexoraFlow 100% Satisfaction Guarantee</p>
              <p className="guarantee-desc">
                If the service does not meet your expectations, we arrange a free touch-up within 7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => setSelectedServiceForDetail(null)}
          >
            Back to Catalog
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleProceedToBooking}
          >
            <CalendarDays size={16} />
            <span>Proceed to Booking (${service.price})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
