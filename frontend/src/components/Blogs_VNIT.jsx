import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/navbar.css";
import "../css/blog.css";
import { BASE_URL } from "../store.js";

const BlogSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("*");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    // Load the loader script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/ldrs/dist/auto/grid.js";
    document.body.appendChild(script);

    // Fetch blog data
    axios
      .get(`${BASE_URL}/blogs/get`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });

    // Clean up the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog for modal display
    document.body.classList.add("blog-blur-background"); // Add background blur
  };

  const closeModal = () => {
    setSelectedBlog(null); // Close the modal
    document.body.classList.remove("blog-blur-background"); // Remove background blur
  };

  const filteredBlogs =
    selectedFilter === "*"
      ? blogs
      : blogs.filter((item) =>
          Array.isArray(item.category)
            ? item.category.includes(selectedFilter)
            : item.category === selectedFilter
        );

  const displayedBlogs = filteredBlogs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <section id="blog" className="blog section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Blog</h2>
        <p>Blogs of VNIT</p>
      </div>

      {loading ? (
        <div className="loader-container">
          {/* Add the loader */}
          <l-grid size="90" speed="1" color="white"></l-grid>
        </div>
      ) : (
        <div className="container isotope-layout">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul className="blog-filters isotope-filters">
                <li
                  onClick={() => handleFilterClick("*")}
                  className={selectedFilter === "*" ? "active-filter" : ""}
                >
                  All
                </li>
                <li
                  onClick={() => handleFilterClick("College Life")}
                  className={
                    selectedFilter === "College Life" ? "active-filter" : ""
                  }
                >
                  College Life
                </li>
                <li
                  onClick={() => handleFilterClick("Intern Diaries")}
                  className={
                    selectedFilter === "Intern Diaries" ? "active-filter" : ""
                  }
                >
                  Intern Diaries
                </li>
                <li
                  onClick={() => handleFilterClick("Research")}
                  className={
                    selectedFilter === "Research" ? "active-filter" : ""
                  }
                >
                  Research
                </li>
              </ul>
            </div>
          </div>
          <div
            className="row isotope-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {displayedBlogs.map((blog, index) => (
              <div
                key={index}
                className="col-md-4 col-sm-6 d-flex justify-content-center"
              >
                <div
                  className="card bg-dark text-light mb-4"
                  style={{
                    width: "18rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleBlogClick(blog)} // Open modal on click
                >
                  <img
                    src={`data:image/png;base64,${blog.image}`}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div
                    className="card-body"
                    style={{ backgroundColor: "black", padding: "0.5rem" }}
                  >
                    <h5
                      className="card-title"
                      style={{ color: "#cca45e", fontSize: "1rem" }}
                    >
                      {blog.title}
                    </h5>
                    <p className="card-text" style={{ fontSize: "0.875rem" }}>
                      {blog.content.slice(0, 60)}...
                    </p>
                    <span style={{ fontSize: "0.8rem" }}>
                      Author: {blog.author}
                    </span>
                    <p className="card-text" style={{ fontSize: "0.8rem" }}>
                      <small>
                        Date: {new Date(blog.date).toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center mt-4">
            <button
              className="btn btn-primary btn-golden"
              onClick={() => navigate("/blogs")}
              style={{ width: "400px" }}
            >
              Explore More
            </button>{" "}
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="blog-modal" onClick={closeModal}>
          <div
            className="blog-modal-content"
            style={{ backgroundColor: "black" }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner content click
          >
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h2 className="blog-modal-title">{selectedBlog.title}</h2>
            <p className="blog-modal-author">Author: {selectedBlog.author}</p>
            <small className="blog-modal-date">
              Date: {new Date(selectedBlog.date).toLocaleDateString()}
            </small>
            <img
              src={`data:image/png;base64,${selectedBlog.image}`}
              alt={selectedBlog.title}
              className="blog-modal-image"
            />
            <p className="blog-modal-text">{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
