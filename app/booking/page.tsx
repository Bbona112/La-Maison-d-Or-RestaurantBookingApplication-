'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BookingForm from '@/components/BookingForm';
import { Table, BookingFormData } from '@/types';

// Dynamically import RestaurantLayout to avoid SSR issues with Konva
const RestaurantLayout = dynamic(() => import('@/components/RestaurantLayout'), {
  ssr: false,
  loading: () => (
    <div className="border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="flex items-center justify-center min-h-[640px]">
        <div className="text-gray-500">Loading floor plan...</div>
      </div>
    </div>
  ),
});

export default function BookingPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<string | undefined>();
  const [selectedSeatId, setSelectedSeatId] = useState<number | undefined>();
  const [disabledSeats, setDisabledSeats] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  // Fetch tables on component mount
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleSelectTable = (tableId: string) => {
    setSelectedTableId(tableId);
    setSelectedSeatId(undefined); // Reset seat selection when table changes
  };

  const handleSelectSeat = (tableId: string, seatId: number) => {
    setSelectedTableId(tableId);
    setSelectedSeatId(seatId);
  };

  const handleSubmitBooking = async (formData: BookingFormData) => {
    if (!selectedTableId) {
      alert('Please select a table first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableId: selectedTableId,
          seatId: selectedSeatId,
          ...formData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingId(result.bookingId);
        setShowSuccessModal(true);
        // Reset selections
        setSelectedTableId(undefined);
        setSelectedSeatId(undefined);
        // Refresh tables to update availability
        await fetchTables();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTable = tables.find((t) => t.id === selectedTableId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">Book Your Table</h1>
          <p className="text-amber-100 text-lg">Select your preferred table and seat</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Side - Floor Layout */}
          <div className="order-2 lg:order-1 w-full">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                Restaurant Floor Plan
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                Click on a table or seat to select your preferred spot
              </p>
              {selectedTableId && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs sm:text-sm">
                  <span className="font-semibold text-blue-800">
                    Selected: {tables.find(t => t.id === selectedTableId)?.name}
                    {selectedSeatId && ` - Seat ${selectedSeatId}`}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full overflow-hidden">
              <RestaurantLayout
                tables={tables}
                selectedTableId={selectedTableId}
                selectedSeatId={selectedSeatId}
                disabledSeats={disabledSeats}
                onSelectTable={handleSelectTable}
                onSelectSeat={handleSelectSeat}
              />
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="order-1 lg:order-2 w-full">
            <BookingForm
              selectedTableId={selectedTableId}
              selectedSeatId={selectedSeatId}
              tableName={selectedTable?.name}
              onSubmit={handleSubmitBooking}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Your reservation has been successfully created.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.href = '/my-bookings';
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

