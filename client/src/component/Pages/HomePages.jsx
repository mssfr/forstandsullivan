import React, { useEffect, useState } from 'react';
import Createblog from './Createblog';
import { GetalluserBlog } from '../../services/httpService';

function HomePages() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  

  // Fetch blogs from backend based on the token in localStorage
  const fetchBlogs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in first.");
      return;
    }

    try {
      const response = await GetalluserBlog(token);
      const sortedBlogs = response.sort((a, b) => b.id - a.id);
      setBlogs(sortedBlogs);
    } catch (error) {
      setError("Failed to load blogs");
      console.error(error);
    }
  };

  // Fetch blogs once when the component is mounted
  useEffect(() => {
    fetchBlogs();
  }, []);

 

  return (
    <div className='d-flex flex-row dashboard'>
      <div class="d-flex flex-row col-md-6 col-6  justify-content-center"
        style={{ "align-content": "center", "place-items": "center" }}>
        <Createblog setBlogs={setBlogs} />
      </div>
      <div className='col-md-6 col-6 mx-6 justify-items-center align-content-center'
        style={{ "align-content": "center", "margin-top": "80px", "padding-right": "80px" }}>

        <div className="dashboard-rightside-scroll-container">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {
          blogs.length > 0 ?
            (<div className="dashboard-rightside-grid-container">
            {blogs.map((blog, index) => (
              <div key={index} className="dashboard-rightside-card">
                <h2 className="dashboard-rightside-card-title">{blog.title}</h2>
                <p className="dashboard-rightside-card-description">{blog.description}</p>
              </div>
            ))}
          </div>) : (
              <p className='noblog'>No blogs available.</p>
            )
        }
        </div>
      </div>
    </div>
  );
}

export default HomePages;
