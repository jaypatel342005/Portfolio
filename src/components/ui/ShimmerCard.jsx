import { useRef } from 'react';

/**
 * ShimmerCard — Glass card with animated rotating shimmer border.
 * Uses a CSS conic-gradient that rotates continuously to create a glowing border.
 */
const ShimmerCard = ({ children, className = '', style = {}, borderColor = '#f97316' }) => {
  return (
    <div
      className={`shimmer-card-wrapper ${className}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        padding: '1px',
        ...style,
      }}
    >
      {/* Rotating conic gradient border */}
      <div
        className="shimmer-card-border"
        style={{
          '--shimmer-color': borderColor,
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div
        className="shimmer-card-inner"
        style={{ borderRadius: 'calc(var(--radius-lg) - 1px)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default ShimmerCard;
