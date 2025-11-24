'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  vegetarian?: boolean;
  glutenFree?: boolean;
}

interface MenuCarouselProps {
  items: MenuItem[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

export default function MenuCarousel({
  items,
  autoRotate = true,
  autoRotateInterval = 5000,
}: MenuCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoRotate || isPaused || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateInterval, isPaused, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsPaused(true);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsPaused(true);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (items.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Items Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="min-w-full px-8 py-6 flex-shrink-0"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {item.vegetarian && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Vegetarian
                          </span>
                        )}
                        {item.glutenFree && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            Gluten Free
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg mb-4">{item.description}</p>
                  </div>
                  <div className="sm:ml-4">
                    <span className="text-3xl font-bold text-amber-600">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-amber-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous item"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-amber-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next item"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-amber-600'
                    : 'w-2 bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Item Counter */}
        {items.length > 1 && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 z-10">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </div>
    </div>
  );
}

