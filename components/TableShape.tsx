'use client';

import React, { useEffect, useState } from 'react';
import { Table, Seat as SeatType } from '@/types';
import SeatComponent from './Seat';

interface TableShapeProps {
  table: Table;
  isSelected: boolean;
  isHovered: boolean;
  isBooked?: boolean;
  selectedSeatId?: number;
  hoveredSeatId?: number;
  disabledSeats?: Set<number>;
  onSelect: (tableId: string) => void;
  onSelectSeat: (tableId: string, seatId: number) => void;
  onHover: (tableId: string) => void;
  onLeave: () => void;
  onSeatHover: (tableId: string, seatId: number) => void;
  onSeatLeave: () => void;
}

const TableShapeComponent: React.FC<TableShapeProps> = ({
  table,
  isSelected,
  isHovered,
  isBooked = false,
  selectedSeatId,
  hoveredSeatId,
  disabledSeats = new Set(),
  onSelect,
  onSelectSeat,
  onHover,
  onLeave,
  onSeatHover,
  onSeatLeave,
}) => {
  const [KonvaComponents, setKonvaComponents] = useState<any>(null);

  useEffect(() => {
    import('react-konva').then((mod) => {
      setKonvaComponents({
        Circle: mod.Circle,
        Rect: mod.Rect,
      });
    });
  }, []);

  if (!KonvaComponents) {
    return null;
  }

  const { Circle, Rect } = KonvaComponents;

  // Determine table color based on status
  let tableColor = '#9ca3af'; // Default gray
  let strokeColor = '#6b7280';
  
  if (isBooked) {
    tableColor = '#ef4444'; // Red for booked
    strokeColor = '#dc2626';
  } else if (isSelected) {
    tableColor = '#22c55e'; // Bright green for selected
    strokeColor = '#16a34a';
  } else if (table.available) {
    // Randomly assign yellow or muted green for available tables
    const tableNum = parseInt(table.name.replace('T', '')) || 0;
    if (tableNum % 2 === 0) {
      tableColor = '#eab308'; // Yellow
      strokeColor = '#ca8a04';
    } else {
      tableColor = '#86efac'; // Muted green
      strokeColor = '#4ade80';
    }
  }
  
  const strokeWidth = isSelected ? 4 : isHovered ? 3 : 2;
  const shadowBlur = isSelected ? 15 : isHovered ? 10 : 0;

  const handleTableClick = () => {
    if (table.available && !isBooked) {
      onSelect(table.id);
    }
  };

  const renderTable = () => {
    if (table.shape === 'round' && table.radius) {
      return (
        <Circle
          x={table.x}
          y={table.y}
          radius={table.radius}
          fill={tableColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          opacity={table.available ? 1 : 0.6}
          shadowBlur={shadowBlur}
          shadowColor={isSelected ? '#2563eb' : '#60a5fa'}
          shadowOpacity={isSelected ? 0.6 : isHovered ? 0.4 : 0}
          onClick={handleTableClick}
          onMouseEnter={() => table.available && !isBooked && onHover(table.id)}
          onMouseLeave={onLeave}
          listening={table.available && !isBooked}
        />
      );
    } else if ((table.shape === 'rectangle' || table.shape === 'square') && table.width && table.height) {
      return (
        <Rect
          x={table.x}
          y={table.y}
          width={table.width}
          height={table.height}
          fill={tableColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          opacity={table.available ? 1 : 0.6}
          shadowBlur={shadowBlur}
          shadowColor={isSelected ? '#2563eb' : '#60a5fa'}
          shadowOpacity={isSelected ? 0.6 : isHovered ? 0.4 : 0}
          cornerRadius={table.shape === 'square' ? 4 : 2}
          onClick={handleTableClick}
          onMouseEnter={() => table.available && !isBooked && onHover(table.id)}
          onMouseLeave={onLeave}
          listening={table.available && !isBooked}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderTable()}
      {/* Render seats */}
      {table.seats.map((seat) => (
        <SeatComponent
          key={seat.id}
          seat={seat}
          isSelected={selectedSeatId === seat.id && isSelected}
          isHovered={hoveredSeatId === seat.id}
          isDisabled={disabledSeats.has(seat.id) || !table.available}
          onSelect={() => onSelectSeat(table.id, seat.id)}
          onHover={() => onSeatHover(table.id, seat.id)}
          onLeave={onSeatLeave}
        />
      ))}
    </>
  );
};

export default TableShapeComponent;
