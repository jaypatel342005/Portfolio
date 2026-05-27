import { motion } from 'framer-motion';
import { FiBookOpen, FiAward } from 'react-icons/fi';
import './Education.css';

const education = [
  {
    institution: 'Darshan University, Rajkot',
    degree: 'B.Tech in Computer Science',
    period: '2023 – 2027 (Expected)',
    grade: 'Current CPI: 8.8 / 10',
    icon: <FiBookOpen size={24} />,
    color: '#a855f7',
    details: [
      'Core focus on AI/ML, Data Science, and Software Engineering',
      'Built real-world projects in Deep Learning, Computer Vision & Full-Stack Development',
      'Coursework: Data Mining, DAA, .NET Core, Advanced ML',
    ],
  },
  {
    institution: 'Jawahar Navodaya Vidyalaya, Rajkot',
    degree: 'Higher Secondary Education (CBSE)',
    period: 'March 2021 – March 2023',
    grade: 'Overall Percentage: 78%',
    icon: <FiAward size={24} />,
    color: '#06b6d4',
    details: [
      'Strong foundation in Mathematics and Sciences',
      'Central Board of Secondary Education (CBSE) curriculum',
    ],
  },
];

const detailVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const detailItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Education = () => {
  return (
    <section className="section education" id="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle">
            My educational background and academic achievements
          </p>
        </motion.div>

        <div className="education__timeline">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="education__item glass-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ x: 6, transition: { duration: 0.25 } }}
              style={{ '--edu-color': edu.color }}
            >
              {/* animated left border */}
              <motion.div
                className="education__item-border"
                style={{ background: edu.color }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
              />

              <motion.div
                className="education__item-icon"
                style={{ background: `${edu.color}20`, color: edu.color }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {edu.icon}
              </motion.div>

              <div className="education__item-content">
                <div className="education__item-header">
                  <div>
                    <h3 className="education__item-institution">{edu.institution}</h3>
                    <p className="education__item-degree">{edu.degree}</p>
                  </div>
                  <div className="education__item-meta">
                    <span className="education__item-period">{edu.period}</span>
                    <motion.span
                      className="education__item-grade"
                      style={{ color: edu.color }}
                      animate={{
                        textShadow: [`0 0 8px ${edu.color}00`, `0 0 8px ${edu.color}80`, `0 0 8px ${edu.color}00`],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {edu.grade}
                    </motion.span>
                  </div>
                </div>

                <motion.ul
                  className="education__item-details"
                  variants={detailVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {edu.details.map((detail, j) => (
                    <motion.li key={j} variants={detailItem}>
                      <motion.span
                        className="education__item-bullet"
                        style={{ background: edu.color }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: j * 0.4 }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
