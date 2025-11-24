'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  vegetarian?: boolean;
  glutenFree?: boolean;
  image: string;
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

  const getVisibleItems = () => {
    const visible = [];
    const total = items.length;
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      visible.push({ item: items[index], position: i, index });
    }
    
    return visible;
  };

  if (items.length === 0) return null;

  const visibleItems = getVisibleItems();

  return (
    <div
      className="relative py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Staggered Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleItems.map(({ item, position, index }) => {
            const isCenter = position === 0;
            const isLeft = position < 0;
            const isRight = position > 0;
            
            // Calculate transform and scale based on position
            const scale = isCenter ? 1 : 0.75;
            const translateX = position * 180;
            const translateY = Math.abs(position) * 20;
            const zIndex = isCenter ? 50 : 40 - Math.abs(position) * 5;
            const opacity = isCenter ? 1 : 0.6;

            return (
              <div
                key={`${item.id}-${index}`}
                className="absolute cursor-pointer transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  left: '50%',
                  marginLeft: isCenter ? '-200px' : '-150px',
                }}
                onClick={() => goToSlide(index)}
              >
                <div
                  className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
                    isCenter ? 'hover:shadow-3xl' : 'hover:scale-105'
                  }`}
                  style={{
                    width: isCenter ? '400px' : '300px',
                  }}
                >
                  {/* Image Section */}
                  <div className={`relative w-full overflow-hidden ${isCenter ? 'h-64' : 'h-48'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';
                      }}
                    />
                    {/* Action Icons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {item.vegetarian && (
                        <div className="bg-white bg-opacity-90 p-2 rounded-full shadow-lg">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {item.glutenFree && (
                        <div className="bg-white bg-opacity-90 p-2 rounded-full shadow-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={isCenter ? 'p-6' : 'p-4'}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-bold text-gray-800 ${isCenter ? 'text-xl' : 'text-lg'}`}>
                        {item.name}
                      </h3>
                      <span className={`font-bold text-amber-600 ${isCenter ? 'text-2xl' : 'text-xl'}`}>
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    {isCenter && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-amber-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-amber-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-50"
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
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
      </div>
    </div>
  );
}

