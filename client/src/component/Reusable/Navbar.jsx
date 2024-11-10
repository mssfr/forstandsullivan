import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'

function Navbar({ loggedIn ,onLogout }) {
  const navigate = useNavigate();
  
  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#282c34',
      color: 'white',
      flexWrap: 'wrap', // Allows wrapping on smaller screens
    },
    brand: {
      fontSize: '24px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '8px',
    },
    links: {
      display: 'flex',
      
      gap: '20px',
      padding: '10px',
      '@media (max-width: 600px)': { // Media query for small screens
        flexDirection: 'column', // Stack links vertically
        gap: '10px',
      },
      
    },logout: {
      display: 'flex',
      
      gap: '20px',
      padding: '1px',
      '@media (max-width: 600px)': { // Media query for small screens
        flexDirection: 'column', // Stack links vertically
        gap: '10px',
      },
      
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
    },
    app: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '20px',
    },
    button: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      '@media (max-width: 600px)': { // Media query for small screens
        fontSize: '16px',
      },
    },
  };
  const handleLogoutClick = () => {
    onLogout(); // Calls handleLogout from App
    navigate('/login'); // Redirect to login page
};

  return (
    <div class="">
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <span style={styles.icon}>🚀</span> <Link to="/" style={styles.app}>ModernApp</Link>
        </div>
        {!loggedIn ? <div style={styles.links}>
          <Link to="/login" style={styles.link} className='navlinks'>Login</Link>
          <Link to="/register" style={styles.link} className='navlinks'>Register</Link>
        </div> :
          <div style={styles.logout}>
            <button onClick={handleLogoutClick}  style={styles.button }className='navlogout'>Logout</button>
          </div>} 
      </nav>
    </div>
  )
}

export default Navbar