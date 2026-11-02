import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Star, 
  ChevronRight,
  Search
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { 
  SERVICE_CATEGORIES, 
  HOW_IT_WORKS_STEPS, 
  TRUST_BENEFITS, 
  DEMO_TESTIMONIALS 
} from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { services } = useBooking();
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // Handle Hero Quick Search
  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(heroSearchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  // Jump to Services page with Category filter
  const handleCategorySelect = (category) => {
    if (category === 'All') {
      navigate('/services');
    } else {
      navigate(`/services?category=${encodeURIComponent(category)}`);
    }
  };

  // Featured top 3 services
  const featuredServices = services.slice(0, 3);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" aria-label="NexoraFlow Hero Introduction">
        <div className="hero-ambient-glow" />
        <div className="page-container hero-container">
          
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} className="hero-sparkle" />
              <span>YUVA Internship Week 2 • On-Demand Service Platform</span>
            </div>

            <h1 className="hero-title">
              Effortless Service Booking, <br />
              <span className="text-gradient">Precision Management.</span>
            </h1>

            <p className="hero-description">
              NexoraFlow connects you with certified, background-verified specialists for deep cleaning, plumbing, electrical inspections, HVAC, and smart home technology. Experience upfront pricing, instant time-slot booking, and real-time dashboard tracking.
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleHeroSearch} className="hero-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search services (e.g., Deep Cleaning, AC Repair, Plumbing)..."
                value={heroSearchQuery}
                onChange={(e) => setHeroSearchQuery(e.target.value)}
                aria-label="Search available services"
              />
              <button type="submit" className="btn btn-primary hero-search-btn">
                <span>Find Services</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button 
                type="button" 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/services')}
              >
                <span>Get Started Now</span>
                <ArrowRight size={18} />
              </button>
              <button 
                type="button" 
                className="btn btn-outline btn-lg"
                onClick={() => navigate('/services')}
              >
                <span>Explore All Services</span>
              </button>
              <button 
                type="button" 
                className="btn btn-ghost btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                <span>View Dashboard</span>
              </button>
            </div>

            {/* Live Trust Metrics Strip */}
            <div className="hero-stats-strip">
              <div className="stat-item">
                <span className="stat-number">2,500+</span>
                <span className="stat-label">Certified Experts</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item">
                <span className="stat-number">4.9 / 5</span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item">
                <span className="stat-number">99.4%</span>
                <span className="stat-label">On-Time Arrival</span>
              </div>
              <div className="stat-separator" />
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Upfront Pricing</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Service Categories Section */}
      <section className="section-padding bg-surface-alt" aria-labelledby="categories-heading">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Explore Specializations</span>
            <h2 id="categories-heading" className="section-title">Browse Services by Category</h2>
            <p className="section-subtitle">
              Choose from our wide catalog of certified home improvement and technical services.
            </p>
          </div>

          <div className="categories-pill-grid">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                className="category-card-btn"
                onClick={() => handleCategorySelect(cat)}
              >
                <div className="category-pill-icon">
                  <Zap size={18} />
                </div>
                <span className="category-name">{cat}</span>
                <ChevronRight size={14} className="cat-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="section-padding" aria-labelledby="featured-heading">
        <div className="page-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">Handpicked For You</span>
              <h2 id="featured-heading" className="section-title">Popular Featured Services</h2>
              <p className="section-subtitle">
                High-demand services backed by certified pros and our 100% satisfaction guarantee.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/services')}
            >
              <span>View All 8 Services</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="services-cards-grid">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-surface-alt" aria-labelledby="how-it-works-heading">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Simple &amp; Transparent</span>
            <h2 id="how-it-works-heading" className="section-title">How NexoraFlow Works</h2>
            <p className="section-subtitle">
              Book, manage, and complete your service in four seamless steps.
            </p>
          </div>

          <div className="steps-grid">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number-badge">{stepItem.step}</div>
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-description">{stepItem.description}</p>
                {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="step-connector" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section */}
      <section className="section-padding" aria-labelledby="benefits-heading">
        <div className="page-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 id="benefits-heading" className="section-title">Built on Trust, Precision, and Reliability</h2>
            <p className="section-subtitle">
              Every appointment is protected by our standard of excellence and transparent operations.
            </p>
          </div>

          <div className="benefits-grid">
            {TRUST_BENEFITS.map((b, idx) => {
              const icons = [ShieldCheck, Clock, CreditCard, Sparkles];
              const IconComp = icons[idx % icons.length];
              return (
                <div key={idx} className="benefit-card">
                  <div className="benefit-icon-wrapper">
                    <IconComp size={24} className="benefit-icon" />
                  </div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-description">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Testimonials Section */}
      <section id="testimonials" className="section-padding bg-surface-alt" aria-labelledby="testimonials-heading">
        <div className="page-container">
          <div className="section-header text-center">
            <div className="sample-disclaimer-badge">
              <span>Notice: Sample Demonstration Testimonials</span>
            </div>
            <h2 id="testimonials-heading" className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Real feedback from homeowners and tech enthusiasts who trust NexoraFlow.
            </p>
          </div>

          <div className="testimonials-grid">
            {DEMO_TESTIMONIALS.map((item) => (
              <div key={item.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} className="star-icon fill-amber" />
                  ))}
                </div>
                <p className="testimonial-comment">"{item.comment}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar-circle">
                    {item.clientName.charAt(0)}
                  </div>
                  <div className="author-details">
                    <p className="author-name">{item.clientName}</p>
                    <p className="author-role">{item.role}</p>
                    <span className="author-service">Booked: {item.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta-banner-section" aria-label="Ready to book">
        <div className="page-container">
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Ready to Experience Seamless Home Services?</h2>
              <p className="cta-banner-desc">
                Book a background-verified professional today with fixed pricing and guaranteed satisfaction.
              </p>
            </div>
            <div className="cta-banner-actions">
              <button 
                type="button" 
                className="btn btn-white btn-lg"
                onClick={() => navigate('/services')}
              >
                <span>Schedule a Service</span>
                <ArrowRight size={18} />
              </button>
              <button 
                type="button" 
                className="btn btn-ghost-white btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                <span>Go to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
