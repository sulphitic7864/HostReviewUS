import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // e.g. 4.8
  maxStars?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  showNumber = true,
  size = 'md'
}) => {
  const starSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold'
  };

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-500" aria-hidden="true">
        {Array.from({ length: maxStars }).map((_, index) => {
          const fillRatio = Math.max(0, Math.min(1, rating - index));
          return (
            <div key={index} className="relative">
              {/* Background empty star */}
              <Star className={`${starSizeClasses[size]} text-slate-200 fill-slate-200`} />
              {/* Filled star overlay */}
              {fillRatio > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillRatio * 100}%` }}
                >
                  <Star className={`${starSizeClasses[size]} text-amber-500 fill-amber-500`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className={`text-slate-900 font-mono tabular-nums ${textClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
