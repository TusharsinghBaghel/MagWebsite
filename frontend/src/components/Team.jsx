import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamMembers = [
  {
    name: 'Walter White',
    role: 'Master Chef',
    imgSrc: 'assets/img/chefs/chefs-3.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  },
  {
    name: 'Sarah Jhonson',
    role: 'Patissier',
    imgSrc: 'assets/img/chefs/chefs-1.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  },
  {
    name: 'William Anderson',
    role: 'Cook',
    imgSrc: 'assets/img/chefs/chefs-2.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  }
];

function Team() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="team" className="team section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>Necessitatibus eius consequatur</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={index}>
              <div className="member">
                <img src={member.imgSrc} className="img-fluid" alt={member.name} />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                  </div>
                  <div className="social">
                    <a href={member.socialLinks.twitter}><i className="bi bi-twitter"></i></a>
                    <a href={member.socialLinks.facebook}><i className="bi bi-facebook"></i></a>
                    <a href={member.socialLinks.instagram}><i className="bi bi-instagram"></i></a>
                    <a href={member.socialLinks.linkedin}><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
