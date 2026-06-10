import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Spotlight = ({ className = '', fill = 'white' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let raf;
    const handleMouseMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const el = divRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    // Also track globally for full-page spotlight
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setOpacity(0.7);

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={divRef} className={`spotlight-container ${className}`}>
      <motion.div
        className="spotlight-svg-wrapper"
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg
          className="spotlight-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3787 2842"
          fill="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.25,
          }}
        >
          <g filter="url(#filter0_f_1065_8)">
            <ellipse
              cx={position.x || 1924}
              cy={position.y || 273}
              rx="900"
              ry="380"
              transform={`rotate(-45 ${position.x || 1924} ${position.y || 273})`}
              fill={fill}
              fillOpacity="0.21"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1065_8"
              x="-598.2"
              y="-1414.14"
              width="5044.52"
              height="5044.52"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="151"
                result="effect1_foregroundBlur_1065_8"
              />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

export default Spotlight;
