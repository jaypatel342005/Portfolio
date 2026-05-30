import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      // Direct DOM mutation — zero React re-renders
      bar.style.transform = `scaleX(${percent / 100})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)',
        zIndex: 9999,
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        boxShadow: '0 0 10px rgba(124, 58, 237, 0.6)',
        willChange: 'transform',
      }}
    />
  );
};

export default ScrollProgress;
