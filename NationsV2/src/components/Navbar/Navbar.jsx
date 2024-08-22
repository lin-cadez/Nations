import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataContext'; // Adjust the import path as needed
import navbarConfig from '../../navbarConfig'; // Import the navbar configuration
import './Navbar.css'; // Import CSS for Navbar styling

function Navbar() {
  const { data } = useContext(DataContext); // Access the context data
  const shouldDisplayItem = (itemLevel) => data.level >= itemLevel;

  return (
    <nav className="navbar">
      <ul>

      <li>
          <div className="level-display">
            <span>Level {data.level}</span>
          </div>
        </li>
        
        <li>
          <div className="money-display">
          <span>{data.money}</span>
            <img className='money-icon inverted' src='icons/coin.svg' alt='Money' />
            
          </div>
        </li>
      </ul>
      <br />  
      <ul>

        
      <li><Link to="/"><img className='svg-icon' src='icons/home.svg' alt='Home' /></Link></li>
        {shouldDisplayItem(navbarConfig.oil) && <li><Link to="/oil"><img className='svg-icon' src='icons/oil.svg' alt='Oil' /></Link></li>}
        {shouldDisplayItem(navbarConfig.farm) && <li><Link to="/farm"><img className='svg-icon' src='icons/truck.svg' alt='Farm' /></Link></li>}
    
      </ul>
      
    </nav>
  );
}

export default Navbar;
