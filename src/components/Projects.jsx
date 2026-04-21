import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    title: 'Brain Tumor Classification',
    description:
      'Deep learning model classifying brain MRI scans into 4 categories (Glioma, Meningioma, Pituitary, No Tumor) with ~98% test accuracy on 7,000+ images. Benchmarked Custom CNN, ResNet18, and EfficientNet-V2-S architectures.',
    techStack: ['Python', 'PyTorch', 'EfficientNet', 'Flask', 'FastAPI', 'Next.js', 'Tailwind'],
    github: 'https://github.com/jaypatel342005/Brain-Tumors-CNN',
    live: 'https://neuralscanai.vercel.app',
    date: 'Mar 2026',
    highlights: [
      '~98% test accuracy on 7,000+ MRI images',
      'Transfer learning with EfficientNet-V2-S',
      'Real-time predictions with confidence scores',
    ],
    color: '#a855f7',
  },
  {
    title: 'Cardiovascular Disease Predictor',
    description:
      'End-to-end ML system predicting cardiovascular disease risk using patient health data. Trained and optimized models with features like age, blood pressure, and cholesterol.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'Next.js', 'Git'],
    github: 'https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor',
    live: 'https://cardioai.vercel.app',
    date: 'Dec 2025',
    highlights: [
      'Full preprocessing, normalization & EDA pipeline',
      'Evaluated with confusion matrix & F1-score',
      'Real-time risk prediction web interface',
    ],
    color: '#06b6d4',
  },
  {
    title: 'Hospital Management System',
    description:
      'Modern, responsive ASP.NET MVC hospital management system with secure patient and doctor workflows, appointment scheduling, billing, analytics dashboard, and Azure cloud deployment.',
    techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap 5', 'Azure'],
    github: 'https://github.com/jaypatel342005/Hospital-Management-System',
    live: 'https://hospitalmanagementsystem345-hngkbsaja2hvdzch.centralindia-01.azurewebsites.net/User/Login',
    date: '2025',
    highlights: [
      'Patient & doctor management workflows',
      'Appointment scheduling & billing system',
      'Azure cloud deployment',
    ],
    color: '#10b981',
  },
  {
    title: 'Expense Manager',
    description:
      'Full-stack expense tracking application built with TypeScript for managing personal finances with intuitive UI and data visualization.',
    techStack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/jaypatel342005/Expense-Manager',
    live: 'https://expenxo.vercel.app',
    date: '2025',
    highlights: [
      'Full-stack TypeScript application',
      'Expense categorization & analytics',
      'Deployed on Vercel',
    ],
    color: '#f59e0b',
  },
  {
    title: 'MERN Stack Project',
    description:
      'Masterfully engineered MERN Stack application combining innovation, scalability, and modern design for an elevated web development experience.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/jaypatel342005/MERN-Stack-Project',
    live: 'https://mern-stack-project-sand.vercel.app/',
    date: '2024',
    highlights: [
      'Full MERN stack architecture',
      'RESTful API design',
      'Responsive modern UI',
    ],
    color: '#ef4444',
  },
  {
    title: 'Matrimony Flutter App',
    description:
      'Cross-platform mobile application built with Flutter and Dart for matrimony matching services.',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/jaypatel342005/Matrimony-Flutter-App',
    live: null,
    date: '2025',
    highlights: [
      'Cross-platform mobile app',
      'Flutter UI with Dart',
      'Profile matching features',
    ],
    color: '#8b5cf6',
  },
];

const Projects = () => {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">University Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Projects that showcase my skills in AI/ML and full-stack development
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="projects__card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ '--project-color': project.color }}
            >
              <div className="projects__card-header">
                <div className="projects__card-top">
                  <span className="projects__card-date">{project.date}</span>
                  <div className="projects__card-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__card-link"
                      aria-label="GitHub"
                    >
                      <FiGithub size={18} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__card-link"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-desc">{project.description}</p>
              </div>

              <div className="projects__card-highlights">
                {project.highlights.map((h, j) => (
                  <div key={j} className="projects__card-highlight">
                    <span className="projects__card-bullet" style={{ background: project.color }} />
                    {h}
                  </div>
                ))}
              </div>

              <div className="projects__card-tech">
                {project.techStack.map((tech, j) => (
                  <span key={j} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div
                className="projects__card-accent"
                style={{ background: project.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
