import React, { useContext } from 'react';
import { DataContext } from '../../DataContext'; // Import the context
import './Home.css'; // Import the CSS file for styling
import levels from '../../levels'; // Import the levels object

  
function Home() {
  const { data, updateData } = useContext(DataContext);

  const handleBallClick = () => {
    updateData({ money: data.money + 1 });
  };

  const handleUpgrade = () => {
    if (data.money >= levels[data.level].upgradeCost) {
      updateData({
        money: data.money - levels[data.level].upgradeCost,
        level: data.level + 1,
      });
    }
  };

  const buttonClass = data.money >= levels[(data.level)].upgradeCost ? 'enabled' : 'disabled';

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>Money: ${data.money}</p>
      <p>Level: {data.level}</p>
        <p>{levels[(data.level)-1].label}</p>
        <img className="ball" onClick={handleBallClick} src={levels[(data.level)-1].imageUrl} alt="Ball" />
      <button
        className={buttonClass}
        onClick={handleUpgrade}
        disabled={data.money < levels[(data.level)].upgradeCost}
      >
        Upgrade Ball - Cost: ${levels[(data.level)].upgradeCost}
      </button>
    </div>
  );
}

export default Home;
