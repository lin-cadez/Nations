import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from '../../DataContext'; // Adjust the import path as needed
import navbarConfig from '../../navbarConfig'; // Import the navbar configuration
import './Footer.css'; // Import CSS for Footer styling

function Footer() {
  const { data } = useContext(DataContext); // Access the context data
  const location = useLocation(); // Get the current route

  // Function to determine if the footer should be displayed
  const shouldDisplayFooter = () => {
    const isShopPage = location.pathname === '/shop';
    const hasSufficientLevel = data.level >= Math.min(...Object.values(navbarConfig));
    return !isShopPage && hasSufficientLevel;
  };

  // Determine if the footer should be displayed
  if (!shouldDisplayFooter()) {
    return null; // Do not render the Footer if the conditions are not met
  }

  // Function to determine if a footer item should be displayed based on level
  const shouldDisplayItem = (itemLevel) => data.level >= itemLevel;

  return (
    <nav className="footer">
      <ul>
      
        
        {shouldDisplayItem(navbarConfig.oil) && (
          <li><Link to="/oil"><img className='footer-icon' src='icons/oil.png' alt='Oil' /></Link></li>
        )}
        <li><Link to="/"><img className='footer-icon' src='icons/home.png' alt='Home' /></Link></li>
        {shouldDisplayItem(navbarConfig.farm) && (
          <li><Link to="/farm"><img className='footer-icon' src='icons/farm.png' alt='Farm' /></Link></li>
        )}
      
      </ul>
    </nav>
  );
}

export default Footer;
