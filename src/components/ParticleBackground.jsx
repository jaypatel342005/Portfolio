import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let orbs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          baseSpeedX: (Math.random() - 0.5) * 0.4,
          baseSpeedY: (Math.random() - 0.5) * 0.4,
          speedX: 0,
          speedY: 0,
          opacity: Math.random() * 0.6 + 0.1,
          color: Math.random() > 0.5 ? '192, 132, 252' : '6, 182, 212',
        });
      }
    };

    const createOrbs = () => {
      orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 350, color: 'rgba(124, 58, 237, 0.04)', speedX: 0.2, speedY: 0.1 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, radius: 280, color: 'rgba(6, 182, 212, 0.04)', speedX: -0.15, speedY: 0.12 },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: 400, color: 'rgba(168, 85, 247, 0.03)', speedX: 0.1, speedY: -0.08 },
        { x: canvas.width * 0.1, y: canvas.height * 0.9, radius: 250, color: 'rgba(16, 185, 129, 0.02)', speedX: 0.12, speedY: -0.06 },
      ];
    };

    const drawParticles = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelRadius = 120;

      particles.forEach((p) => {
        // Mouse repel
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          p.speedX = p.baseSpeedX + (dx / dist) * force * 2;
          p.speedY = p.baseSpeedY + (dy / dist) * force * 2;
        } else {
          p.speedX += (p.baseSpeedX - p.speedX) * 0.05;
          p.speedY += (p.baseSpeedY - p.speedY) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawOrbs = () => {
      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        orb.x += orb.speedX;
        orb.y += orb.speedY;

        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.speedX *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.speedY *= -1;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawOrbs();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resize();
      createParticles();
      createOrbs();
    };

    resize();
    createParticles();
    createOrbs();
    animate();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
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
