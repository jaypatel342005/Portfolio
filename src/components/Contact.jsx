import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiExternalLink, FiPhone, FiMapPin } from 'react-icons/fi';
import './Contact.css';

const contactLinks = [
  {
    icon: <FiMail size={24} />,
    label: 'Email',
    value: 'jaypatel97378@gmail.com',
    href: 'mailto:jaypatel97378@gmail.com',
    color: '#a855f7',
  },
  {
    icon: <FiPhone size={24} />,
    label: 'Phone',
    value: '+91 98796 34566',
    href: 'tel:+919879634566',
    color: '#10b981',
  },
  {
    icon: <FiGithub size={24} />,
    label: 'GitHub',
    value: 'jaypatel342005',
    href: 'https://github.com/jaypatel342005',
    color: '#f0f0f5',
  },
  {
    icon: <FiLinkedin size={24} />,
    label: 'LinkedIn',
    value: 'in/jaypatel345',
    href: 'https://linkedin.com/in/jaypatel345',
    color: '#0077b5',
  },
  {
    icon: <FiInstagram size={24} />,
    label: 'Instagram',
    value: 'll_jay.patel.345_ll',
    href: 'https://www.instagram.com/ll_jay.patel.345_ll/',
    color: '#e1306c',
  },
  {
    icon: <FiExternalLink size={24} />,
    label: 'Linktree',
    value: 'jay_patel_345',
    href: 'https://linktr.ee/jay_patel_345',
    color: '#43e55e',
  },
];

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            Open to AI/ML & Full-Stack opportunities. Reach out and let's discuss innovation!
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info glass-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact__info-title">Let's Build Something Great</h3>
            <p className="contact__info-text">
              I'm eager to connect with AI & Software Engineering professionals. Whether it's 
              about collaboration, opportunities, or just a conversation about the future of 
              technology — I'd love to hear from you.
            </p>

            <div className="contact__location">
              <FiMapPin size={18} />
              <span>Morbi, Gujarat, India</span>
            </div>

            <div className="contact__cta">
              <a href="mailto:jaypatel97378@gmail.com" className="btn btn-primary">
                <FiMail size={18} /> Send Email
              </a>
              <a href="/JAY PATEL Resume.pdf" target="_blank" className="btn btn-outline">
                View Resume
              </a>
            </div>
          </motion.div>

          <div className="contact__links-grid">
            {contactLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                style={{ '--link-color': link.color }}
              >
                <div className="contact__link-icon" style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div>
                  <p className="contact__link-label">{link.label}</p>
                  <p className="contact__link-value">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
