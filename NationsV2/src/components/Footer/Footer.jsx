import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext'; // Adjust the import path as needed
import navbarConfig from '../../navbarConfig'; // Import the navbar configuration
import './Footer.css'; // Import CSS for Navbar styling

function Footer() {
  const { data } = useContext(DataContext); // Access the context data
  const shouldDisplayItem = (itemLevel) => data.level >= itemLevel;

  return (
    <nav className="footer">
      <ul>

      {shouldDisplayItem(navbarConfig.oil) && <li><Link to="/oil"><img className='footer-icon' src='icons/oil.png' alt='Oil' /></Link></li>}
      <li><Link to="/"><img className='footer-icon' src='icons/home.png' alt='Home' /></Link></li>
        
        {shouldDisplayItem(navbarConfig.farm) && <li><Link to="/farm"><img className='footer-icon' src='icons/farm.png' alt='Farm' /></Link></li>}
    
      </ul>
      
      
    </nav>
  );
}

export default Footer;
