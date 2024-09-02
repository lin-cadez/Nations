import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import CostumPopup from './../CostumPopup/CostumPopup';
import './Shop.css';

function Shop() {
  const { data, updateData } = useContext(DataContext);
  const [spinning, setSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: '',
    message: '',
    imageUrl: '',
    buttonText: '',
  });
  const [spinCost, setSpinCost] = useState(data.spinCost || 5000);
  const [nextSpinTime, setNextSpinTime] = useState(data.nextSpinTime || 0);

  const rewards = [
    { name: '1000 Barrels of Oil', value: 1000 },
    { name: '1 Million Dollars', value: 1000000 },
    { name: '999 Bushels of Wheat', value: 999 },
    { name: 'Lose All Your Money', value: -data.money },
    { name: '100 Gold Bars', value: 100 },
    { name: '500 Diamonds', value: 500 },
    { name: 'Trip to the Moon', value: 500000 },
    { name: 'Lose Half Your Money', value: -data.money / 2 },
    { name: '10,000 Gallons of Water', value: 10000 },
    { name: 'Luxury Sports Car', value: 200000 },
    { name: 'Private Island', value: 1500000 },
    { name: '1000 Cows', value: 1000 },
    { name: '10 Tons of Steel', value: 20000 },
    { name: 'Lose All Your Possessions', value: -data.money * 0.75 },
    { name: '5,000 Solar Panels', value: 5000 },
    { name: 'Rare Painting', value: 300000 },
    { name: '1,000 Bitcoin', value: 30000000 },
    { name: 'Luxury Yacht', value: 5000000 },
    { name: 'Lifetime Supply of Chocolate', value: 10000 },
    { name: 'Lose 1/4 of Your Money', value: -data.money / 4 },
    { name: 'Private Jet', value: 10000000 },
    { name: '500 Acres of Land', value: 1000000 },
    { name: 'Treasure Chest of Gold', value: 500000 },
    { name: 'Luxury Mansion', value: 10000000 },
    { name: 'Lose $10,000', value: -10000 },
    { name: 'Win a Castle', value: 2000000 },
    { name: 'Set of Luxury Watches', value: 250000 },
    { name: '20,000 Shares of Stock', value: 200000 },
    { name: 'Antique Collection', value: 150000 },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.max(nextSpinTime - now, 0);

      setRemainingTime(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextSpinTime]);

  const handleSpin = () => {
    const now = Date.now();
    const minCooldown = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const maxCooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (now < nextSpinTime) {
      const remainingTime = Math.ceil((nextSpinTime - now) / 1000);
      setPopupContent({
        title: 'Cooldown',
        message: `Please wait ${remainingTime} seconds before spinning again.`,
        buttonText: 'OK',
        imageUrl: '/icons/uk_default.png',
      });
      setPopupOpen(true);
      return;
    }

    if (data.money < spinCost) {
      setPopupContent({
        title: 'Insufficient Funds',
        message: "You don't have enough money to spin the wheel.",
        buttonText: 'OK',
        imageUrl: '/icons/uk_default.png',
      });
      setPopupOpen(true);
      return;
    }

    updateData({ money: data.money - spinCost }); // Deduct the spin cost

    // Start the gradient animation
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[randomIndex];

    // Display the animation for 3 seconds and then show the reward
    setTimeout(() => {
      setWheelResult(selectedReward.name);
      setSpinning(false);
      updateData({ money: data.money + selectedReward.value });

      setPopupContent({
        title: 'Congratulations!',
        message: selectedReward.value >= 0 
          ? `You won ${selectedReward.name}! Your balance is now $${data.money + selectedReward.value}.`
          : `Bad luck! You ${selectedReward.name}. Your balance is now $${data.money + selectedReward.value}.`,
        buttonText: 'OK',
        imageUrl: selectedReward.value >= 0 ? '/icons/usa_default.png' : '/icons/uk_default.png',
      });
      setPopupOpen(true);
    }, 3000); // Total display time is 3 seconds

    // Calculate the new spin cost
    setSpinCost(prevCost => {
      const newCost = Math.min(prevCost * 2, 50000000); // Cap cost at $50,000,000
      updateData({ spinCost: newCost });
      return newCost;
    });

    // Calculate the next spin time
    const newCooldown = Math.min(minCooldown * 2, maxCooldown); // Increment cooldown or cap at maxCooldown
    const newNextSpinTime = now + newCooldown; // Apply new cooldown

    updateData({
      nextSpinTime: newNextSpinTime,
    });
    setNextSpinTime(newNextSpinTime);
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [remainingTime, setRemainingTime] = useState(Math.max(nextSpinTime - Date.now(), 0));
  const handleHome = () => {
    return () => {
      window.location.href = '/';
    };

  }

  return (
    <div className="wheel-container">
      <button className='home-button' onClick={handleHome()}>HOME</button>
      
      <h2>GET Your Mystery Gift</h2>
      <div className={`wheel ${spinning ? 'animate-gradient' : ''}`}>
        {/* Static gradient changes to animated gradient when spinning */}
      </div>
      <button onClick={handleSpin} className="spin-button" disabled={spinning}>
        Click here (${spinCost})
      </button>
      <div className="timer-label">
      
      
        {remainingTime > 0 ? `Next spin in: ${formatTime(remainingTime)}` : 'You can spin now!'}

        
          </div>

      <CostumPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupContent.title}
        message={popupContent.message}
        buttonText={popupContent.buttonText}
        imageUrl={popupContent.imageUrl}
      />
    </div>
  );
}

export default Shop;
