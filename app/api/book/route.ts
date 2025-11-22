import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Booking } from '@/types';

const dataDirectory = path.join(process.cwd(), 'data');
const bookingsFilePath = path.join(dataDirectory, 'bookings.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      tableId,
      seatId,
      customerName,
      phone,
      date,
      time,
      numberOfGuests,
    } = body;

    // Validation
    if (!tableId || !customerName || !phone || !date || !time) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing bookings
    let bookings: Booking[] = [];
    try {
      const bookingsData = fs.readFileSync(bookingsFilePath, 'utf8');
      bookings = JSON.parse(bookingsData);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      bookings = [];
    }

    // Check for double-booking
    const conflictingBooking = bookings.find((booking) => {
      if (seatId !== undefined) {
        // Check if same seat is booked for same date and time
        return (
          booking.tableId === tableId &&
          booking.seatId === seatId &&
          booking.date === date &&
          booking.time === time
        );
      } else {
        // Check if same table is booked for same date and time (without specific seat)
        return (
          booking.tableId === tableId &&
          booking.date === date &&
          booking.time === time
        );
      }
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          message: seatId
            ? 'This seat is already booked for the selected date and time'
            : 'This table is already booked for the selected date and time',
        },
        { status: 409 }
      );
    }

    // Ensure data directory exists
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, { recursive: true });
    }

    // Create new booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      tableId,
      seatId,
      customerName,
      phone,
      date,
      time,
      numberOfGuests: numberOfGuests || 1,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    // Write back to file
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({
      success: true,
      bookingId: newBooking.id,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

