'use client';

import React, { useEffect, useState } from 'react';
import { Table, Seat as SeatType } from '@/types';
import SeatComponent from './Seat';

interface TableShapeProps {
  table: Table;
  isSelected: boolean;
  isHovered: boolean;
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

  const tableColor = table.available ? '#38b000' : '#9ca3af';
  const strokeColor = isSelected ? '#2563eb' : isHovered ? '#60a5fa' : '#22c55e';
  const strokeWidth = isSelected ? 4 : isHovered ? 3 : 2;
  const shadowBlur = isSelected ? 15 : isHovered ? 10 : 0;

  const handleTableClick = () => {
    if (table.available) {
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
          onMouseEnter={() => table.available && onHover(table.id)}
          onMouseLeave={onLeave}
          listening={table.available}
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
          onMouseEnter={() => table.available && onHover(table.id)}
          onMouseLeave={onLeave}
          listening={table.available}
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
