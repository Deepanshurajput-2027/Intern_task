import { useState } from 'react';
import { Star } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ value, onChange, disabled, size = 32, className = '' }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverValue(0);
    }
  };

  const handleKeyDown = (e, rating) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  return (
    <div className={`star-rating ${className}`} role="radiogroup" aria-label="Rating out of 5 stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverValue || value) >= star;
        return (
          <div
            key={star}
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            tabIndex={disabled ? -1 : 0}
            className={`star-container ${disabled ? 'disabled' : ''} ${isFilled ? 'filled' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => handleKeyDown(e, star)}
          >
            <Star 
              size={size} 
              className="star-icon" 
              fill={isFilled ? 'currentColor' : 'none'} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
