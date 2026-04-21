import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiGithub, FiCode, FiCpu, FiTarget } from 'react-icons/fi';
import './About.css';

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

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About Me</p>
          <h2 className="section-title">Get to Know Me</h2>
          <p className="section-subtitle">
            A passionate developer from Gujarat, India building intelligent solutions
          </p>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__info glass-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="about__info-title">Who Am I?</h3>
            <p className="about__info-text">
              I'm <strong>Jay Patel</strong>, a B.Tech Computer Science student at <strong>Darshan University, Rajkot</strong>. 
              I'm passionate about building intelligent systems using Python and modern ML frameworks.
            </p>
            <p className="about__info-text">
              My core expertise lies in <strong>Machine Learning, Deep Learning, and Computer Vision</strong>, 
              complemented by strong full-stack development skills across the <strong>MERN stack, ASP.NET Core, and Next.js</strong>.
            </p>
            <p className="about__info-text">
              I'm seeking entry-level opportunities to develop impactful AI-driven solutions 
              and grow in a challenging environment. I thrive on collaboration, quick learning, and turning complex problems into elegant solutions.
            </p>

            <div className="about__meta">
              <div className="about__meta-item">
                <FiMapPin size={16} />
                <span>Morbi, Gujarat, India</span>
              </div>
              <div className="about__meta-item">
                <FiMail size={16} />
                <span>jaypatel97378@gmail.com</span>
              </div>
              <div className="about__meta-item">
                <FiGithub size={16} />
                <a href="https://github.com/jaypatel342005" target="_blank" rel="noopener noreferrer">
                  jaypatel342005
                </a>
              </div>
            </div>
          </motion.div>

          <div className="about__right">
            <div className="about__highlights">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="about__highlight glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="about__highlight-icon">{item.icon}</div>
                  <div>
                    <h4 className="about__highlight-title">{item.title}</h4>
                    <p className="about__highlight-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="about__stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="about__stat">
                  <span className="about__stat-value gradient-text">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
