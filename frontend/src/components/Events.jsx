import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BASE_URL } from "../store.js";

const DB_NAME = "AppCacheDB";
const DB_VERSION = 1;
const EVENTS_STORE = "events";
const CACHE_EXPIRATION_TIME = 10 * 24 * 60 * 60 * 1000; // 10 days
const SIZE_WARNING_THRESHOLD = 35 * 1024 * 1024; // 35 MB in bytes

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    const openDB = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Create object store for events if it doesn't exist
          if (!db.objectStoreNames.contains(EVENTS_STORE)) {
            db.createObjectStore(EVENTS_STORE, { keyPath: "key" });
          }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    };

    const fetchEvents = async (db) => {
      try {
        const transaction = db.transaction(EVENTS_STORE, "readonly");
        const store = transaction.objectStore(EVENTS_STORE);

        // Fetch cached data
        const request = store.get("events");
        const cachedData = await new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });

        if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
          console.log("Using idb cached events data");
          setEvents(cachedData.data);
          setLoading(false);
          return;
        }

        console.log("Fetching new events data from API");
        const response = await axios.get(`${BASE_URL}/events/get`);
        const formattedEvents = response.data.map((event) => ({
          ...event,
          date: event.date.slice(0, 10), // Format the date
        }));

        setEvents(formattedEvents);
        setLoading(false);

        // Cache the new data
        const writeTransaction = db.transaction(EVENTS_STORE, "readwrite");
        const writeStore = writeTransaction.objectStore(EVENTS_STORE);

        writeStore.put({
          key: "events",
          data: formattedEvents,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    const checkDBSize = async (db) => {
      const transaction = db.transaction(EVENTS_STORE, "readonly");
      const store = transaction.objectStore(EVENTS_STORE);
      const request = store.getAll();

      const size = await new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const totalSize = JSON.stringify(request.result).length;
          resolve(totalSize);
        };
        request.onerror = () => reject(request.error);
      });
      console.log("IndexedDB size:", size / 1024 / 1024, "MB");

      if (size > SIZE_WARNING_THRESHOLD) {
        console.warn("Warning: IndexedDB size is exceeding 35 MB!");
      }
    };

    const initialize = async () => {
      try {
        const db = await openDB();
        await fetchEvents(db);
        await checkDBSize(db);
      } catch (error) {
        console.error("Error initializing IndexedDB:", error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <section id="events" className="events section">
      <img
        className="slider-bg"
        src="assets/img/events-bg.jpg"
        alt=""
        data-aos="fade-in"
        style={{ opacity: 0.6, height: "100%", width: "100%" }}
      />

      <div className="container section-title" data-aos="fade-up">
        <h2>Events</h2>
        <p>Events at VNIT</p>
      </div>

      <div className="container">
        {loading ? (
          <div className="loader-container">
            <l-grid size="90" speed="1" color="goldenrod"></l-grid>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={1000}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            className="init-swiper"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="row gy-4 event-item">
                  <div className="col-lg-6">
                    <img
                      src={`data:image/jpeg;base64,${event.image}`}
                      className="img-fluid"
                      alt={event.title}
                    />
                  </div>
                  <div className="col-lg-6 pt-4 pt-lg-0 content">
                    <h3>{event.title}</h3>
                    <div className="price">
                      <p>
                        <span>{event.date || "N/A"}</span>
                      </p>
                    </div>
                    <p className="fst-italic">{event.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Events;
