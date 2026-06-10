import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiMail, FiGithub, FiCode, FiCpu, FiTarget } from 'react-icons/fi';
import LampEffect from './ui/LampEffect';
import ShimmerCard from './ui/ShimmerCard';
import './About.css';

/* ── Animated counter hook ── */
const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          (Number.isInteger(num) ? Math.floor(start) : start.toFixed(1)) + suffix
        );
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return [ref, count];
};

/* ── Single animated stat ── */
const AnimatedStat = ({ value, label, delay }) => {
  const [ref, count] = useCounter(value);
  return (
    <motion.div
      ref={ref}
      className="about__stat"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="about__stat-value gradient-text">{count}</span>
      <span className="about__stat-label">{label}</span>
    </motion.div>
  );
};

const stats = [
  { value: '24+', label: 'Repositories' },
  { value: '8.8', label: 'CPI / 10' },
  { value: '98%', label: 'Best Accuracy' },
  { value: '6+', label: 'Projects' },
];

const highlights = [
  { icon: <FiCpu size={20} />, title: 'AI/ML Focus', desc: 'Deep Learning, Computer Vision & NLP' },
  { icon: <FiCode size={20} />, title: 'Full-Stack', desc: 'MERN, ASP.NET Core, Next.js, Flask' },
  { icon: <FiTarget size={20} />, title: 'Problem Solver', desc: 'Analytical thinking & adaptability' },
];

/* ── Container variants for stagger ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        {/* Aceternity Lamp Effect */}
        <LampEffect className="about__lamp">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Get to Know Me</h2>
          <p className="section-subtitle">
            A passionate developer from Gujarat, India building intelligent solutions
          </p>
        </LampEffect>

        <div className="about__grid">
          {/* ── Left: Info card wrapped in ShimmerCard ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ShimmerCard borderColor="#f97316" style={{ height: '100%' }}>
              <div className="about__info" style={{ border: 'none', background: 'transparent' }}>
                <h3 className="about__info-title">Who Am I?</h3>
                <p className="about__info-text">
                  I'm <strong>Jay Patel</strong>, a B.Tech Computer Science student at <strong>Darshan University, Rajkot</strong> (2023–2027).
                  An aspiring AI/ML Engineer with hands-on experience building scalable machine learning, deep learning, and computer vision systems.
                </p>
                <p className="about__info-text">
                  Proficient in <strong>Python and PyTorch</strong> with full-stack integration skills across <strong>MERN, ASP.NET Core, Next.js, Flask, and FastAPI</strong>.
                  I build end-to-end AI solutions — from raw data to real-time prediction applications.
                </p>
                <p className="about__info-text">
                  Driven to develop <strong>high-impact AI solutions</strong> that solve real-world problems.
                  I thrive on collaboration, analytical thinking, and turning complex challenges into elegant, scalable software.
                </p>

                <motion.div
                   className="about__meta"
                   variants={containerVariants}
                   initial="hidden"
                   whileInView="show"
                   viewport={{ once: true }}
                >
                  {[
                    { icon: <FiMapPin size={16} />, content: 'Morbi, Gujarat, India' },
                    { icon: <FiMail size={16} />, content: 'jaypatel97378@gmail.com' },
                    {
                      icon: <FiGithub size={16} />,
                      content: (
                        <a href="https://github.com/jaypatel342005" target="_blank" rel="noopener noreferrer">
                          jaypatel342005
                        </a>
                      ),
                    },
                  ].map((item, i) => (
                    <motion.div key={i} className="about__meta-item" variants={itemVariants}>
                      {item.icon}
                      <span>{item.content}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </ShimmerCard>
          </motion.div>

          {/* ── Right: Highlights + Stats ── */}
          <div className="about__right">
            <motion.div
              className="about__highlights"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="about__highlight glass-card"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1, y: 0,
                      transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
                    },
                  }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="about__highlight-icon"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className="about__highlight-title">{item.title}</h4>
                    <p className="about__highlight-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Animated stats ── */}
            <div className="about__stats">
              {stats.map((stat, i) => (
                <AnimatedStat key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
