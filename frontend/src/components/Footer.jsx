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
    <footer id="footer" className="footer" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename" style={{ color: '#FFD700' }}>MAG.com</span>
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
          {/* Dev Credits Section */}
          <div className="dev-credits text-center py-3 col-lg-6 col-md-6" style={{ fontSize: '14px', color: '#FFD700', marginTop: '20px' }}>
            <h5 style={{ color: '#FFD700', fontSize: '18px', fontWeight: '600' }}>Developed By:</h5>
            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '5px' }}>
                <a href="https://www.linkedin.com/in/soham-anwane-0a46842aa/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'grey', fontSize: '16px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.color = 'grey'}>
                  Soham Anwane
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="https://in.linkedin.com/in/tusharsingh-baghel" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'grey', fontSize: '16px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.color = 'grey'}>
                  Tusharsingh Baghel
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="https://www.linkedin.com/in/ansh-dalal-69836a6a/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'grey', fontSize: '16px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.color = 'grey'}>
                  Ansh Dalal
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="https://github.com/developer4" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'grey', fontSize: '16px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.color = 'grey'}>
                  Vinit More
                </a>
              </li>
            </ul>
          </div>

        </div>
        
      </div>

      

      <div className="container text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename" style={{ color: '#FFD700' }}>MAG.com</strong> <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
