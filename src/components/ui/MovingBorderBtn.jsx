import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';

const MovingBorderBtn = ({
  children,
  className = '',
  containerClassName = '',
  borderClassName = '',
  duration = 2000,
  rx = '30%',
  ry = '30%',
  as: Tag = 'button',
  onClick,
  href,
  target,
  rel,
  style,
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try { return pathRef.current.getPointAtLength(val)?.x ?? 0; } catch { return 0; }
  });
  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try { return pathRef.current.getPointAtLength(val)?.y ?? 0; } catch { return 0; }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  const Comp = href ? 'a' : Tag;
  const compProps = href ? { href, target, rel } : { onClick };

  return (
    <div
      className={`moving-border-container ${containerClassName}`}
      style={{ position: 'relative', ...style }}
    >
      {/* SVG path for the border animation */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>

      {/* Animated glow spot */}
      <motion.div
        className={`moving-border-spot ${borderClassName}`}
        style={{ position: 'absolute', top: 0, left: 0, transform, pointerEvents: 'none', zIndex: 1 }}
      />

      {/* Actual button content */}
      <Comp
        className={`moving-border-btn ${className}`}
        {...compProps}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {children}
      </Comp>
    </div>
  );
};

export default MovingBorderBtn;
