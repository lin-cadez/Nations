import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import commodities from './../../commodities'; // Import the commodities data
import './Oil.css';
import CostumPopup from '../CostumPopup/CostumPopup';

function Oil() {
  const { data, updateData } = useContext(DataContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [producedBarrels, setProducedBarrels] = useState(0);
  const [oilPrice, setOilPrice] = useState(1.2);

  const filteredObjects = commodities.filter(object => object.tab === 'oil');

  const handleBuy = (object) => {
    if (data.money >= object.cost) {
      updateData({
        money: data.money - object.cost,
        [object.name]: (data[object.name] || 0) + 1,
      });
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

  const handleSellAllOil = () => {
    const totalMoneyEarned = (data.barrels || 0) * 2;
    updateData({
      money: data.money + totalMoneyEarned,
      barrels: 0, // Reset barrels to 0 after selling
    });
  };

  useEffect(() => {
    if (data.lastActivity < (Date.now() / 1000 - 15)) {
      const now = Date.now();
      const lastUpdate = data.OilLastUpdate || now;
      const elapsedTime = (now - lastUpdate) / 1000; // Convert ms to seconds
      const productionRate = totalProduction();
      const producedBarrels = Math.floor(elapsedTime * productionRate);

      setProducedBarrels(producedBarrels);
      setPopupVisible(true);
    }
  }, [data]);

  useEffect(() => {
    const now = Date.now();

    const updateBarrels = () => {
      const lastUpdate = data.OilLastUpdate || now;
      const elapsedTime = (now - lastUpdate) / 1000; // Convert ms to seconds
      const productionRate = totalProduction();
      const producedBarrels = Math.floor(elapsedTime * productionRate);

      updateData({
        barrels: (data.barrels || 0) + producedBarrels,
        OilLastUpdate: now
      });

      setProducedBarrels(prevBarrels => prevBarrels + producedBarrels);
    };

    const interval = setInterval(updateBarrels, 1000);

    return () => clearInterval(interval);
  }, [data, updateData]);

  return (
    <div>
      <CostumPopup
        isOpen={popupVisible}
        onClose={handlePopupClose}
        title="Production Report"
        message="Your machines have been working hard while you were away."
        buttonText="CLAIM"
        barrelsProduced={producedBarrels}
      />

      <div className="oil-container">
        <p>Current global price for oil is {oilPrice} € per barrel</p>
        <button className="sell-button" onClick={handleSellAllOil}>
          Sell for {Math.floor((data.barrels || 0) * oilPrice)} €
        </button>

        <div className="object-list">
          {filteredObjects.map((object) => (
            <div key={object.name} className="object-item">
              <div className="object-details">
                <h2>{object.name}</h2>
                <p>Owned: {data[object.name] || 0}</p>
                <p>Cost: ${object.cost}</p>
                <p>
                  {object.message ? object.message : `Production: ${object.production} barrels/sec`}
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

export default Oil;
