import './Footer.css';
import { getUserInfo } from '../../utils/auth.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">Avora</h2>
        <p className="footer-tagline">Explore. Book. Travel.</p>

        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Bookings</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="https://www.linkedin.com/in/linkedhrishi/">Contact</a></li>
        </ul>

        <p className="footer-copy">© 2025 Avora. All rights reserved.</p>
      </div>
    </footer>
  );
}
