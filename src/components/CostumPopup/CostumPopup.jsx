// CustomPopup.js
import React from 'react';
import './../Popup/Popup.css'; // Import CSS for Popup styling

function CostumPopup({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  imageUrl,
  barrelsProduced,
  wheatProduced,
}) {
  if(!imageUrl || imageUrl === '' || imageUrl === 'default') {
    imageUrl = 'icons/usa_default.png';
  }
  if (!isOpen) {
    return null; // Do not render if popup is not open
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {imageUrl && <img src={imageUrl} alt="Popup Image" className="popup-image" />}
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}
        {barrelsProduced !== undefined && <p>Barrels Produced: {barrelsProduced}</p>}
        {wheatProduced !== undefined && <p>Wheat Produced: {wheatProduced}</p>}
        <button onClick={onClose}>{buttonText || 'Close'}</button>
      </div>
    </div>
  );
}

export default CostumPopup;
