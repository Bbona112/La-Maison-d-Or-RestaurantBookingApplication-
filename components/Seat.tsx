'use client';

import React, { useEffect, useState } from 'react';
import { Seat as SeatType } from '@/types';

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  isHovered: boolean;
  isDisabled: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

const SeatComponent: React.FC<SeatProps> = ({
  seat,
  isSelected,
  isHovered,
  isDisabled,
  onSelect,
  onHover,
  onLeave,
}) => {
  const [Circle, setCircle] = useState<any>(null);

  useEffect(() => {
    import('react-konva').then((mod) => {
      setCircle(mod.Circle);
    });
  }, []);

  if (!Circle) {
    return null;
  }

  const seatRadius = 12;
  
  // Determine fill color based on state
  let fillColor = '#1e40af'; // Default seat-blue
  if (isDisabled) {
    fillColor = '#9ca3af'; // Grey for disabled
  } else if (isSelected) {
    fillColor = '#3b82f6'; // Brighter blue for selected
  } else if (isHovered) {
    fillColor = '#60a5fa'; // Lighter blue for hover
  }

  return (
    <Circle
      x={seat.x}
      y={seat.y}
      radius={seatRadius}
      fill={fillColor}
      stroke={isSelected ? '#1e3a8a' : '#1e40af'}
      strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
      opacity={isDisabled ? 0.5 : 1}
      shadowBlur={isSelected ? 10 : isHovered ? 5 : 0}
      shadowColor={isSelected ? '#3b82f6' : '#60a5fa'}
      shadowOpacity={isSelected ? 0.8 : isHovered ? 0.5 : 0}
      onClick={isDisabled ? undefined : onSelect}
      onMouseEnter={isDisabled ? undefined : onHover}
      onMouseLeave={isDisabled ? undefined : onLeave}
      listening={!isDisabled}
    />
  );
};

export default SeatComponent;
