import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Eye, 
  Ban, 
  RotateCcw, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { 
    bookings, 
    userProfile, 
    bookingMetrics, 
    setActiveBookingForView, 
    cancelBooking,
    resetToDemoData 
  } = useBooking();

  const [activeTab, setActiveTab] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Tab filter
      if (activeTab !== 'All' && b.status !== activeTab) {
        return false;
      }

      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        const matchId = b.id.toLowerCase().includes(q);
        const matchName = b.serviceName.toLowerCase().includes(q);
        const matchProvider = b.provider.toLowerCase().includes(q);
        const matchCategory = b.category.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchProvider && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, activeTab, searchFilter]);

  const handleCancel = (booking) => {
    if (window.confirm(`Are you sure you want to cancel booking ${booking.id} (${booking.serviceName})?`)) {
      cancelBooking(booking.id, 'Cancelled by user from dashboard table');
    }
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
    <div className="dashboard-page">
      {/* Top Welcome & User Overview */}
      <section className="dashboard-header-section">
        <div className="page-container">
          <div className="dashboard-welcome-row">
            <div>
              <div className="dashboard-greeting-badge">
                <ShieldCheck size={14} className="text-accent" />
                <span>Verified Client Account</span>
              </div>
              <h1 className="dashboard-title">
                Welcome back, {userProfile.name.split(' ')[0]}! 👋
              </h1>
              <p className="dashboard-subtitle">
                Track your active appointments, inspect past service receipts, and reserve new vetted specialists.
              </p>
            </div>

            <div className="dashboard-header-actions">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={resetToDemoData}
                title="Reset sample demonstration bookings"
              >
                <RotateCcw size={15} />
                <span>Reset Demo Data</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/services')}
              >
                <Plus size={16} />
                <span>Book New Service</span>
              </button>
            </div>
          </div>

          {/* User Profile Summary Card */}
          <div className="user-profile-strip">
            <div className="profile-strip-avatar">
              {userProfile.avatarLetter}
            </div>
            <div className="profile-strip-meta">
              <h3 className="profile-strip-name">{userProfile.name}</h3>
              <div className="profile-strip-details">
                <span className="profile-meta-item">
                  <Mail size={13} />
                  <span>{userProfile.email}</span>
                </span>
                <span className="profile-meta-item">
                  <Phone size={13} />
                  <span>{userProfile.phone}</span>
                </span>
                <span className="profile-meta-item">
                  <MapPin size={13} />
                  <span>{userProfile.address}</span>
                </span>
              </div>
            </div>
            <div className="profile-strip-status">
              <span className="account-tier-badge">Premium Member</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div className="page-container dashboard-body-container">
        
        {/* 4 Summary Metric Cards */}
        <section className="metrics-grid" aria-label="Bookings Statistics Summary">
          {/* Card 1: Total Bookings */}
          <div className="metric-card metric-total" onClick={() => setActiveTab('All')}>
            <div className="metric-card-top">
              <span className="metric-card-title">Total Bookings</span>
              <div className="metric-icon-box bg-blue-glow">
                <CalendarDays size={20} className="text-blue" />
              </div>
            </div>
            <div className="metric-card-body">
              <span className="metric-number">{bookingMetrics.total}</span>
              <span className="metric-trend positive">
                <TrendingUp size={12} />
                <span>All records</span>
              </span>
            </div>
            <div className="metric-card-footer">
              Lifetime requests &amp; reservations
            </div>
          </div>

          {/* Card 2: Pending / In Progress */}
          <div className="metric-card metric-pending" onClick={() => setActiveTab('Pending')}>
            <div className="metric-card-top">
              <span className="metric-card-title">Pending / Dispatch</span>
              <div className="metric-icon-box bg-amber-glow">
                <Clock size={20} className="text-amber" />
              </div>
            </div>
            <div className="metric-card-body">
              <span className="metric-number">{bookingMetrics.pending}</span>
              <span className="metric-sublabel">Awaiting pro arrival</span>
            </div>
            <div className="metric-card-footer">
              Pro assignment in progress
            </div>
          </div>

          {/* Card 3: Completed */}
          <div className="metric-card metric-completed" onClick={() => setActiveTab('Completed')}>
            <div className="metric-card-top">
              <span className="metric-card-title">Completed Services</span>
              <div className="metric-icon-box bg-emerald-glow">
                <CheckCircle2 size={20} className="text-emerald" />
              </div>
            </div>
            <div className="metric-card-body">
              <span className="metric-number">{bookingMetrics.completed}</span>
              <span className="metric-trend positive">
                <span>Verified Satisfied</span>
              </span>
            </div>
            <div className="metric-card-footer">
              Quality guarantee honored
            </div>
          </div>

          {/* Card 4: Cancelled */}
          <div className="metric-card metric-cancelled" onClick={() => setActiveTab('Cancelled')}>
            <div className="metric-card-top">
              <span className="metric-card-title">Cancelled Bookings</span>
              <div className="metric-icon-box bg-rose-glow">
                <XCircle size={20} className="text-rose" />
              </div>
            </div>
            <div className="metric-card-body">
              <span className="metric-number">{bookingMetrics.cancelled}</span>
              <span className="metric-sublabel">No charges applied</span>
            </div>
            <div className="metric-card-footer">
              Zero penalty cancellations
            </div>
          </div>
        </section>

        {/* Bookings Section */}
        <section className="bookings-table-section">
          <div className="bookings-header-toolbar">
            <div className="toolbar-left">
              <h2 className="section-title-sm">Recent Service Bookings</h2>
              <span className="bookings-count-pill">{filteredBookings.length} shown</span>
            </div>

            {/* Search within bookings */}
            <div className="table-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="table-search-input"
                placeholder="Search by ID, service, or provider..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                aria-label="Filter bookings"
              />
              {searchFilter && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchFilter('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Status Tabs */}
          <div className="status-tabs-row" role="tablist" aria-label="Filter by booking status">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((tab) => {
              const count = tab === 'All' 
                ? bookings.length 
                : bookings.filter(b => b.status === tab).length;
              return (
                <button
                  type="button"
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`status-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span>{tab}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Bookings Display */}
          {filteredBookings.length > 0 ? (
            <div className="bookings-data-wrapper">
              
              {/* Desktop Table View */}
              <div className="desktop-table-container">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Service Name</th>
                      <th scope="col">Date &amp; Arrival Slot</th>
                      <th scope="col">Provider</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Status</th>
                      <th scope="col" className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="booking-table-row">
                        <td className="booking-id-cell">
                          <span className="code-id">{b.id}</span>
                        </td>
                        <td className="booking-service-cell">
                          <span className="service-title-link" onClick={() => setActiveBookingForView(b)}>
                            {b.serviceName}
                          </span>
                          <span className="category-subtext">{b.category}</span>
                        </td>
                        <td className="booking-schedule-cell">
                          <div className="schedule-date-text">
                            <Calendar size={13} />
                            <span>{b.date}</span>
                          </div>
                          <div className="schedule-time-text">
                            <Clock size={13} />
                            <span>{b.timeSlot}</span>
                          </div>
                        </td>
                        <td className="booking-provider-cell">
                          <span className="provider-name-text">{b.provider}</span>
                        </td>
                        <td className="booking-price-cell">
                          <span className="price-bold">${Number(b.totalPrice).toFixed(2)}</span>
                        </td>
                        <td className="booking-status-cell">
                          {getStatusBadge(b.status)}
                        </td>
                        <td className="booking-actions-cell text-right">
                          <div className="table-actions-group">
                            <button
                              type="button"
                              className="btn btn-outline btn-xs"
                              onClick={() => setActiveBookingForView(b)}
                              aria-label={`View details for ${b.id}`}
                              title="View full booking receipt & details"
                            >
                              <Eye size={13} />
                              <span>Details</span>
                            </button>
                            {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                              <button
                                type="button"
                                className="btn btn-ghost-danger btn-xs"
                                onClick={() => handleCancel(b)}
                                aria-label={`Cancel booking ${b.id}`}
                                title="Cancel this booking"
                              >
                                <Ban size={13} />
                                <span>Cancel</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Responsive Cards View */}
              <div className="mobile-cards-container">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="mobile-booking-card">
                    <div className="mobile-card-header">
                      <span className="code-id">{b.id}</span>
                      {getStatusBadge(b.status)}
                    </div>
                    
                    <h3 className="mobile-card-title">{b.serviceName}</h3>
                    <p className="category-subtext">{b.category}</p>

                    <div className="mobile-card-meta-grid">
                      <div className="mobile-meta-item">
                        <Calendar size={13} />
                        <span>{b.date}</span>
                      </div>
                      <div className="mobile-meta-item">
                        <Clock size={13} />
                        <span>{b.timeSlot}</span>
                      </div>
                      <div className="mobile-meta-item">
                        <User size={13} />
                        <span>{b.provider}</span>
                      </div>
                      <div className="mobile-meta-item price-highlight">
                        <span>${Number(b.totalPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mobile-card-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm flex-1"
                        onClick={() => setActiveBookingForView(b)}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                      {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                        <button
                          type="button"
                          className="btn btn-ghost-danger btn-sm"
                          onClick={() => handleCancel(b)}
                        >
                          <Ban size={14} />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="dashboard-empty-state" role="status">
              <div className="empty-state-illustration">
                <CalendarDays size={48} className="empty-icon-lg" />
              </div>
              <h3 className="empty-state-title">No Bookings Found</h3>
              <p className="empty-state-text">
                {searchFilter || activeTab !== 'All'
                  ? `There are no bookings matching your criteria in the "${activeTab}" filter.`
                  : 'You do not have any active or past service bookings recorded yet.'}
              </p>
              <div className="empty-state-actions">
                {searchFilter || activeTab !== 'All' ? (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setActiveTab('All');
                      setSearchFilter('');
                    }}
                  >
                    <RotateCcw size={15} />
                    <span>Clear Filter &amp; Show All</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate('/services')}
                  >
                    <Plus size={16} />
                    <span>Browse Services &amp; Book Now</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
