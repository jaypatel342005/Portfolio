import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload, FiMail } from 'react-icons/fi';
import './Hero.css';

const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Computer Vision Expert',
  'MERN Stack Developer',
  'Deep Learning Engineer',
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  // Mouse parallax for avatar — throttled to rAF cadence
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    let rafPending = false;
    const handleMouseMove = (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((e.clientX - centerX) / centerX * 10);
        mouseY.set((e.clientY - centerY) / centerY * 7);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      return;
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="hero__wave">👋</span> Hello, I'm
          </motion.p>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Jay Patel
          </motion.h1>

          <motion.div
            className="hero__role-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="hero__role-prefix">I'm a </span>
            <span className="hero__role gradient-text">{text}</span>
            <span className="hero__cursor">|</span>
          </motion.div>

          <motion.p
            className="hero__bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Aspiring <span className="hero__bio-highlight">AI/ML Engineer</span> with hands-on experience in scalable ML, Deep Learning & Computer Vision systems.
            Proficient in <span className="hero__bio-highlight">Python & PyTorch</span> with full-stack integration skills.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a href="#projects" className="btn btn-primary hero__btn-primary">
              View Projects <FiArrowDown />
            </a>
            <a href="/jay-patel-resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FiDownload /> Resume
            </a>
            <a
              href="#contact"
              className="btn btn-glass"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FiMail /> Hire Me
            </a>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <a href="https://github.com/jaypatel342005" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
              <FiGithub size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/jaypatel345" target="_blank" rel="noopener noreferrer" className="hero__social-link hero__social-link--linkedin" aria-label="LinkedIn">
              <FiLinkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="hero__quick-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <div className="hero__quick-stat">
              <span className="hero__quick-stat-value">5+</span>
              <span className="hero__quick-stat-label">Technologies</span>
            </div>
            <div className="hero__quick-stat-divider" />
            <div className="hero__quick-stat">
              <span className="hero__quick-stat-value">6+</span>
              <span className="hero__quick-stat-label">Projects</span>
            </div>
            <div className="hero__quick-stat-divider" />
            <div className="hero__quick-stat">
              <span className="hero__quick-stat-value">8.8</span>
              <span className="hero__quick-stat-label">GPA / 10</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ x: springX, y: springY }}
        >
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-glow" />
            <div className="hero__avatar-ring hero__avatar-ring--outer" />
            <div className="hero__avatar-ring hero__avatar-ring--inner" />
            <img
              src="https://avatars.githubusercontent.com/u/146502846?v=4"
              alt="Jay Patel"
              className="hero__avatar"
            />
            <div className="hero__avatar-badge">
              <span>🚀</span>
            </div>
          </div>

          <div className="hero__floating-cards">
            <motion.div
              className="hero__float-card hero__float-card--1"
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>🧠</span> Deep Learning
            </motion.div>
            <motion.div
              className="hero__float-card hero__float-card--2"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>⚛️</span> React
            </motion.div>
            <motion.div
              className="hero__float-card hero__float-card--3"
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>🐍</span> Python
            </motion.div>
            <motion.div
              className="hero__float-card hero__float-card--4"
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>🔥</span> PyTorch
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <FiArrowDown size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;
