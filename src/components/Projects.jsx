import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import LampEffect from './ui/LampEffect';
import './Projects.css';

/* ── Project images ── */
import bt1 from '../assets/Images/braintumor/1774177035021.jpg';
import bt2 from '../assets/Images/braintumor/1774177035517.jpg';
import bt3 from '../assets/Images/braintumor/1774177036236.jpg';

import ca1 from '../assets/Images/cardioai/1768141591221.jpg';
import ca2 from '../assets/Images/cardioai/1768141591397.jpg';
import ca3 from '../assets/Images/cardioai/1768141593949.jpg';

import hms1 from '../assets/Images/hms/Screenshot 2025-08-09 003110.png';
import hms2 from '../assets/Images/hms/Screenshot 2025-09-14 123702.png';
import hms3 from '../assets/Images/hms/Screenshot 2026-01-19 204217.png';
import hms4 from '../assets/Images/hms/Screenshot 2026-06-12 110417.png';

import ex1 from '../assets/Images/expenxo/Screenshot 2026-02-22 122918.png';
import ex2 from '../assets/Images/expenxo/Screenshot 2026-06-12 110833.png';
import ex3 from '../assets/Images/expenxo/Screenshot 2026-06-12 111003.png';
import ex4 from '../assets/Images/expenxo/Screenshot 2026-06-12 111026.png';
import ex5 from '../assets/Images/expenxo/Screenshot 2026-06-12 111044.png';
import ex6 from '../assets/Images/expenxo/Screenshot 2026-06-12 111204.png';

import mern1 from '../assets/Images/mern/Screenshot 2026-06-12 113931.png';
import mern2 from '../assets/Images/mern/Screenshot 2026-06-12 114603.png';
import mern3 from '../assets/Images/mern/Screenshot 2026-06-12 114614.png';

const projects = [
  {
    title: 'Brain Tumor Classification',
    subtitle: 'NeuralScan.AI',
    description: 'Deep learning model classifying brain MRI scans into 4 categories with ~98% test accuracy on 7,000+ images using EfficientNet-V2-S.',
    highlights: [
      '~98% test accuracy on 7,000+ MRI images',
      'EfficientNet-V2-S transfer learning + TorchVision augmentation',
      'Confusion matrix, classification report & F1-score evaluation',
    ],
    techStack: ['Python', 'PyTorch', 'EfficientNet', 'Flask', 'FastAPI', 'Next.js', 'Tailwind'],
    images: [bt1, bt2, bt3],
    github: 'https://github.com/jaypatel342005/Brain-Tumors-CNN',
    live: 'https://neuralscanai.vercel.app',
    date: 'Mar 2026',
    badge: '98% Accuracy',
    color: '#f97316',
  },
  {
    title: 'Cardiovascular Disease Predictor',
    subtitle: 'CardioAI',
    description: 'End-to-end ML pipeline predicting cardiovascular disease risk from 68.6k patient records with 13 clinical features.',
    highlights: [
      '68.6k patient records, 73.6%+ accuracy',
      'Data preprocessing, normalization & EDA with Pandas & NumPy',
      'Full-stack Flask + Next.js real-time prediction interface',
    ],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'Next.js', 'Git'],
    images: [ca1, ca2, ca3],
    github: 'https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor',
    live: 'https://cardioai.vercel.app',
    date: 'Dec 2025',
    badge: '73.6%+ Accuracy',
    color: '#ef4444',
  },
  {
    title: 'Hospital Management System',
    subtitle: 'MediSoft',
    description: 'Responsive ASP.NET MVC system with patient/doctor workflows, appointment scheduling, billing, and Azure cloud deployment.',
    highlights: [
      'Patient & doctor management workflows',
      'Appointment scheduling & billing system',
      'Deployed on Microsoft Azure cloud',
    ],
    techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap 5', 'Azure'],
    images: [hms1, hms2, hms3, hms4],
    github: 'https://github.com/jaypatel342005/Hospital-Management-System',
    live: 'https://hospitalmanagementsystem345-hngkbsaja2hvdzch.centralindia-01.azurewebsites.net/User/Login',
    date: '2025',
    badge: 'Azure Deployed',
    color: '#f59e0b',
  },
  {
    title: 'Expense Manager',
    subtitle: 'ExpenXO',
    description: 'Full-stack TypeScript expense tracker with intuitive UI, data visualization, and personal finance analytics.',
    highlights: [
      'Full-stack TypeScript React + Node.js app',
      'Expense categorization & visual analytics',
      'Deployed & live on Vercel',
    ],
    techStack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    images: [ex1, ex2, ex3, ex4, ex5, ex6],
    github: 'https://github.com/jaypatel342005/Expense-Manager',
    live: 'https://expenxo.vercel.app',
    date: '2025',
    badge: 'Full-Stack',
    color: '#fb923c',
  },
  {
    title: 'MERN Stack Project',
    subtitle: 'Full-Stack App',
    description: 'Scalable MERN Stack application with RESTful API, modern design, and full CRUD operations.',
    highlights: [
      'Full MERN stack architecture',
      'RESTful API design with Express',
      'Responsive modern React UI',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    images: [mern1, mern2, mern3],
    github: 'https://github.com/jaypatel342005/MERN-Stack-Project',
    live: 'https://mern-stack-project-sand.vercel.app/',
    date: '2024',
    badge: 'MERN',
    color: '#ea580c',
  },
  {
    title: 'Matrimony Flutter App',
    subtitle: 'Mobile App',
    description: 'Cross-platform matrimony app built with Flutter & Dart featuring profile matching and Firebase backend.',
    highlights: [
      'Cross-platform iOS & Android support',
      'Flutter UI with smooth Dart animations',
      'Firebase auth & real-time database',
    ],
    techStack: ['Flutter', 'Dart', 'Firebase'],
    images: [],
    github: 'https://github.com/jaypatel342005/Matrimony-Flutter-App',
    live: null,
    date: '2025',
    badge: 'Mobile',
    color: '#dc2626',
  },
];

/* ─────────────────────────────────────────
   Auto-Scrolling Marquee Tech Strip
───────────────────────────────────────── */
const TechMarquee = ({ stack, color }) => (
  <div className="tech-marquee">
    <div className="tech-marquee__track">
      {/* Duplicate for seamless loop */}
      {[...stack, ...stack, ...stack].map((tech, i) => (
        <span
          key={i}
          className="tech-marquee__pill"
          style={{
            color: color,
            borderColor: `${color}35`,
            background: `${color}12`,
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Image Carousel
───────────────────────────────────────── */
const ImageCarousel = ({ images, color, title, live }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const paginate = useCallback((dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  }, [images.length]);

  // Auto-advance every 3.5 s
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!images || images.length <= 1 || isPaused) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
  }, [images, isPaused]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const manualPaginate = useCallback((dir) => {
    paginate(dir);
    resetTimer(); // restart timer after manual nav
  }, [paginate, resetTimer]);

  const goTo = useCallback((i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    resetTimer();
  }, [current, resetTimer]);

  const urlLabel = live
    ? live.replace('https://', '').split('/')[0]
    : `${title.toLowerCase().replace(/\s+/g, '-')}.app`;

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className="proj-card__img-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Browser chrome */}
      <div className="proj-card__chrome">
        <span className="proj-card__dot" style={{ background: '#ef4444' }} />
        <span className="proj-card__dot" style={{ background: '#f59e0b' }} />
        <span className="proj-card__dot" style={{ background: '#10b981' }} />
        <div className="proj-card__url-bar">
          <span className="proj-card__url-lock">🔒</span>
          {urlLabel}
        </div>
        {images.length > 1 && (
          <span className="proj-card__img-count">{current + 1}/{images.length}</span>
        )}
      </div>

      {/* Viewport */}
      <div className="proj-card__viewport">
        {images.length === 0 ? (
          <div className="proj-card__placeholder" style={{ '--c': color }}>
            <span className="proj-card__placeholder-icon">🚀</span>
            <span>Screenshots Coming Soon</span>
          </div>
        ) : (
          <>
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <motion.img
                key={current}
                src={images[current]}
                alt={`${title} — screenshot ${current + 1}`}
                className="proj-card__screenshot"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                draggable={false}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  className="proj-card__arrow left"
                  onClick={(e) => { e.stopPropagation(); manualPaginate(-1); }}
                  aria-label="Previous"
                ><FiChevronLeft size={13} /></button>

                <button
                  className="proj-card__arrow right"
                  onClick={(e) => { e.stopPropagation(); manualPaginate(1); }}
                  aria-label="Next"
                ><FiChevronRight size={13} /></button>

                <div className="proj-card__pips">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`proj-card__pip${i === current ? ' active' : ''}`}
                      style={i === current ? { '--c': color } : {}}
                      onClick={(e) => { e.stopPropagation(); goTo(i); }}
                      aria-label={`Go to screenshot ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Auto-play progress bar */}
                <div className="proj-card__progress">
                  <div
                    key={current}
                    className="proj-card__progress-bar"
                    style={{ '--bar-color': color }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Project Card
───────────────────────────────────────── */
const ProjectCard = ({ project, i }) => (
  <motion.article
    className="proj-card"
    style={{ '--c': project.color }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {/* Accent bar */}
    <div className="proj-card__bar" />

    {/* Screenshot */}
    <ImageCarousel
      images={project.images}
      color={project.color}
      title={project.title}
      live={project.live}
    />

    {/* Body */}
    <div className="proj-card__body">

      {/* Row: badge + date + links */}
      <div className="proj-card__row">
        <div className="proj-card__badges">
          <span className="proj-card__badge">{project.badge}</span>
          <span className="proj-card__date">{project.date}</span>
        </div>
        <div className="proj-card__actions">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-card__btn"
            aria-label="GitHub"
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.9 }}
          ><FiGithub size={14} /></motion.a>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card__btn proj-card__btn--live"
              aria-label="Live demo"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
            ><FiExternalLink size={14} /></motion.a>
          )}
        </div>
      </div>

      {/* Titles */}
      <div>
        <p className="proj-card__sub">{project.subtitle}</p>
        <h3 className="proj-card__title">{project.title}</h3>
      </div>

      {/* Description */}
      <p className="proj-card__desc">{project.description}</p>

      {/* Key highlights */}
      <ul className="proj-card__highlights">
        {project.highlights.map((h, idx) => (
          <li key={idx} className="proj-card__hl">
            <span className="proj-card__hl-icon" style={{ background: project.color }}>
              <FiCheck size={8} />
            </span>
            {h}
          </li>
        ))}
      </ul>

      {/* Auto-moving tech marquee */}
      <TechMarquee stack={project.techStack} color={project.color} />
    </div>
  </motion.article>
);

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
const Projects = () => (
  <section className="section projects" id="projects">
    <div className="container">
      <LampEffect className="projects__lamp">
        <p className="section-label">University Projects</p>
        <h2 className="section-title">Featured Work</h2>
        <p className="section-subtitle">
          Projects that showcase my skills in AI/ML and full-stack development
        </p>
      </LampEffect>

      <div className="projects__grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
