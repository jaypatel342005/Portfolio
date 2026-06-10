import { useEffect, useRef } from 'react';

/**
 * GalaxyBackground — Optimized deep space background:
 * - Twinkling starfield with depth parallax (optimized count)
 * - Removed heavy spiral galaxy particles to prevent browser lagging
 * - Increased diagonal meteors (falling stars) spawning & glowing trails
 * - Increased comets (glowing head + gas tail particles)
 * - Added drifting meteoroids (small gray/warm-white drifting rocky debris)
 * - Interactive mouse-following star nudge
 */
const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Track scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Performance Optimized Cosmic Configurations
    const STAR_COUNT = 90; // Reduced to 90 for solid 60fps on all displays
    const stars = [];
    const meteors = [];
    const comets = [];
    const meteoroids = [];

    // Initialize Canvas Dimensions and Scaling
    const resize = () => {
      const dpr = 1; // Force 1:1 pixel rendering for maximum smoothness on all screens (avoids heavy retina/4K scaling)
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Populate starfield (dynamically scale count for mobile screen sizes)
      stars.length = 0;
      const count = width < 768 ? 50 : STAR_COUNT;
      for (let i = 0; i < count; i++) {
        stars.push({
          xRatio: Math.random(),
          yRatio: Math.random(),
          size: Math.random() * 1.3 + 0.3,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.025 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.6 + 0.2, // scroll speed multiplier
          color: Math.random() > 0.85 ? '251, 191, 36' : (Math.random() > 0.5 ? '186, 230, 253' : '255, 255, 255'),
          dispX: 0,
          dispY: 0,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Comet class (sky blue with detailed trails)
    class CometInstance {
      constructor() {
        this.reset();
      }

      reset() {
        this.active = true;
        if (Math.random() > 0.5) {
          this.x = -100;
          this.y = Math.random() * (height * 0.6);
        } else {
          this.x = Math.random() * (width * 0.5);
          this.y = -100;
        }
        
        this.vx = Math.random() * 1.8 + 1.2;
        this.vy = Math.random() * 1.2 + 0.7;
        this.size = Math.random() * 2 + 1.5;
        this.color = '56, 189, 248'; // sky blue glow
        this.tailParticles = [];
      }

      update() {
        if (!this.active) return;
        this.x += this.vx;
        this.y += this.vy;

        // Spawn tail particles (optimized spawn rate & faster decay)
        if (Math.random() > 0.45) {
          this.tailParticles.push({
            x: this.x - this.vx * Math.random(),
            y: this.y - this.vy * Math.random(),
            vx: -this.vx * 0.2 + (Math.random() - 0.5) * 0.4,
            vy: -this.vy * 0.2 + (Math.random() - 0.5) * 0.4,
            size: this.size * (Math.random() * 0.6 + 0.4),
            alpha: 0.8,
            decay: Math.random() * 0.035 + 0.025, // faster decay for shorter, faster trails
          });
        }

        // Update tail particles
        for (let i = this.tailParticles.length - 1; i >= 0; i--) {
          const tp = this.tailParticles[i];
          tp.x += tp.vx;
          tp.y += tp.vy;
          tp.alpha -= tp.decay;
          tp.size *= 0.96;
          if (tp.alpha <= 0) {
            this.tailParticles.splice(i, 1);
          }
        }

        if (this.x > width + 100 || this.y > height + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;

        // Draw tail
        this.tailParticles.forEach((tp) => {
          ctx.beginPath();
          ctx.arc(tp.x, tp.y + (scrollRef.current * 0.15), tp.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${tp.alpha})`;
          ctx.fill();
        });

        // Draw head
        const scrollOffset = scrollRef.current * 0.15;
        const grad = ctx.createRadialGradient(
          this.x, this.y + scrollOffset, 0,
          this.x, this.y + scrollOffset, this.size * 3.5
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, `rgba(${this.color}, 0.8)`);
        grad.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y + scrollOffset, this.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Meteor class (Shooting Stars)
    class MeteorInstance {
      constructor() {
        this.reset();
      }

      reset() {
        this.active = true;
        this.x = Math.random() * (width * 1.3);
        this.y = -50;
        this.speed = Math.random() * 14 + 12;
        this.angle = Math.PI * 0.75 + (Math.random() - 0.5) * 0.08; // ~135 degrees
        this.length = Math.random() * 120 + 80;
        this.thickness = Math.random() * 1.8 + 0.8;
        this.alpha = 1.0;
        this.color = Math.random() > 0.4 ? '249, 115, 22' : '255, 255, 255'; // orange/white
      }

      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.022; // fade rate

        if (this.alpha <= 0 || this.x < -100 || this.y > height + 100) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        
        const scrollOffset = scrollRef.current * 0.18;
        const xHead = this.x;
        const yHead = this.y + scrollOffset;
        const xTail = this.x - Math.cos(this.angle) * this.length;
        const yTail = this.y + scrollOffset - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(xHead, yHead, xTail, yTail);
        grad.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
        grad.addColorStop(0.25, `rgba(239, 68, 68, ${this.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(xHead, yHead);
        ctx.lineTo(xTail, yTail);
        ctx.stroke();
      }
    }

    // Meteoroids class (Drifting space rocks/debris)
    class MeteoroidInstance {
      constructor() {
        this.reset();
      }

      reset() {
        this.active = true;
        // Float in from any side
        const side = Math.floor(Math.random() * 3);
        if (side === 0) {
          // Left
          this.x = -30;
          this.y = Math.random() * height;
        } else if (side === 1) {
          // Top
          this.x = Math.random() * width;
          this.y = -30;
        } else {
          // Right
          this.x = width + 30;
          this.y = Math.random() * height;
        }

        // Slow drift speeds
        this.vx = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
        this.vy = Math.random() * 0.6 + 0.3;
        this.size = Math.random() * 2.2 + 0.8;
        
        // Grayish space rock colors
        const colors = ['156, 163, 175', '107, 114, 128', '75, 85, 99', '209, 213, 219'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.3;
        this.depth = Math.random() * 0.4 + 0.1;
      }

      update() {
        if (!this.active) return;
        this.x += this.vx;
        this.y += this.vy;

        // Out of bounds
        if (this.x < -50 || this.x > width + 50 || this.y > height + 50) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        const scrollOffset = scrollRef.current * this.depth;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y + scrollOffset, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      
      const scrollY = scrollRef.current;
      const mouse = mouseRef.current;

      // Smooth mouse coordinates
      mouse.rx += (mouse.x - mouse.rx) * 0.08;
      mouse.ry += (mouse.y - mouse.ry) * 0.08;

      // 1. Draw Twinkling Starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        const scrollOffset = scrollY * star.depth;
        let starY = (star.yRatio * height - scrollOffset) % height;
        if (starY < 0) starY += height;
        const starX = star.xRatio * width;

        // Mouse displacement
        let dx = starX - mouse.rx;
        let dy = starY - mouse.ry;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (mouse.active && dist < 120) {
          const force = (120 - dist) / 120;
          const pushX = (dx / dist) * force * 18;
          const pushY = (dy / dist) * force * 18;
          star.dispX += (pushX - star.dispX) * 0.1;
          star.dispY += (pushY - star.dispY) * 0.1;
        } else {
          star.dispX *= 0.92;
          star.dispY *= 0.92;
        }

        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha * (0.3 + 0.7 * Math.sin(star.twinklePhase));

        ctx.beginPath();
        ctx.arc(starX + star.dispX, starY + star.dispY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${currentAlpha})`;
        ctx.fill();
      }

      // 2. Spawning & Drawing Meteoroids (Drifting Rocks)
      if (Math.random() < 0.04 && meteoroids.length < 22) {
        meteoroids.push(new MeteoroidInstance());
      }
      for (let i = meteoroids.length - 1; i >= 0; i--) {
        const mr = meteoroids[i];
        mr.update();
        if (!mr.active) {
          meteoroids.splice(i, 1);
        } else {
          mr.draw();
        }
      }

      // 3. Spawning & Drawing Meteors (Increased Spawn Rate & Counts)
      if (Math.random() < 0.035 && meteors.length < 10) {
        meteors.push(new MeteorInstance());
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.update();
        if (!m.active) {
          meteors.splice(i, 1);
        } else {
          m.draw();
        }
      }

      // 4. Spawning & Drawing Comets (Increased Spawns)
      if (Math.random() < 0.005 && comets.length < 4) {
        comets.push(new CometInstance());
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.update();
        if (!c.active) {
          comets.splice(i, 1);
        } else {
          c.draw();
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default GalaxyBackground;
