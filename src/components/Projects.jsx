import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import LampEffect from './ui/LampEffect';
import Meteors from './ui/Meteors';
import './Projects.css';

const projects = [
  {
    title: 'Brain Tumor Classification',
    description:
      'Deep learning model classifying brain MRI scans into 4 categories (Glioma, Meningioma, Pituitary, No Tumor) with ~98% test accuracy on 7,000+ images.',
    techStack: ['Python', 'PyTorch', 'EfficientNet', 'Flask', 'FastAPI', 'Next.js', 'Tailwind'],
    github: 'https://github.com/jaypatel342005/Brain-Tumors-CNN',
    live: 'https://neuralscanai.vercel.app',
    date: 'Mar 2026',
    highlights: [
      '~98% test accuracy on 7,000+ MRI images using EfficientNet-V2-S transfer learning',
      'Image preprocessing & augmentation (flip, rotation, normalization) via TorchVision',
      'Evaluated with confusion matrix, classification report & F1-score',
    ],
    color: '#f97316',
  },
  {
    title: 'Cardiovascular Disease Predictor',
    description:
      'End-to-end ML system predicting cardiovascular disease risk using patient health data with Scikit-learn.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'Next.js', 'Git'],
    github: 'https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor',
    live: 'https://cardioai.vercel.app',
    date: 'Dec 2025',
    highlights: [
      'Full data preprocessing, normalization & EDA pipeline using Pandas & NumPy',
      'Evaluated with confusion matrix, classification report & F1-score',
      'Full-stack Flask + Next.js app for real-time risk prediction',
    ],
    color: '#ef4444',
  },
  {
    title: 'Hospital Management System',
    description:
      'Responsive ASP.NET MVC system with patient/doctor workflows, appointment scheduling, billing, and Azure cloud deployment.',
    techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap 5', 'Azure'],
    github: 'https://github.com/jaypatel342005/Hospital-Management-System',
    live: 'https://hospitalmanagementsystem345-hngkbsaja2hvdzch.centralindia-01.azurewebsites.net/User/Login',
    date: '2025',
    highlights: [
      'Patient & doctor management workflows',
      'Appointment scheduling & billing system',
      'Azure cloud deployment',
    ],
    color: '#f59e0b',
  },
  {
    title: 'Expense Manager',
    description:
      'Full-stack TypeScript expense tracking application with intuitive UI and data visualization for personal finance management.',
    techStack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/jaypatel342005/Expense-Manager',
    live: 'https://expenxo.vercel.app',
    date: '2025',
    highlights: [
      'Full-stack TypeScript application',
      'Expense categorization & analytics',
      'Deployed on Vercel',
    ],
    color: '#fb923c',
  },
  {
    title: 'MERN Stack Project',
    description:
      'Masterfully engineered MERN Stack application combining innovation, scalability, and modern design.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/jaypatel342005/MERN-Stack-Project',
    live: 'https://mern-stack-project-sand.vercel.app/',
    date: '2024',
    highlights: [
      'Full MERN stack architecture',
      'RESTful API design',
      'Responsive modern UI',
    ],
    color: '#ea580c',
  },
  {
    title: 'Matrimony Flutter App',
    description:
      'Cross-platform mobile application built with Flutter and Dart for matrimony matching services with Firebase backend.',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/jaypatel342005/Matrimony-Flutter-App',
    live: null,
    date: '2025',
    highlights: [
      'Cross-platform mobile app (iOS & Android)',
      'Flutter UI with Dart',
      'Profile matching features',
    ],
    color: '#dc2626',
  },
];

/* ── 3D tilt card ── */
const TiltCard = ({ children, className, style, color }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        rotateX: hovered ? tilt.y : 0,
        rotateY: hovered ? tilt.x : 0,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      animate={{
        rotateX: hovered ? tilt.y : 0,
        rotateY: hovered ? tilt.x : 0,
        boxShadow: hovered ? `0 20px 60px ${color}35, 0 0 0 1px ${color}30` : '0 4px 20px rgba(0,0,0,0.4)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Only render Meteors when hovered for maximum performance */}
      {hovered && <Meteors number={4} />}
      {children}
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <LampEffect className="projects__lamp">
          <p className="section-label">University Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Projects that showcase my skills in AI/ML and full-stack development
          </p>
        </LampEffect>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={cardVariants}>
              <TiltCard
                className="projects__card glass-card"
                style={{ '--project-color': project.color, height: '100%' }}
                color={project.color}
              >
                {/* Top color accent bar */}
                <div
                  className="projects__card-accent"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                <div className="projects__card-header">
                  <div className="projects__card-top">
                    <span className="projects__card-date">{project.date}</span>
                    <div className="projects__card-links">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__card-link"
                        aria-label="GitHub"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub size={17} />
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__card-link"
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiExternalLink size={17} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <h3 className="projects__card-title">{project.title}</h3>
                  <p className="projects__card-desc">{project.description}</p>
                </div>

                <div className="projects__card-highlights">
                  {project.highlights.map((h, j) => (
                    <motion.div
                      key={j}
                      className="projects__card-highlight"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.08 }}
                    >
                      <span
                        className="projects__card-bullet"
                        style={{ background: project.color }}
                      />
                      {h}
                    </motion.div>
                  ))}
                </div>

                <div className="projects__card-tech">
                  {project.techStack.map((tech, j) => (
                    <motion.span
                      key={j}
                      className="tag"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
