import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Table } from '@/types';

const dataDirectory = path.join(process.cwd(), 'data');
const tablesFilePath = path.join(dataDirectory, 'tables.json');
const bookingsFilePath = path.join(dataDirectory, 'bookings.json');

export async function GET() {
  try {
    // Read tables data
    const tablesData = fs.readFileSync(tablesFilePath, 'utf8');
    const tables: Table[] = JSON.parse(tablesData);

    // Read bookings to check availability
    let bookings: any[] = [];
    try {
      const bookingsData = fs.readFileSync(bookingsFilePath, 'utf8');
      bookings = JSON.parse(bookingsData);
    } catch (error) {
      // bookings.json might not exist yet, that's okay
    }

    // Get current date and time
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    // Mark seats as unavailable if they're booked for today and future times
    const disabledSeats = new Set<number>();
    
    bookings.forEach((booking) => {
      if (booking.date === currentDate) {
        // If booking time is >= current time, mark seat as unavailable
        if (booking.time >= currentTime) {
          if (booking.seatId !== undefined) {
            disabledSeats.add(booking.seatId);
          }
        }
      } else if (booking.date > currentDate) {
        // Future bookings - mark seat as unavailable
        if (booking.seatId !== undefined) {
          disabledSeats.add(booking.seatId);
        }
      }
    });

    // Update table availability based on disabled seats
    const tablesWithAvailability = tables.map((table) => {
      const hasUnavailableSeats = table.seats.some((seat) =>
        disabledSeats.has(seat.id)
      );
      return {
        ...table,
        available: !hasUnavailableSeats,
      };
    });

    return NextResponse.json(tablesWithAvailability);
  } catch (error) {
    console.error('Error reading tables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}


