import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Mail, Phone } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo footer-logo">
              <div className="brand-icon-wrapper">
                <Zap className="brand-icon" size={20} />
              </div>
              <span className="brand-title">Nexora<span className="brand-highlight">Flow</span></span>
            </Link>
            <p className="footer-description">
              Next-generation on-demand service booking and management platform. Connecting homeowners and businesses with verified, high-precision professionals.
            </p>
            <div className="footer-badge-item">
              <ShieldCheck size={16} className="text-accent" />
              <span>Verified Professionals &amp; 100% Upfront Pricing</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/services">Explore All Services</Link></li>
              <li><Link to="/dashboard">User Dashboard</Link></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Client Testimonials</a></li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links">
              {SERVICE_CATEGORIES.filter(c => c !== 'All').slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link to={`/services?category=${encodeURIComponent(cat)}`}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Internship Attribution */}
          <div className="footer-col">
            <h4 className="footer-heading">YUVA Internship Project</h4>
            <div className="footer-internship-box">
              <span className="internship-badge">Week 2 Deliverable</span>
              <p className="internship-text">
                Front-End Application Development for NexoraFlow Service Booking &amp; Management Platform.
              </p>
              <div className="contact-mini-list">
                <div className="contact-mini-item">
                  <Mail size={14} />
                  <span>support@nexoraflow.demo</span>
                </div>
                <div className="contact-mini-item">
                  <Phone size={14} />
                  <span>+91 98401 23456</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-disclaimer">
            <span className="sample-data-pill">Notice</span>
            <span>Demonstration front-end platform built with simulated client-side state and verified mock data.</span>
          </div>
          <div className="footer-copyright">
            &copy; {CURRENT_YEAR} NexoraFlow. Developed by Venkatesh A. for YUVA Internship.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
