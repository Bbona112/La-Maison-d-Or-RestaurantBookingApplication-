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
    // Load bookings from localStorage or fetch from API
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      // Try to fetch from API if available
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem('bookings');
        if (stored) {
          setBookings(JSON.parse(stored));
        }
      }
    } catch (error) {
      // Fallback to localStorage
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
      // In a real app, you'd call an API endpoint
      const updatedBookings = bookings.filter((b) => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      // Update search results if showing them
      if (searchResults.length > 0) {
        setSearchResults(searchResults.filter((b) => b.id !== bookingId));
      }
    } catch (error) {
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const displayBookings = searchResults.length > 0 ? searchResults : bookings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-amber-100 text-lg">View and manage your reservations</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Search Your Bookings
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={searchPhone}
              onChange={(e) => {
                setSearchPhone(e.target.value);
                setError('');
                if (searchResults.length > 0) {
                  setSearchResults([]);
                }
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors"
            >
              Search
            </button>
            {searchResults.length > 0 && (
              <button
                onClick={() => {
                  setSearchResults([]);
                  setSearchPhone('');
                }}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : displayBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchResults.length === 0 && searchPhone
                ? 'No bookings found for this phone number'
                : 'You don\'t have any bookings yet'}
            </p>
            <Link
              href="/booking"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors"
            >
              Book a Table
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {booking.customerName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Booking ID: <span className="font-mono">{booking.id}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Confirmed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-semibold">
                          {format(new Date(booking.date), 'MMM dd, yyyy')} at{' '}
                          {booking.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-semibold">{booking.numberOfGuests} guests</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Table</p>
                        <p className="font-semibold">
                          {booking.tableId}
                          {booking.seatId && ` - Seat ${booking.seatId}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="w-full md:w-auto px-6 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                    >
                      Cancel Booking
                    </button>
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

