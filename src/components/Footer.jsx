import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube, FaTwitch } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">eSports<span>HUB</span></div>
        
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/community">Community</Link>
          <Link to="/privacy">Privacy</Link>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer"><FaTwitch /></a>
        </div>
      </div>

      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} eSportsHUB. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;