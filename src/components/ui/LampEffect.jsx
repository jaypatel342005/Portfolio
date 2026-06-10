import { motion } from 'framer-motion';

/**
 * LampEffect — Aceternity-style lamp / cone-of-light section header.
 * Renders an illuminated cone above the section title.
 */
const LampEffect = ({ children, className = '' }) => {
  return (
    <div
      className={`lamp-container ${className}`}
      style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* Lamp beam */}
      <div className="lamp-beam-wrapper" aria-hidden="true">
        {/* Left beam */}
        <motion.div
          className="lamp-beam lamp-beam--left"
          initial={{ opacity: 0, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
        />
        {/* Right beam */}
        <motion.div
          className="lamp-beam lamp-beam--right"
          initial={{ opacity: 0, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
        />
        {/* Center glow orb */}
        <motion.div
          className="lamp-orb"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* Cone radial gradient */}
        <motion.div
          className="lamp-cone"
          initial={{ opacity: 0, width: '8rem' }}
          whileInView={{ opacity: 1, width: '16rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LampEffect;
