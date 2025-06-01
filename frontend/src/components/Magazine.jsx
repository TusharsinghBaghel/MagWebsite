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
import { BASE_URL } from "../store.js";
const CACHE_EXPIRATION_TIME = 10* 24* 60 * 60 * 1000;

const Magazine = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    AOS.init();

    const fetchMagazines = async () => {
      try {
        const cachedData = localStorage.getItem("magazines");
        const cacheTimestamp = localStorage.getItem("magazinesTimestamp");
        
        
        // Check if cached data exists and is still valid
        if (cachedData && cacheTimestamp) {
          const currentTime = Date.now();
          if (currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
            console.log("Cache hit: Using cached magazine data.");
            setMagazines(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data from the server
        const response = await axios.get(`${BASE_URL}/magazine/get`);
        setMagazines(response.data);

        // Save data and timestamp to localStorage
        localStorage.setItem("magazines", JSON.stringify(response.data));
        localStorage.setItem("magazinesTimestamp", Date.now().toString());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching magazine data:", error);
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <section id="magazine" className="magazine section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Magazine</h2>
        <p>Insight Magazine</p>
      </div>

      {loading ? (
        <div className="loader-container">
          <l-grid size="90" speed="1" color="white"></l-grid>
        </div>
      ) : (
        <div className="container">
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={1000}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            slidesPerView={3}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="init-swiper"
            data-aos="fade-up"
            data-aos-delay="100"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 30 },
            }}
          >
            {magazines.map((magazine) => (
              <SwiperSlide key={magazine.edition}>
                <a href={magazine.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`data:image/jpeg;base64,${magazine.image}`}
                    className="magazine-img"
                    alt="Magazine Cover"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default Magazine;
