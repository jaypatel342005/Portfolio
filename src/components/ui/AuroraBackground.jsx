import { useEffect, useRef } from 'react';

/**
 * AuroraBackground — Animated aurora/mesh gradient that replaces the canvas particle system.
 * Pure CSS animations — zero JS after mount, very performant.
 */
const AuroraBackground = () => {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-layer aurora-layer--1" />
      <div className="aurora-layer aurora-layer--2" />
      <div className="aurora-layer aurora-layer--3" />
      <div className="aurora-layer aurora-layer--4" />
      <div className="aurora-noise" />
    </div>
  );
};

export default AuroraBackground;
