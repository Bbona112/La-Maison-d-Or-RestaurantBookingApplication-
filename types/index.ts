export type TableShape = 'round' | 'rectangle' | 'square';

export interface Seat {
  id: number;
  x: number;
  y: number;
  angle?: number; // For circular tables
}

export interface Table {
  id: string;
  name: string;
  shape: TableShape;
  x: number;
  y: number;
  width?: number; // For rectangle/square
  height?: number; // For rectangle/square
  radius?: number; // For round tables
  seats: Seat[];
  available: boolean;
}

export interface Booking {
  id: string;
  tableId: string;
  seatId?: number;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  createdAt: string;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  numberOfGuests: number;
}



