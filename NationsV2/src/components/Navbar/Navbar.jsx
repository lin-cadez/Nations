import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext'; // Import the context
import './Navbar.css'; // Import CSS for Navbar styling

function Navbar() {
  const { data } = useContext(DataContext); // Access the context data

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {data.level >= 2 && <li><Link to="/oil">Oil</Link></li>}
        <li><button onClick={() => {
          localStorage.removeItem('username'); // Log out by clearing localStorage
          window.location.reload(); // Reload to trigger route change
        }}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
