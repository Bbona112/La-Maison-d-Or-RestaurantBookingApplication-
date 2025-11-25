'use client';

import React, { useState } from 'react';
import { BookingFormData } from '@/types';

interface BookingFormProps {
  selectedTableId?: string;
  selectedSeatId?: number;
  tableName?: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedTableId,
  selectedSeatId,
  tableName,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    phone: '',
    date: '',
    time: '',
    numberOfGuests: 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  // Generate time slots (every 30 minutes from 11:00 to 22:00)
  const timeSlots = [];
  for (let hour = 11; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (formData.date < today) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'At least 1 guest is required';
    } else if (formData.numberOfGuests > 20) {
      newErrors.numberOfGuests = 'Maximum 20 guests allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableId) {
      alert('Please select a table first');
      return;
    }

    if (validate()) {
      await onSubmit(formData);
      setFormData({
        customerName: '',
        phone: '',
        date: '',
        time: '',
        numberOfGuests: 1,
      });
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body p-4">
        <h2 className="h3 fw-bold mb-4">Booking Details</h2>

        {/* Selected Table Info */}
        <div className="alert alert-info mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="small mb-1 text-muted">Selected Table</p>
              <p className="h5 fw-semibold mb-0">
                {tableName || 'None'}
              </p>
              {selectedSeatId && (
                <p className="small text-muted mt-1 mb-0">
                  Seat: {selectedSeatId}
                </p>
              )}
            </div>
            {!selectedTableId && (
              <p className="small text-warning mb-0 fst-italic">
                Click on a table to select
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="customerName"
              className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="John Doe"
            />
            {errors.customerName && (
              <div className="invalid-feedback">{errors.customerName}</div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="date"
              className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              value={formData.date}
              min={today}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>

          {/* Time */}
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time <span className="text-danger">*</span>
            </label>
            <select
              id="time"
              className={`form-select ${errors.time ? 'is-invalid' : ''}`}
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && (
              <div className="invalid-feedback">{errors.time}</div>
            )}
          </div>

          {/* Number of Guests */}
          <div className="mb-4">
            <label htmlFor="numberOfGuests" className="form-label">
              Number of Guests <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="numberOfGuests"
              className={`form-control ${errors.numberOfGuests ? 'is-invalid' : ''}`}
              min="1"
              max="20"
              value={formData.numberOfGuests}
              onChange={(e) => handleChange('numberOfGuests', parseInt(e.target.value) || 1)}
            />
            {errors.numberOfGuests && (
              <div className="invalid-feedback">{errors.numberOfGuests}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedTableId || isLoading}
            className="btn btn-primary w-100 py-3 fw-semibold"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
