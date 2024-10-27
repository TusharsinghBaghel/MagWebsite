import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/navbar.css";

const BlogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('*');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/blogs/get')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredBlogs = selectedFilter === '*'
    ? blogs
    : blogs.filter(blog => Array.isArray(blog.category)
      ? blog.category.includes(selectedFilter)
      : blog.category === selectedFilter
    );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="blog" className="blog section">
      <div className="container section-title" data-aos="fade-up">
        <h2>All Blogs</h2>
        <p>Explore all blogs from VNIT</p>
      </div>
      <div className="container isotope-layout">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul className="blog-filters isotope-filters">
              <li onClick={() => handleFilterClick('*')}
                  className={selectedFilter === '*' ? "active-filter" : ""}>All</li>
              <li onClick={() => handleFilterClick('College Life')}
                  className={selectedFilter === 'College Life' ? "active-filter" : ""}>College Life</li>
              <li onClick={() => handleFilterClick('Intern Diaries')}
                  className={selectedFilter === 'Intern Diaries' ? "active-filter" : ""}>Intern Diaries</li>
              <li onClick={() => handleFilterClick('Research')}
                  className={selectedFilter === 'Research' ? "active-filter" : ""}>Research</li>
            </ul>
          </div>
        </div>
        <div className="row isotope-container" data-aos="fade-up" data-aos-delay="200">
          {filteredBlogs.map((blog, index) => (
            <div key={index} className="col-md-4 col-sm-6 d-flex justify-content-center">
              <div className="card bg-dark text-light mb-4" style={{ width: '18rem', borderRadius: '10px' }}>
                <img
                  src={`data:image/png;base64,${blog.image}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body" style={{ padding: '0.5rem' }}>
                  <h5 className="card-title" style={{ fontSize: '1rem' }}>{blog.title}</h5>
                  <p className="card-text" style={{ fontSize: '0.875rem' }}>
                    {blog.content.slice(0, 60)}...
                  </p>
                  <span style={{ fontSize: '0.8rem' }}>Author: {blog.author}</span>
                  <p className="card-text" style={{ fontSize: '0.8rem' }}>
                    <small>Date: {new Date(blog.date).toLocaleDateString()}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
