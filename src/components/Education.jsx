import { motion } from 'framer-motion';
import { FiBookOpen, FiAward } from 'react-icons/fi';
import './Education.css';

const education = [
  {
    institution: 'Darshan University, Rajkot',
    degree: 'B.Tech in Computer Science',
    period: '2023 – Present',
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
    grade: 'Overall Percentage: 87%',
    icon: <FiAward size={24} />,
    color: '#06b6d4',
    details: [
      'Strong foundation in Mathematics and Sciences',
      'Central Board of Secondary Education (CBSE) curriculum',
    ],
  },
];

const Education = () => {
  return (
    <section className="section education" id="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ '--edu-color': edu.color }}
            >
              <div className="education__item-icon" style={{ background: `${edu.color}20`, color: edu.color }}>
                {edu.icon}
              </div>

              <div className="education__item-content">
                <div className="education__item-header">
                  <div>
                    <h3 className="education__item-institution">{edu.institution}</h3>
                    <p className="education__item-degree">{edu.degree}</p>
                  </div>
                  <div className="education__item-meta">
                    <span className="education__item-period">{edu.period}</span>
                    <span className="education__item-grade" style={{ color: edu.color }}>{edu.grade}</span>
                  </div>
                </div>

                <ul className="education__item-details">
                  {edu.details.map((detail, j) => (
                    <li key={j}>
                      <span className="education__item-bullet" style={{ background: edu.color }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
