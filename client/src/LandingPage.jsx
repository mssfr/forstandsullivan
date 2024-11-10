import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetallBlog } from './services/httpService';

function LandingPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetallBlog();
        setError('');
        const sortedBlogs = response.sort((a, b) => b.id - a.id); // Sort blogs by descending order of id
        setBlogs(sortedBlogs);
      } catch (error) {
        setError('Failed to load blogs');
      }
    };

    fetchData();
  }, []);

  // Handle Previous button click

  // Autoplay functionality - transition to next blog every 3 seconds


  return (
    <div style={styles.container}>
      <h1>Welcome to ModernApp</h1>
      <p>Your one-stop solution for modern app experiences.</p>
      <div style={styles.buttons}>
        <Link to="/login" style={styles.button} className='links'>Login</Link>
        <Link to="/register" style={styles.button} className='links'>Register</Link>
      </div>

      <div className="scroll-container">
        {
          blogs.length > 0 ?
            (<div className="grid-container">
              {blogs.map((blog, index) => (
                <div key={index} className="card">
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="card-description">{blog.description}</p>
                </div>
              ))}
            </div>) : (<>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <p className='noblog'>No blogs available.</p></>
            )
        }

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '88vh', // Full viewport height
    
    background: 'radial-gradient(circle, rgba(200,198,127,1) 0%, rgba(111,167,209,1) 5%, rgba(98,189,190,1) 9%, rgba(146,200,147,1) 14%, rgba(204,170,211,1) 20%, rgba(242,163,219,1) 28%, rgba(146,190,238,1) 38%, rgba(135,204,240,1) 49%, rgba(131,165,241,1) 58%, rgba(212,174,195,1) 66%, rgba(152,184,223,1) 76%, rgba(68,173,245,1) 91%, rgba(45,171,253,0.9724264705882353) 95%)',
    textAlign: 'center',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "rgb(237 173 208)",
    color: "#000000c9",
    textDecoration: "none",
    borderRadius: '5px',
    fontSize: "16px",
    hover: {
      color: "red",
    }
  },


};

export default LandingPage;
