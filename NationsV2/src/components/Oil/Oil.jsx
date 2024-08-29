import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import './Oil.css';
import CostumPopup from '../CostumPopup/CostumPopup';

function Oil() {
  const { data, updateData } = useContext(DataContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [producedBarrels, setProducedBarrels] = useState(0);


  // Initial state for total barrels, retrieved from data
  const [totalBarrels, setTotalBarrels] = useState(data.barrels || 0);

  const objects = [
    { name: 'Oil Drill', cost: 20, production: 1, icon: 'icons/oil.png' },
    { name: 'Sea Oil Platform', cost: 800, production: 90, icon: 'icons/rig.png' },
    { name: 'Oil Field', cost: 5000, production: 500, icon: 'icons/oil-refinery.png' },
    
  ];

  const handleBuy = (object) => {
    if (data.money >= object.cost) {
      updateData({
        money: data.money - object.cost,
        [object.name]: (data[object.name] || 0) + 1,
      });
    }
  };

  // Calculate total production rate
  const totalProduction = () => {
    return objects.reduce((total, object) => {
      return total + (data[object.name] || 0) * object.production;
    }, 0);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    if(data.lastActivity < (Date.now()/1000 - 15)) {
      
      const now = Date.now();
      const lastUpdate = data.OilLastUpdate || now;
      const elapsedTime = (now - lastUpdate) / 1000; // Convert ms to seconds
      const productionRate = totalProduction();
      const producedBarrels = Math.floor(elapsedTime * productionRate);

      
      setProducedBarrels(producedBarrels);
      setPopupVisible(true);

      
    }
  }
  , []);


  // Update total barrels based on elapsed time
  useEffect(() => {
    const now = Date.now();

    const updateBarrels = () => {
      const lastUpdate = data.OilLastUpdate || now;
      const elapsedTime = (now - lastUpdate) / 1000; // Convert ms to seconds
      const productionRate = totalProduction();
      const producedBarrels = Math.floor(elapsedTime * productionRate);

      // Update total barrels and last update time in context
      updateData({
        barrels: (data.barrels || 0) + producedBarrels,
        OilLastUpdate: now
      });

      // Update local state to reflect the new total barrels
      setTotalBarrels(prevBarrels => prevBarrels + producedBarrels);
    };

    const interval = setInterval(updateBarrels, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
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

      <div className="object-list">
        {objects.map((object) => (
          <div key={object.name} className="object-item">
            <div className="object-details">
              <h2>{object.name}</h2>
              <p>Owned: {data[object.name] || 0}</p>
              <p>Cost: ${object.cost}</p>
              <p>Production: {object.production} barrels/sec</p>
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
