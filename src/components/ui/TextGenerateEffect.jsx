import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextGenerateEffect = ({ words, className = '', delay = 0 }) => {
  const [show, setShow] = useState(false);
  const wordArray = words.split(' ');

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className={`text-generate-wrapper ${className}`}>
      <AnimatePresence>
        {show &&
          wordArray.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
            >
              {word}
            </motion.span>
          ))}
      </AnimatePresence>
    </span>
  );
};

export default TextGenerateEffect;
