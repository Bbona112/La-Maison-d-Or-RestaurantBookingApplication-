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
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: '640px' }}>
          <div className="text-muted">Loading floor plan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-2 p-md-4">
        <div className="overflow-auto">
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
        <div className="mt-4 d-flex flex-wrap align-items-center justify-content-center gap-3 small">
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle border border-success" style={{ width: '16px', height: '16px', backgroundColor: '#38b000' }}></div>
            <span className="text-muted">Available Table</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#1e40af' }}></div>
            <span className="text-muted">Seat</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle border border-secondary" style={{ width: '16px', height: '16px', backgroundColor: '#9ca3af' }}></div>
            <span className="text-muted">Reserved</span>
          </div>
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
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '640px' }}>
        <div className="text-muted">Loading floor plan...</div>
      </div>
    );
  }

  const { Stage, Layer, Rect, Text } = KonvaComponents;

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="d-inline-block">
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
