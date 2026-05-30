import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiExternalLink, FiPhone, FiMapPin } from 'react-icons/fi';
import './Contact.css';

const contactLinks = [
  { icon: <FiMail size={22} />, label: 'Email', value: 'jaypatel97378@gmail.com', href: 'mailto:jaypatel97378@gmail.com', color: '#a855f7' },
  { icon: <FiPhone size={22} />, label: 'Phone', value: '+91 98796 34566', href: 'tel:+919879634566', color: '#10b981' },
  { icon: <FiGithub size={22} />, label: 'GitHub', value: 'jaypatel342005', href: 'https://github.com/jaypatel342005', color: '#f0f0f5' },
  { icon: <FiLinkedin size={22} />, label: 'LinkedIn', value: 'in/jaypatel345', href: 'https://linkedin.com/in/jaypatel345', color: '#0077b5' },
  { icon: <FiInstagram size={22} />, label: 'Instagram', value: 'll_jay.patel.345_ll', href: 'https://www.instagram.com/ll_jay.patel.345_ll/', color: '#e1306c' },
  { icon: <FiExternalLink size={22} />, label: 'Linktree', value: 'jay_patel_345', href: 'https://linktr.ee/jay_patel_345', color: '#43e55e' },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const linkCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.93 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            Open to AI/ML & Full-Stack opportunities. Reach out and let's discuss innovation!
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* ── Info card ── */}
          <motion.div
            className="contact__info glass-card"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="contact__info-title">Let's Build Something Great</h3>
            <p className="contact__info-text">
              I'm eager to connect with AI & Software Engineering professionals. Whether it's
              about collaboration, opportunities, or just a conversation about the future of
              technology — I'd love to hear from you.
            </p>

            <motion.div
              className="contact__location"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FiMapPin size={18} />
              <span>Morbi, Gujarat, India</span>
            </motion.div>

            <div className="contact__cta">
              <motion.a
                href="mailto:jaypatel97378@gmail.com"
                className="btn btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiMail size={17} /> Send Email
              </motion.a>
              <motion.a
                href="/jay-patel-resume.pdf"
                target="_blank"
                className="btn btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                View Resume
              </motion.a>
            </div>
          </motion.div>

          {/* ── Link cards ── */}
          <motion.div
            className="contact__links-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link-card glass-card"
                variants={linkCardVariants}
                whileHover={{
                  y: -5,
                  borderColor: link.color,
                  boxShadow: `0 12px 40px ${link.color}30`,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.96 }}
                style={{ '--link-color': link.color }}
              >
                <motion.div
                  className="contact__link-icon"
                  style={{ color: link.color }}
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {link.icon}
                </motion.div>
                <div>
                  <p className="contact__link-label">{link.label}</p>
                  <p className="contact__link-value">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
