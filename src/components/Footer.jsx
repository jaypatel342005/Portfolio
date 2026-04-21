import { FiGithub, FiLinkedin, FiInstagram, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <a href="#" className="footer__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span className="footer__logo-bracket">&lt;</span>
              <span className="footer__logo-name">Jay</span>
              <span className="footer__logo-dot">/</span>
              <span className="footer__logo-bracket">&gt;</span>
            </a>
            <p className="footer__tagline">
              Building intelligent solutions, one line at a time.
            </p>
          </div>

          <div className="footer__socials">
            <a href="https://github.com/jaypatel342005" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/jaypatel345" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/ll_jay.patel.345_ll/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            Made with <FiHeart size={14} className="footer__heart" /> by Jay Patel
          </p>
          <p className="footer__copyright">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
