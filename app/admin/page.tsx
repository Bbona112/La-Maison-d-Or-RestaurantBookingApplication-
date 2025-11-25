'use client';

import { useState, useEffect } from 'react';
import { Booking } from '@/types';
import { format } from 'date-fns';

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      const updatedBookings = bookings.filter((b) => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (error) {
      alert('Failed to delete booking. Please try again.');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDateOnly = new Date(bookingDate);
    bookingDateOnly.setHours(0, 0, 0, 0);

    let dateMatch = true;
    if (filter === 'today') {
      dateMatch = bookingDateOnly.getTime() === today.getTime();
    } else if (filter === 'upcoming') {
      dateMatch = bookingDateOnly >= today;
    }

    const searchMatch =
      !searchTerm ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tableId.toLowerCase().includes(searchTerm.toLowerCase());

    return dateMatch && searchMatch;
  });

  const stats = {
    total: bookings.length,
    today: bookings.filter((b) => {
      const bookingDate = new Date(b.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    }).length,
    upcoming: bookings.filter((b) => {
      const bookingDate = new Date(b.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= today;
    }).length,
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #fef3c7)' }}>
      {/* Header */}
      <header className="py-4" style={{ background: 'linear-gradient(to right, #d97706, #ea580c)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-2">Admin Dashboard</h1>
          <p className="lead text-white" style={{ color: '#fef3c7' }}>Manage restaurant bookings</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        {/* Statistics Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="small fw-medium text-muted mb-2">Total Bookings</h3>
                <p className="display-6 fw-bold mb-0">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="small fw-medium text-muted mb-2">Today</h3>
                <p className="display-6 fw-bold text-primary mb-0">{stats.today}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h3 className="small fw-medium text-muted mb-2">Upcoming</h3>
                <p className="display-6 fw-bold text-success mb-0">{stats.upcoming}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="d-flex flex-column flex-md-row gap-3">
              <div className="flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, phone, booking ID, or table..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="btn-group" role="group">
                <button
                  onClick={() => setFilter('all')}
                  className={`btn ${filter === 'all' ? 'btn-warning' : 'btn-light'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('today')}
                  className={`btn ${filter === 'today' ? 'btn-warning' : 'btn-light'}`}
                >
                  Today
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`btn ${filter === 'upcoming' ? 'btn-warning' : 'btn-light'}`}
                >
                  Upcoming
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body p-5">
              <i className="bi bi-calendar-x fs-1 text-muted mb-3 d-block"></i>
              <h3 className="h4 fw-semibold mb-2">No Bookings Found</h3>
              <p className="text-muted mb-0">
                {searchTerm || filter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No bookings have been made yet'}
              </p>
            </div>
          </div>
        ) : (
          <div className="card shadow-sm border-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date & Time</th>
                    <th scope="col">Table</th>
                    <th scope="col">Guests</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <span className="font-monospace small">
                          {booking.id.substring(0, 8)}...
                        </span>
                      </td>
                      <td className="fw-medium">{booking.customerName}</td>
                      <td>
                        <div>{format(new Date(booking.date), 'MMM dd, yyyy')}</div>
                        <div className="small text-muted">{booking.time}</div>
                      </td>
                      <td>
                        <div>{booking.tableId}</div>
                        {booking.seatId && (
                          <div className="small text-muted">Seat {booking.seatId}</div>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-primary">{booking.numberOfGuests}</span>
                      </td>
                      <td className="text-muted">{booking.phone}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
