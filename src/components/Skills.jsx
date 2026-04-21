import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiMongodb, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiFlask, SiFastapi, SiGit, SiDocker, SiPostman, SiVercel,
  SiDotnet, SiJupyter, SiGooglecolab,
  SiNestjs, SiTailwindcss, SiDart, SiFlutter
} from 'react-icons/si';
import { FaJava, FaHtml5, FaCss3Alt, FaDatabase, FaCode } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import './Skills.css';

const skillCategories = [
  {
    title: 'Core Areas',
    subtitle: 'Machine Learning & AI',
    color: '#a855f7',
    skills: [
      { name: 'Machine Learning', icon: <SiScikitlearn size={24} /> },
      { name: 'Deep Learning', icon: <SiPytorch size={24} /> },
      { name: 'Computer Vision', icon: <SiPython size={24} /> },
      { name: 'PyTorch', icon: <SiPytorch size={24} /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn size={24} /> },
      { name: 'Pandas', icon: <SiPandas size={24} /> },
      { name: 'NumPy', icon: <SiNumpy size={24} /> },
    ],
  },
  {
    title: 'Languages',
    subtitle: 'Programming',
    color: '#06b6d4',
    skills: [
      { name: 'Python', icon: <SiPython size={24} /> },
      { name: 'JavaScript', icon: <SiJavascript size={24} /> },
      { name: 'Java', icon: <FaJava size={24} /> },
      { name: 'C', icon: <FaCode size={24} /> },
      { name: 'C#', icon: <TbBrandCSharp size={24} /> },
      { name: 'SQL', icon: <FaDatabase size={24} /> },
      { name: 'Dart', icon: <SiDart size={24} /> },
      { name: 'HTML/CSS', icon: <FaHtml5 size={24} /> },
    ],
  },
  {
    title: 'Frameworks',
    subtitle: 'Web & App Development',
    color: '#10b981',
    skills: [
      { name: 'React.js', icon: <SiReact size={24} /> },
      { name: 'Next.js', icon: <SiNextdotjs size={24} /> },
      { name: 'Node.js', icon: <SiNodedotjs size={24} /> },
      { name: 'Express.js', icon: <SiExpress size={24} /> },
      { name: 'NestJS', icon: <SiNestjs size={24} /> },
      { name: '.NET Core', icon: <SiDotnet size={24} /> },
      { name: 'FastAPI', icon: <SiFastapi size={24} /> },
      { name: 'Flask', icon: <SiFlask size={24} /> },
      { name: 'Flutter', icon: <SiFlutter size={24} /> },
    ],
  },
  {
    title: 'Tools & Databases',
    subtitle: 'Dev Environment',
    color: '#f59e0b',
    skills: [
      { name: 'Git', icon: <SiGit size={24} /> },
      { name: 'MongoDB', icon: <SiMongodb size={24} /> },
      { name: 'MS SQL Server', icon: <FaDatabase size={24} /> },
      { name: 'Docker', icon: <SiDocker size={24} /> },
      { name: 'Postman', icon: <SiPostman size={24} /> },
      { name: 'Vercel', icon: <SiVercel size={24} /> },
      { name: 'Jupyter', icon: <SiJupyter size={24} /> },
      { name: 'Colab', icon: <SiGooglecolab size={24} /> },
    ],
  },
];

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">My Tech Arsenal</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to build intelligent solutions
          </p>
        </motion.div>

        <div className="skills__grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skills__category glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="skills__category-header">
                <div
                  className="skills__category-dot"
                  style={{ background: category.color }}
                />
                <div>
                  <h3 className="skills__category-title">{category.title}</h3>
                  <p className="skills__category-subtitle">{category.subtitle}</p>
                </div>
              </div>

              <div className="skills__list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skills__item"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{ '--skill-color': category.color }}
                  >
                    <span className="skills__item-icon">{skill.icon}</span>
                    <span className="skills__item-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="skills__soft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="skills__soft-title">Soft Skills</h3>
          <div className="skills__soft-list">
            {['Team Collaboration', 'Adaptability & Quick Learning', 'Problem-Solving', 'Analytical Thinking', 'Communication', 'Leadership'].map((skill, i) => (
              <span key={i} className="skills__soft-tag">{skill}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
