'use client';

import React, { useState, useEffect } from 'react';
import { Table } from '@/types';
import dynamic from 'next/dynamic';

// Import TableShapeComponent dynamically to avoid SSR issues with Konva
const TableShapeComponent = dynamic(() => import('./TableShape'), { ssr: false });

interface RestaurantLayoutProps {
  tables: Table[];
  selectedTableId?: string;
  selectedSeatId?: number;
  disabledSeats?: Set<number>;
  onSelectTable: (tableId: string) => void;
  onSelectSeat: (tableId: string, seatId: number) => void;
}

const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({
  tables,
  selectedTableId,
  selectedSeatId,
  disabledSeats = new Set(),
  onSelectTable,
  onSelectSeat,
}) => {
  const [hoveredTableId, setHoveredTableId] = useState<string | undefined>();
  const [hoveredSeatId, setHoveredSeatId] = useState<number | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTableHover = (tableId: string) => {
    setHoveredTableId(tableId);
  };

  const handleTableLeave = () => {
    setHoveredTableId(undefined);
  };

  const handleSeatHover = (tableId: string, seatId: number) => {
    setHoveredTableId(tableId);
    setHoveredSeatId(seatId);
  };

  const handleSeatLeave = () => {
    setHoveredSeatId(undefined);
  };

  const roomWidth = 800;
  const roomHeight = 600;

  if (!isClient) {
    return (
      <div className="border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="flex items-center justify-center min-h-[640px]">
          <div className="text-gray-500">Loading floor plan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 p-2 sm:p-4 w-full">
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <KonvaCanvas
          roomWidth={roomWidth}
          roomHeight={roomHeight}
          tables={tables}
          selectedTableId={selectedTableId}
          selectedSeatId={selectedSeatId}
          hoveredTableId={hoveredTableId}
          hoveredSeatId={hoveredSeatId}
          disabledSeats={disabledSeats}
          onSelectTable={onSelectTable}
          onSelectSeat={onSelectSeat}
          onTableHover={handleTableHover}
          onTableLeave={handleTableLeave}
          onSeatHover={handleSeatHover}
          onSeatLeave={handleSeatLeave}
        />
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-table-green border-2 border-green-600"></div>
          <span className="text-gray-700">Available Table</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-seat-blue"></div>
          <span className="text-gray-700">Seat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-400 border-2 border-gray-500"></div>
          <span className="text-gray-700">Reserved</span>
        </div>
      </div>
    </div>
  );
};

// Separate component that only renders on client
const KonvaCanvas: React.FC<{
  roomWidth: number;
  roomHeight: number;
  tables: Table[];
  selectedTableId?: string;
  selectedSeatId?: number;
  hoveredTableId?: string;
  hoveredSeatId?: number;
  disabledSeats: Set<number>;
  onSelectTable: (tableId: string) => void;
  onSelectSeat: (tableId: string, seatId: number) => void;
  onTableHover: (tableId: string) => void;
  onTableLeave: () => void;
  onSeatHover: (tableId: string, seatId: number) => void;
  onSeatLeave: () => void;
}> = ({
  roomWidth,
  roomHeight,
  tables,
  selectedTableId,
  selectedSeatId,
  hoveredTableId,
  hoveredSeatId,
  disabledSeats,
  onSelectTable,
  onSelectSeat,
  onTableHover,
  onTableLeave,
  onSeatHover,
  onSeatLeave,
}) => {
  const [KonvaComponents, setKonvaComponents] = React.useState<any>(null);

  useEffect(() => {
    import('react-konva').then((mod) => {
      setKonvaComponents({
        Stage: mod.Stage,
        Layer: mod.Layer,
        Rect: mod.Rect,
        Text: mod.Text,
      });
    });
  }, []);

  if (!KonvaComponents) {
    return (
      <div className="flex items-center justify-center min-h-[640px]">
        <div className="text-gray-500">Loading floor plan...</div>
      </div>
    );
  }

  const { Stage, Layer, Rect, Text } = KonvaComponents;

  return (
    <div className="flex justify-center w-full">
      <div className="inline-block min-w-0">
        <Stage width={roomWidth + 40} height={roomHeight + 40}>
          <Layer>
            {/* Room background */}
            <Rect
              x={20}
              y={20}
              width={roomWidth}
              height={roomHeight}
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth={3}
              cornerRadius={8}
            />
            
            {/* Room border decoration */}
            <Rect
              x={22}
              y={22}
              width={roomWidth - 4}
              height={roomHeight - 4}
              stroke="#f59e0b"
              strokeWidth={1}
              cornerRadius={6}
              dash={[5, 5]}
            />
            
            {/* Render all tables */}
            {tables.map((table) => (
              <TableShapeComponent
                key={table.id}
                table={table}
                isSelected={selectedTableId === table.id}
                isHovered={hoveredTableId === table.id}
                selectedSeatId={selectedSeatId}
                hoveredSeatId={hoveredSeatId}
                disabledSeats={disabledSeats}
                onSelect={onSelectTable}
                onSelectSeat={onSelectSeat}
                onHover={onTableHover}
                onLeave={onTableLeave}
                onSeatHover={onSeatHover}
                onSeatLeave={onSeatLeave}
              />
            ))}
            
            {/* Table labels */}
            {tables.map((table) => {
              let labelX = table.x;
              let labelY = table.y;
              
              // Position label above the table
              if (table.shape === 'round' && table.radius) {
                labelY = table.y - table.radius - 25;
              } else if (table.width && table.height) {
                labelY = table.y - 25;
              }
              
              return (
                <Text
                  key={`label-${table.id}`}
                  x={labelX}
                  y={labelY}
                  text={table.name}
                  fontSize={18}
                  fontFamily="Arial"
                  fontStyle="bold"
                  fill="#1f2937"
                  align="center"
                  offsetX={table.name.length * 5}
                  offsetY={9}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default RestaurantLayout;
