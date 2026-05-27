import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiMongodb, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiFlask, SiFastapi, SiGit, SiDocker, SiPostman, SiVercel, SiRender, SiKaggle,
  SiDotnet, SiJupyter, SiGooglecolab,
  SiNestjs, SiTailwindcss, SiDart, SiFlutter
} from 'react-icons/si';
import { FaJava, FaHtml5, FaDatabase, FaCode } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import './Skills.css';

const skillCategories = [
  {
    title: 'Core Areas',
    subtitle: 'Machine Learning & AI',
    color: '#a855f7',
    skills: [
      { name: 'Machine Learning', icon: <SiScikitlearn size={22} /> },
      { name: 'Deep Learning', icon: <SiPytorch size={22} /> },
      { name: 'Computer Vision', icon: <SiPython size={22} /> },
      { name: 'PyTorch', icon: <SiPytorch size={22} /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn size={22} /> },
      { name: 'Pandas', icon: <SiPandas size={22} /> },
      { name: 'NumPy', icon: <SiNumpy size={22} /> },
    ],
  },
  {
    title: 'Languages',
    subtitle: 'Programming',
    color: '#06b6d4',
    skills: [
      { name: 'Python', icon: <SiPython size={22} /> },
      { name: 'JavaScript', icon: <SiJavascript size={22} /> },
      { name: 'TypeScript', icon: <SiTypescript size={22} /> },
      { name: 'Java', icon: <FaJava size={22} /> },
      { name: 'C', icon: <FaCode size={22} /> },
      { name: 'C#', icon: <TbBrandCSharp size={22} /> },
      { name: 'SQL', icon: <FaDatabase size={22} /> },
      { name: 'Dart', icon: <SiDart size={22} /> },
      { name: 'HTML/CSS', icon: <FaHtml5 size={22} /> },
    ],
  },
  {
    title: 'Frameworks',
    subtitle: 'Web & App Development',
    color: '#10b981',
    skills: [
      { name: 'React.js', icon: <SiReact size={22} /> },
      { name: 'Next.js', icon: <SiNextdotjs size={22} /> },
      { name: 'Node.js', icon: <SiNodedotjs size={22} /> },
      { name: 'Express.js', icon: <SiExpress size={22} /> },
      { name: 'NestJS', icon: <SiNestjs size={22} /> },
      { name: '.NET Core', icon: <SiDotnet size={22} /> },
      { name: 'FastAPI', icon: <SiFastapi size={22} /> },
      { name: 'Flask', icon: <SiFlask size={22} /> },
      { name: 'Flutter', icon: <SiFlutter size={22} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={22} /> },
    ],
  },
  {
    title: 'Tools & Databases',
    subtitle: 'Dev Environment',
    color: '#f59e0b',
    skills: [
      { name: 'Git', icon: <SiGit size={22} /> },
      { name: 'MongoDB', icon: <SiMongodb size={22} /> },
      { name: 'MS SQL Server', icon: <FaDatabase size={22} /> },
      { name: 'Docker', icon: <SiDocker size={22} /> },
      { name: 'Postman', icon: <SiPostman size={22} /> },
      { name: 'Vercel', icon: <SiVercel size={22} /> },
      { name: 'Render', icon: <SiRender size={22} /> },
      { name: 'Jupyter', icon: <SiJupyter size={22} /> },
      { name: 'Kaggle', icon: <SiKaggle size={22} /> },
      { name: 'Colab', icon: <SiGooglecolab size={22} /> },
    ],
  },
];

/* ── Stagger container ── */
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const softSkills = ['Team Collaboration', 'Adaptability & Quick Learning', 'Problem-Solving', 'Analytical Thinking', 'Communication', 'Leadership'];

const Skills = () => {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: catIndex * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Color accent bar */}
              <div
                className="skills__category-bar"
                style={{ background: category.color }}
              />

              <div className="skills__category-header">
                <motion.div
                  className="skills__category-dot"
                  style={{ background: category.color }}
                  animate={{ boxShadow: [`0 0 6px ${category.color}`, `0 0 18px ${category.color}`, `0 0 6px ${category.color}`] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div>
                  <h3 className="skills__category-title">{category.title}</h3>
                  <p className="skills__category-subtitle">{category.subtitle}</p>
                </div>
              </div>

              {/* Staggered skill chips */}
              <motion.div
                className="skills__list"
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skills__item"
                    variants={chipVariants}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      boxShadow: `0 6px 20px ${category.color}33`,
                      borderColor: category.color,
                      transition: { type: 'spring', stiffness: 400, damping: 15 },
                    }}
                    style={{ '--skill-color': category.color }}
                  >
                    <motion.span
                      className="skills__item-icon"
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <span className="skills__item-name">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Soft skills ── */}
        <motion.div
          className="skills__soft"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="skills__soft-title">Soft Skills</h3>
          <motion.div
            className="skills__soft-list"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {softSkills.map((skill, i) => (
              <motion.span
                key={i}
                className="skills__soft-tag"
                variants={{
                  hidden: { opacity: 0, y: 15, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
                }}
                whileHover={{ scale: 1.07, y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
