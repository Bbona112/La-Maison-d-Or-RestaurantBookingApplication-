import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Booking } from '@/types';

const bookingsFilePath = join(process.cwd(), 'data', 'bookings.json');

function getBookings(): Booking[] {
  if (!existsSync(bookingsFilePath)) {
    return [];
  }
  try {
    const fileContent = readFileSync(bookingsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading bookings file:', error);
    return [];
  }
}

export async function GET() {
  try {
    const bookings = getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

