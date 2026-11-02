import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal 
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SERVICE_CATEGORIES } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';

export const ServicesPage = () => {
  const { services } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected category derived directly from URL query param
  const selectedCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('recommended');
  const [priceTier, setPriceTier] = useState('all');

  // Handle category change
  const handleCategoryChange = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    setSearchParams(nextParams);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('recommended');
    setPriceTier('all');
    setSearchParams({});
  };

  // Filtered & sorted services list
  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        // Category filter
        if (selectedCategory !== 'All' && service.category !== selectedCategory) {
          return false;
        }

        // Search query filter (matches name, description, category, provider)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = service.name.toLowerCase().includes(query);
          const matchDesc = service.shortDescription.toLowerCase().includes(query) || 
                            service.fullDescription.toLowerCase().includes(query);
          const matchCategory = service.category.toLowerCase().includes(query);
          const matchProvider = service.provider.name.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCategory && !matchProvider) {
            return false;
          }
        }

        // Price tier filter
        if (priceTier === 'under-80') {
          return service.price < 80;
        } else if (priceTier === '80-130') {
          return service.price >= 80 && service.price <= 130;
        } else if (priceTier === 'above-130') {
          return service.price > 130;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Recommended default order
        return 0;
      });
  }, [services, selectedCategory, searchQuery, sortBy, priceTier]);

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || priceTier !== 'all' || sortBy !== 'recommended';

  return (
    <div className="services-page">
      {/* Header Banner */}
      <section className="services-header-banner">
        <div className="page-container">
          <div className="services-header-content">
            <span className="section-eyebrow">On-Demand Directory</span>
            <h1 className="services-main-title">Professional Service Catalog</h1>
            <p className="services-main-subtitle">
              Browse vetted professionals across maintenance, repairs, electrical, plumbing, and tech solutions. Select any service to inspect detailed inclusions or reserve your appointment immediately.
            </p>
          </div>

          {/* Search Bar */}
          <div className="services-search-container">
            <div className="search-input-group">
              <Search size={20} className="search-field-icon" />
              <input
                type="text"
                className="services-search-input"
                placeholder="Search by service name, provider, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search services catalog"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Area */}
      <div className="page-container services-body-container">
        {/* Category Pills Bar */}
        <div className="categories-filter-bar" role="tablist" aria-label="Service Categories">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="filters-control-bar">
          <div className="results-counter">
            <span className="count-number">{filteredServices.length}</span>
            <span className="count-label">
              {filteredServices.length === 1 ? 'service available' : 'services available'}
            </span>
            {hasActiveFilters && (
              <span className="filter-active-indicator">• Filtered</span>
            )}
          </div>

          <div className="filter-dropdowns-group">
            {/* Price Tier Filter */}
            <div className="filter-select-wrapper">
              <span className="select-label">Price:</span>
              <select
                className="filter-select"
                value={priceTier}
                onChange={(e) => setPriceTier(e.target.value)}
                aria-label="Filter by price tier"
              >
                <option value="all">All Prices</option>
                <option value="under-80">Under $80</option>
                <option value="80-130">$80 - $130</option>
                <option value="above-130">$130 and above</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="filter-select-wrapper">
              <span className="select-label">Sort:</span>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort services"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                type="button"
                className="btn btn-ghost-sm reset-filter-btn"
                onClick={handleResetFilters}
                title="Reset all search queries and filters"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="services-cards-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="empty-results-box" role="status">
            <div className="empty-icon-wrapper">
              <SlidersHorizontal size={40} className="empty-icon" />
            </div>
            <h3 className="empty-title">No Matching Services Found</h3>
            <p className="empty-description">
              We couldn't find any service matching "<strong>{searchQuery}</strong>" in the selected filters.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetFilters}
            >
              <RotateCcw size={16} />
              <span>Clear Filters &amp; View All Services</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
