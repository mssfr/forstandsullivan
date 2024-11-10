import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';
import Navbar from './component/Reusable/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import HomePages from './component/Pages/HomePages';
import { useEffect, useState } from 'react';
import PrivateRoute, { NotFound } from './component/PrivateRoute';
function App() { 
  const [loggedIn,setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
}, []);

const handleLogin = (token) => {
    localStorage.setItem('token', token); 
    setLoggedIn(true); 
}

const handleLogout = () => {
    localStorage.removeItem('token'); 
    setLoggedIn(false); 
};
console.log("loggedIn",loggedIn)
  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />        
          <Route 
            path="/dashboard" 
            element={<PrivateRoute element={HomePages} />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
