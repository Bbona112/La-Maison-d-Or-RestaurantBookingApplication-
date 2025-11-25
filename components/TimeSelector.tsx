'use client';

import { useState } from 'react';

interface TimeSelectorProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const generateTimeSlots = () => {
  const slots = [];
  const startHour = 19; // 7 PM
  const endHour = 23; // 11 PM
  const endMinute = 30; // 11:30 PM
  
  for (let hour = startHour; hour <= endHour; hour++) {
    if (hour === endHour) {
      // Only add 11:00 PM and 11:30 PM
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    } else {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  
  return slots;
};

export default function TimeSelector({ selectedTime, onTimeChange }: TimeSelectorProps) {
  const timeSlots = generateTimeSlots();
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {timeSlots.map((time, index) => {
            const isSelected = time === selectedTime;
            const isHovered = time === hoveredTime;
            
            return (
              <div
                key={time}
                className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer"
                onClick={() => onTimeChange(time)}
                onMouseEnter={() => setHoveredTime(time)}
                onMouseLeave={() => setHoveredTime(null)}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    isSelected
                      ? 'bg-green-500 scale-125 shadow-lg shadow-green-500/50'
                      : isHovered
                      ? 'bg-gray-400 scale-110'
                      : 'bg-gray-300'
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    isSelected ? 'text-green-600 font-bold' : 'text-gray-600'
                  }`}
                >
                  {time}
                </span>
              </div>
            );
          })}
        </div>
        {/* Timeline line */}
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
      </div>
    </div>
  );
}

