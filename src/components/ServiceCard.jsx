import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const ServiceCard = ({ service }) => {
  const { setSelectedServiceForBooking } = useBooking();

  return (
    <article className="service-card">
      <div className="service-card-header">
        <span className="service-category-tag">{service.category}</span>
        {service.badge && (
          <span className="service-badge-pill">{service.badge}</span>
        )}
      </div>

      <h3 className="service-card-title">
        <Link to={`/services/${service.id}`} className="service-title-hover-link">
          {service.name}
        </Link>
      </h3>

      <div className="service-rating-row">
        <div className="rating-pill">
          <Star size={14} className="star-icon fill-amber" />
          <span className="rating-num">{service.rating}</span>
        </div>
        <span className="review-count">({service.reviewCount} reviews)</span>
      </div>

      <p className="service-card-desc">{service.shortDescription}</p>

      {/* Provider snippet */}
      <div className="service-provider-strip">
        <span className="provider-label">Provider:</span>
        <span className="provider-name">{service.provider.name}</span>
        {service.provider.verified && (
          <CheckCircle2 size={14} className="verified-icon" title="Background Verified Pro" />
        )}
      </div>

      <div className="service-card-footer">
        <div className="service-meta-left">
          <div className="service-price">
            <span className="currency">$</span>
            <span className="amount">{service.price}</span>
            <span className="unit">/ visit</span>
          </div>
          <div className="service-duration">
            <Clock size={13} />
            <span>{service.duration}</span>
          </div>
        </div>

        <div className="service-actions">
          <Link
            to={`/services/${service.id}`}
            className="btn btn-outline btn-xs"
            aria-label={`View full details for ${service.name}`}
          >
            Details
          </Link>
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => setSelectedServiceForBooking(service)}
            aria-label={`Book ${service.name} now`}
          >
            <span>Book</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
