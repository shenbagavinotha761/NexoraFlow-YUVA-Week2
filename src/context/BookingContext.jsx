/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SERVICES, INITIAL_BOOKINGS } from '../data/servicesData';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Initialize bookings from localStorage if available, otherwise use initial demo list
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem('nexoraflow_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read bookings from localStorage', e);
    }
    return INITIAL_BOOKINGS;
  });

  // Services catalog
  const [services] = useState(INITIAL_SERVICES);

  // Active user profile (for demo/internship showcase)
  const [userProfile, setUserProfile] = useState({
    name: 'Venkatesh A.',
    email: 'venkatesh.a@nexoraflow.demo',
    phone: '+91 98401 23456',
    address: 'Flat 402, Green Meadows Residency, Tech Zone 1',
    role: 'Verified Client',
    avatarLetter: 'V'
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Modals state
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState(null);
  const [activeBookingForView, setActiveBookingForView] = useState(null);

  // Sync bookings to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('nexoraflow_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Could not save bookings to localStorage', e);
    }
  }, [bookings]);

  // Show toast with auto-dismiss
  const showToast = (message, type = 'success') => {
    const toastId = Date.now();
    setToast({ id: toastId, message, type });
    setTimeout(() => {
      setToast((current) => (current && current.id === toastId ? null : current));
    }, 4000);
  };

  const hideToast = () => {
    setToast(null);
  };

  // Add a new booking
  const createBooking = (bookingData) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `NXF-${randomNum}`;

    const basePrice = Number(bookingData.price || 0);
    const tax = Number((basePrice * 0.08).toFixed(2));
    const platformFee = 5.0;
    const totalPrice = Number((basePrice + tax + platformFee).toFixed(2));

    const newBooking = {
      id: bookingId,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      category: bookingData.category || 'General',
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      customerName: bookingData.customerName || userProfile.name,
      customerEmail: bookingData.customerEmail || userProfile.email,
      customerPhone: bookingData.customerPhone || userProfile.phone,
      address: bookingData.address || userProfile.address,
      provider: bookingData.provider || 'Assigned Certified Pro',
      price: basePrice,
      tax: tax,
      platformFee: platformFee,
      totalPrice: totalPrice,
      status: 'Confirmed', // new bookings are directly confirmed
      createdAt: new Date().toISOString(),
      notes: bookingData.notes || 'Standard booking instructions provided.'
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLastConfirmedBooking(newBooking);
    showToast(`Booking ${bookingId} confirmed successfully!`, 'success');
    return newBooking;
  };

  // Cancel booking
  const cancelBooking = (id, reason = 'User requested cancellation') => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'Cancelled', cancellationReason: reason } : b
      )
    );
    showToast(`Booking ${id} was cancelled.`, 'info');
  };

  // Mark booking completed
  const markBookingCompleted = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Completed' } : b))
    );
    showToast(`Booking ${id} marked as Completed!`, 'success');
  };

  // Reset to initial demo data
  const resetToDemoData = () => {
    setBookings(INITIAL_BOOKINGS);
    localStorage.setItem('nexoraflow_bookings', JSON.stringify(INITIAL_BOOKINGS));
    showToast('Bookings reset to initial sample data.', 'info');
  };

  // Calculated metrics for dashboard
  const bookingMetrics = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    completed: bookings.filter((b) => b.status === 'Completed').length,
    cancelled: bookings.filter((b) => b.status === 'Cancelled').length,
    activeTotal: bookings.filter(
      (b) => b.status === 'Confirmed' || b.status === 'Pending'
    ).length
  };

  return (
    <BookingContext.Provider
      value={{
        services,
        bookings,
        userProfile,
        setUserProfile,
        bookingMetrics,
        toast,
        showToast,
        hideToast,
        createBooking,
        cancelBooking,
        markBookingCompleted,
        resetToDemoData,
        // Modal states
        selectedServiceForDetail,
        setSelectedServiceForDetail,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        lastConfirmedBooking,
        setLastConfirmedBooking,
        activeBookingForView,
        setActiveBookingForView
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
