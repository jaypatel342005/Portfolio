import { useRef } from 'react';

/**
 * InfiniteMarquee — Seamlessly scrolling horizontal marquee.
 * Renders items twice so the loop is gapless.
 */
const InfiniteMarquee = ({
  items = [],
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = '',
  gap = 48,
}) => {
  const duration = `${(items.length * 180) / speed}s`;

  return (
    <div
      className={`marquee-wrapper ${className}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        className={`marquee-track marquee-track--${direction}`}
        style={{
          display: 'flex',
          width: 'max-content',
          animationDuration: duration,
          gap: `${gap}px`,
        }}
        data-pause-on-hover={pauseOnHover}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item" style={{ flexShrink: 0 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
