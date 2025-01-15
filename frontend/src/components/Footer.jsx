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

    setTimeout(() => {
      setLoading(false);
      setSentMessage('Your subscription request has been sent. Thank you!');
    }, 2000);
  };

  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">MAG.com</span>
            </a>
            <div className="footer-contact pt-3">
              <p>MAG का अड्डा </p>
              <p>VNIT, Nagpur</p>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <div className="social-links d-flex mt-4">
              <a href="https://www.instagram.com/mag.com_vnit/?hl=en"><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/company/mag-com/posts/?feedView=all"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Dev Credits Section */}
      <div className="dev-credits text-end" style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '14px', color: '#888' }}>
        <p>
          <span>Developed by:</span>
          <a href="https://github.com/developer1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#888', marginLeft: '5px' }}>Developer 1</a>,
          <a href="https://github.com/developer2" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#888', marginLeft: '5px' }}>Developer 2</a>,
          <a href="https://github.com/developer3" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#888', marginLeft: '5px' }}>Developer 3</a>,
          <a href="https://github.com/developer4" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#888', marginLeft: '5px' }}>Developer 4</a>
        </p>
      </div>

      <div className="container text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename">MAG.com</strong> <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
