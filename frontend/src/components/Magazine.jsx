// Magazine.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "../css/magazine.css";

const Magazine = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchMagazines = async () => {
      try {
        const response = await axios.get("http://localhost:4000/magazine/get");
        setMagazines(response.data);
      } catch (error) {
        console.error("Error fetching magazine data:", error);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <section id="magazine" className="magazine section">
      <div className="container section-title" data-aos="fade-up">
        <h2>magazine</h2>
        <p>Insight Magazine</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {magazines.map((magazine) => (
            <SwiperSlide key={magazine.id}>
              <div className="magazine-item">
                <p>
                  <span>{magazine.edition}</span> <br />
                  <small>{new Date(magazine.date).toLocaleDateString()}</small>
                </p>
                <a
                  href={magazine.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`data:image/jpeg;base64,${magazine.image}`}
                    className="magazine-img"
                    alt={magazine.edition}
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Magazine;
