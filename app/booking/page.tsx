'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BookingForm from '@/components/BookingForm';
import { Table, BookingFormData } from '@/types';

// Dynamically import RestaurantLayout to avoid SSR issues with Konva
const RestaurantLayout = dynamic(() => import('@/components/RestaurantLayout'), {
  ssr: false,
  loading: () => (
    <div className="card shadow-sm border-0">
      <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: '640px' }}>
        <div className="text-muted">Loading floor plan...</div>
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
    setSelectedSeatId(undefined);
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
        setSelectedTableId(undefined);
        setSelectedSeatId(undefined);
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
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">Book Your Table</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>Select your preferred table and seat</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        <div className="row g-4">
          {/* Left Side - Floor Layout */}
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="mb-4">
              <h2 className="h3 fw-semibold mb-2">Restaurant Floor Plan</h2>
              <p className="text-muted small mb-2">
                Click on a table or seat to select your preferred spot
              </p>
              {selectedTableId && (
                <div className="alert alert-info mb-0 py-2">
                  <strong>
                    Selected: {tables.find(t => t.id === selectedTableId)?.name}
                    {selectedSeatId && ` - Seat ${selectedSeatId}`}
                  </strong>
                </div>
              )}
            </div>
            <div className="w-100 overflow-hidden">
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
          <div className="col-lg-6 order-lg-2 order-1">
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
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center p-5">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-check-circle-fill text-success fs-1"></i>
                </div>
                <h3 className="h4 fw-bold mb-3">Booking Confirmed!</h3>
                <p className="text-muted mb-3">
                  Your reservation has been successfully created.
                </p>
                <p className="small text-muted mb-4">
                  Booking ID: <span className="font-monospace fw-semibold">{bookingId}</span>
                </p>
                <div className="d-flex gap-3">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="btn btn-secondary flex-fill"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      window.location.href = '/my-bookings';
                    }}
                    className="btn btn-primary flex-fill"
                  >
                    View Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
