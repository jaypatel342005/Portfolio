import { useRef, useEffect } from 'react';

/**
 * BackgroundBeams — Aceternity-style animated beam lines sweeping the background.
 * Uses CSS animations on absolutely positioned divs for performance.
 */
const BackgroundBeams = ({ className = '' }) => {
  const beams = [
    { left: '15%', delay: '0s', duration: '6s', opacity: 0.4 },
    { left: '30%', delay: '1.5s', duration: '8s', opacity: 0.3 },
    { left: '45%', delay: '0.5s', duration: '7s', opacity: 0.5 },
    { left: '60%', delay: '2s', duration: '9s', opacity: 0.35 },
    { left: '75%', delay: '1s', duration: '6.5s', opacity: 0.4 },
    { left: '85%', delay: '3s', duration: '7.5s', opacity: 0.25 },
  ];

  return (
    <div
      className={`background-beams ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {beams.map((beam, i) => (
        <div
          key={i}
          className="beam"
          style={{
            left: beam.left,
            animationDelay: beam.delay,
            animationDuration: beam.duration,
            opacity: beam.opacity,
          }}
        />
      ))}
      {/* Radial gradient overlay for depth */}
      <div className="beams-gradient-overlay" />
    </div>
  );
};

export default BackgroundBeams;
