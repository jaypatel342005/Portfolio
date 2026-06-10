import { useEffect, useRef } from 'react';

/**
 * Meteors — Aceternity-style diagonal shooting-star lines.
 * Renders <number> lines that shoot from top-right to bottom-left.
 */
const Meteors = ({ number = 14 }) => {
  const meteors = Array.from({ length: number }, (_, i) => ({
    id: i,
    top: `${Math.random() * 60}%`,
    right: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${Math.floor(Math.random() * 5) + 4}s`,
    width: `${Math.floor(Math.random() * 60) + 60}px`,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <div
      className="meteors-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: 'inherit',
      }}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            top: m.top,
            right: m.right,
            animationDelay: m.delay,
            animationDuration: m.duration,
            width: m.width,
            opacity: m.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Meteors;
