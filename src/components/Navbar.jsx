import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  LayoutDashboard, 
  CalendarDays, 
  Menu, 
  X, 
  ChevronDown,
  Layers
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { userProfile, bookingMetrics } = useBooking();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <Zap className="brand-icon" size={22} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Nexora<span className="brand-highlight">Flow</span></span>
            <span className="brand-tagline">Service Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Layers size={16} className="nav-icon" />
            <span>Services</span>
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <LayoutDashboard size={16} className="nav-icon" />
            <span>Dashboard</span>
            {bookingMetrics.activeTotal > 0 && (
              <span className="nav-badge" title={`${bookingMetrics.activeTotal} active bookings`}>
                {bookingMetrics.activeTotal}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Desktop Right Actions */}
        <div className="desktop-actions">
          <button 
            type="button" 
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={() => navigate('/services')}
          >
            <CalendarDays size={16} />
            <span>Book a Service</span>
          </button>

          {/* User Profile Pill */}
          <div className="user-profile-menu-container">
            <button 
              type="button" 
              className="user-profile-pill"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              aria-expanded={userDropdownOpen}
              aria-label="User account menu"
            >
              <div className="user-avatar-circle">
                {userProfile.avatarLetter}
              </div>
              <div className="user-pill-text">
                <span className="user-pill-name">{userProfile.name}</span>
                <span className="user-pill-role">{userProfile.role}</span>
              </div>
              <ChevronDown size={14} className="user-chevron" />
            </button>

            {userDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">{userProfile.name}</p>
                  <p className="dropdown-user-email">{userProfile.email}</p>
                </div>
                <div className="dropdown-divider" />
                <Link 
                  to="/dashboard" 
                  className="dropdown-item" 
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <LayoutDashboard size={16} />
                  <span>My Bookings ({bookingMetrics.total})</span>
                </Link>
                <div className="dropdown-divider" />
                <div className="dropdown-footer">
                  <span className="demo-tag">Demonstration Session</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <nav className="mobile-nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
              onClick={closeMobileMenu}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
              onClick={closeMobileMenu}
            >
              <span>Explore Services</span>
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
              onClick={closeMobileMenu}
            >
              <span>User Dashboard</span>
              {bookingMetrics.activeTotal > 0 && (
                <span className="nav-badge">{bookingMetrics.activeTotal}</span>
              )}
            </NavLink>
          </nav>

          <div className="mobile-nav-footer">
            <div className="mobile-user-card">
              <div className="user-avatar-circle">{userProfile.avatarLetter}</div>
              <div>
                <p className="mobile-user-name">{userProfile.name}</p>
                <p className="mobile-user-email">{userProfile.email}</p>
              </div>
            </div>
            <button 
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => {
                closeMobileMenu();
                navigate('/services');
              }}
            >
              <CalendarDays size={16} />
              <span>Book a Service Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
