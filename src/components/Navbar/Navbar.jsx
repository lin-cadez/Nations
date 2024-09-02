import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { DataContext } from '../../DataContext'; // Adjust the import path as needed
import './Navbar.css'; // Import CSS for Navbar styling

function Navbar() {
  const { data } = useContext(DataContext); // Access the context data
  const location = useLocation(); // Get the current path
  
  const renderResourceDisplay = () => {
    if (location.pathname === '/oil') {
      return (
        <div className="money-display">
          <span>{data.barrels || 0} </span>
          <img className='money-icon inverted' src='icons/oil.svg' alt='Oil' />
        </div>
      );
    } else if (location.pathname === '/farm') {
      return (
        <div className="money-display">
          <span>{data.wheat || 0} </span>
          <img className='money-icon inverted' src='icons/wheat_icon.svg' alt='wheat' />
        </div>
      );
    }
    else {
      return (
        <div className="money-display">
          <span>{data.money}</span>
          <img className='money-icon inverted' src='icons/coin.svg' alt='Money' />
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="level-display">
            <span>Level {data.level}</span>
          </div>
        </li>

        <li>
          {renderResourceDisplay()}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
