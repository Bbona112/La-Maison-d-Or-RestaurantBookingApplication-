'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import { format } from 'date-fns';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        const stored = localStorage.getItem('bookings');
        if (stored) {
          setBookings(JSON.parse(stored));
        }
      }
    } catch (error) {
      const stored = localStorage.getItem('bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchPhone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    const filtered = bookings.filter(
      (booking) => booking.phone === searchPhone.trim()
    );
    setSearchResults(filtered);
    setError(filtered.length === 0 ? 'No bookings found for this phone number' : '');
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const updatedBookings = bookings.filter((b) => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      if (searchResults.length > 0) {
        setSearchResults(searchResults.filter((b) => b.id !== bookingId));
      }
    } catch (error) {
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const displayBookings = searchResults.length > 0 ? searchResults : bookings;

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">My Bookings</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>View and manage your reservations</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Search Section */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h2 className="h4 fw-semibold mb-4">Search Your Bookings</h2>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <input
                type="tel"
                className="form-control flex-fill"
                placeholder="Enter your phone number"
                value={searchPhone}
                onChange={(e) => {
                  setSearchPhone(e.target.value);
                  setError('');
                  if (searchResults.length > 0) {
                    setSearchResults([]);
                  }
                }}
              />
              <button
                onClick={handleSearch}
                className="btn btn-warning px-4 py-2 fw-semibold"
              >
                Search
              </button>
              {searchResults.length > 0 && (
                <button
                  onClick={() => {
                    setSearchResults([]);
                    setSearchPhone('');
                  }}
                  className="btn btn-secondary px-4 py-2 fw-semibold"
                >
                  Clear
                </button>
              )}
            </div>
            {error && <p className="text-danger mt-2 mb-0">{error}</p>}
          </div>
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading bookings...</p>
          </div>
        ) : displayBookings.length === 0 ? (
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body p-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3 d-block"></i>
              <h3 className="h4 fw-semibold mb-2">No Bookings Found</h3>
              <p className="text-muted mb-4">
                {searchResults.length === 0 && searchPhone
                  ? 'No bookings found for this phone number'
                  : 'You don\'t have any bookings yet'}
              </p>
              <Link
                href="/booking"
                className="btn btn-warning px-4 py-2 fw-semibold"
              >
                Book a Table
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h3 className="h5 fw-semibold mb-1">{booking.customerName}</h3>
                          <p className="small text-muted mb-0">
                            Booking ID: <span className="font-monospace">{booking.id}</span>
                          </p>
                        </div>
                        <span className="badge bg-success">Confirmed</span>
                      </div>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <p className="small text-muted mb-1">Date & Time</p>
                          <p className="fw-semibold mb-0">
                            {format(new Date(booking.date), 'MMM dd, yyyy')} at {booking.time}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <p className="small text-muted mb-1">Guests</p>
                          <p className="fw-semibold mb-0">{booking.numberOfGuests} guests</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="small text-muted mb-1">Phone</p>
                          <p className="fw-semibold mb-0">{booking.phone}</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="small text-muted mb-1">Table</p>
                          <p className="fw-semibold mb-0">
                            {booking.tableId}
                            {booking.seatId && ` - Seat ${booking.seatId}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 mt-md-0">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn btn-danger px-4 py-2 fw-semibold"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
