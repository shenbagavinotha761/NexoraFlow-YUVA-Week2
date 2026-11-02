import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ServiceDetailModal from './components/ServiceDetailModal';
import BookingModal from './components/BookingModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import BookingDetailModal from './components/BookingDetailModal';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import DashboardPage from './pages/DashboardPage';

export function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="app-layout">
          {/* Top Sticky Navigation */}
          <Navbar />

          {/* Main Routed Content */}
          <main className="main-content" id="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Modals & Notifications */}
          <ServiceDetailModal />
          <BookingModal />
          <BookingConfirmationModal />
          <BookingDetailModal />
          <Toast />

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
