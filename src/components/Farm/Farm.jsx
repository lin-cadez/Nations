import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import commodities from './../../commodities'; // Import the commodities data
import './Farm.css';
import CostumPopup from '../CostumPopup/CostumPopup';

function Farm() {
  const { data, updateData } = useContext(DataContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [producedWheat, setProducedWheat] = useState(0);
  const [totalWheat, setTotalWheat] = useState(data.wheat || 0);
  const [timer, setTimer] = useState(60.0);

  const filteredObjects = commodities.filter(object => object.tab === 'farm');

  const handleBuy = (object) => {
    if (data.money >= object.cost) {
      const updatedData = {
        money: data.money - object.cost,
        [object.name]: (data[object.name] || 0) + 1
      };
      updateData(updatedData);
    }
  };

  const totalProduction = () => {
    return filteredObjects.reduce((total, object) => {
      return total + (data[object.name] || 0) * object.production;
    }, 0);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleSellAllWheat = () => {
    const totalMoneyEarned = (data.wheat || 0) * 100;
    updateData({
      money: data.money + totalMoneyEarned,
      wheat: 0, // Reset wheat to 0 after selling
    });
  };

  useEffect(() => {
    if (data.lastActivity < (Date.now() / 1000 - 15)) {
      const now = Date.now();
      const lastUpdate = data.FarmLastUpdate || now;
      const elapsedTime = (now - lastUpdate) / 60000; // Convert ms to minutes
      const productionRate = totalProduction();
      const producedWheat = Math.floor(elapsedTime * productionRate);

      if (elapsedTime >= 1) {
        setProducedWheat(producedWheat || 0);
        setTotalWheat(prevWheat => prevWheat + producedWheat);
        updateData({
          wheat: (data.wheat || 0) + producedWheat,
          FarmLastUpdate: now,
        });
        setPopupVisible(true);
      }
    }
  }, [data, updateData]);

  const fertilizerTimerAccel = () => {
    const fertilizers = data.Fertilizer || 0;
    const accel = fertilizers * 0.001;
    let out = 60 - accel;
    if (out < 0.6) {
      out = 0.6;
    }
    return out;
  };

  useEffect(() => {
    const now = Date.now();
    let lastUpdate = data.FarmLastUpdate || now;

    const updateFarm = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - lastUpdate) / 1000; // Convert ms to seconds

      setTimer(fertilizerTimerAccel() - elapsedTime);
      const productionRate = totalProduction();
      const producedWheat = Math.floor(elapsedTime * productionRate);

      if (elapsedTime >= fertilizerTimerAccel()) {
        updateData({
          wheat: (data.wheat || 0) + producedWheat,
          FarmLastUpdate: currentTime,
        });
        lastUpdate = currentTime;
      }
    };

    // Run the updateFarm every 100ms to keep everything in sync
    const interval = setInterval(updateFarm, 50);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [data, updateData]);

  return (
    <div>
      <CostumPopup
        isOpen={popupVisible}
        onClose={handlePopupClose}
        title="Harvest Report"
        message="Your farm has produced wheat while you were away."
        buttonText="CLAIM"
        wheatProduced={producedWheat}
      />

      <div className="farm-container">
        <div className="timer-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(fertilizerTimerAccel() - timer) / fertilizerTimerAccel() * 100}%` }}
            >
            </div>
          </div>
        </div>

        <button className="sell-button" onClick={handleSellAllWheat}>
          Sell all wheat for ${Math.floor((data.wheat || 0) * 100)}
        </button>

        <div className="object-list">
          {filteredObjects.map((object) => (
            <div key={object.name} className="object-item">
              <div className="object-details">
                <h2>{object.name}</h2>
                <p>Owned: {data[object.name] || 0}</p>
                <p>Cost: ${object.cost}</p>
                <p>
                  {object.message ? object.message : `Production: ${object.production} wheat/min`}
                </p>
              </div>
              <div className="object-action">
                <button
                  onClick={() => handleBuy(object)}
                  disabled={data.money < object.cost}
                  style={{
                    backgroundColor: data.money >= object.cost ? 'black' : 'red',
                  }}
                >
                  Buy
                  <div className="inverted object-icon">
                    <img src={object.icon} alt={object.name} />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Farm;
