import React, { useContext } from 'react';
import { DataContext } from '../../DataContext'; // Adjust path as needed
import './Popup.css'; // Import CSS for Popup styling

function Popup() {
  const { data, updateData } = useContext(DataContext);

  const levelData = data.level > 0 ? data.levelData : null;

  if (!levelData || !data.specialMessageOpen) {
    return null; // Do not render if no level data or popup should not be shown
  }

  const handleClose = () => {
    updateData({ specialMessageOpen: false }); // Close the popup
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{levelData.label}</h2>
        <img src={levelData.imageUrl} alt={`Level ${data.level}`} className="popup-image" />
        <p>{levelData.specialMessage}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
