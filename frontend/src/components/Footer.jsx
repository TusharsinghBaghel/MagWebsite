import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSentMessage('');

    // Simulate form submission delay
    setTimeout(() => {
      setLoading(false);
      setSentMessage('Your subscription request has been sent. Thank you!');
    }, 2000);
  };

  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* Company Info Section */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">MAG.com</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+1 5589 55488 55</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@example.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Our Services Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Product Management</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Graphic Design</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form onSubmit={handleNewsletterSubmit} className="php-email-form">
              {/* <div className="newsletter-form">
                <input type="email" name="email" required placeholder="Your email" />
                <input type="submit" value="Subscribe" disabled={loading} />
              </div> */}
              {loading && <div className="loading">Loading...</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {sentMessage && <div className="sent-message">{sentMessage}</div>}
            </form>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="container text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename">MAG.com</strong> <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
