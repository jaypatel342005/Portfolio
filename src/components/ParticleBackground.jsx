import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // opaque = faster compositing
    let animationId;
    let particles = [];
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      // Fewer particles — cap at 60 regardless of screen size
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: (Math.random() - 0.5) * 0.35,
          opacity: Math.random() * 0.5 + 0.1,
          // Pre-compute color string once
          colorStr: Math.random() > 0.5
            ? `rgba(192,132,252,${(Math.random() * 0.5 + 0.1).toFixed(2)})`
            : `rgba(6,182,212,${(Math.random() * 0.5 + 0.1).toFixed(2)})`,
        });
      }
    };

    // Static orb positions — drawn as CSS-styled divs instead of canvas radial gradients
    // We skip orbs on canvas entirely (handled by CSS background in index.css)

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frameCount++;

      // Fill background (faster than clearRect on opaque canvas)
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelRadius = 100;
      const repelRadius2 = repelRadius * repelRadius;
      const connectionDist = 120;
      const connectionDist2 = connectionDist * connectionDist;

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel — use dist² to skip sqrt
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist2 = dx * dx + dy * dy;

        if (dist2 < repelRadius2 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          const force = (repelRadius - dist) / repelRadius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.colorStr;
        ctx.fill();
      }

      // Draw connections — only every other frame to halve cost
      if (frameCount % 2 === 0) {
        ctx.lineWidth = 0.4;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < connectionDist2) {
              const alpha = (0.08 * (1 - Math.sqrt(dist2) / connectionDist)).toFixed(3);
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
              ctx.stroke();
            }
          }
        }
      }
    };

    // Throttle mouse to ~60fps using rAF flag
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        ticking = true;
        requestAnimationFrame(() => { ticking = false; });
      }
    };

    // Debounce resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 150);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause animation when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleBackground;
