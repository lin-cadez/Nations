import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { DataContext } from '../../DataContext';

function Register() {
  const [country, setCountry] = useState('');
  const [stripeCount, setStripeCount] = useState(3); // Default to 3 stripes
  const [stripe1Color, setStripe1Color] = useState('#ffffff');
  const [stripe2Color, setStripe2Color] = useState('#ffffff');
  const [stripe3Color, setStripe3Color] = useState('#ffffff');
  const [stripe4Color, setStripe4Color] = useState('#ffffff'); // For the 4th stripe
  const [flagText, setFlagText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(20);
  const [stripeOrientation, setStripeOrientation] = useState(0);
  const [textFont, setTextFont] = useState('Arial'); // Default font

  const { data, updateData } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (country.trim() === '') {
      alert('Please enter the country');
      return;
    }

    // Saving data securely
    const newUserData = {
      country: country,
      stripe1Color: stripe1Color,
      stripe2Color: stripe2Color,
      stripe3Color: stripe3Color,
      stripe4Color: stripe4Color,
      stripeCount: stripeCount,
      flagText: flagText,
      textColor: textColor,
      textSize: textSize,
      textFont: textFont, // Add the selected font to user data
      stripeOrientation: stripeOrientation,
      customFlag: null,
    };

    updateData({ ...data, user: newUserData });
    navigate('/');
    window.location.reload();
  };

  const handleColorChange = () => {
    // Logic to reset the image if colors are changed (if needed)
  };

  const handleStripeCountChange = (count) => {
    setStripeCount(count);
  };

  const handleOrientationChange = (orientation) => {
    setStripeOrientation(orientation);
  };

  return (
    <div className="register-container">
      <h2>Setup Your Flag</h2>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country"
        className="register-input"
        maxLength="30" // Limit to 30 characters
      />

      <div className="flag-editor">
        <h3>Create Your Custom Flag</h3>
        <h4>Select Number of Stripes</h4>

        <div className="stripe-count">
          <button onClick={() => handleStripeCountChange(1)}>1 Stripe</button>
          <button onClick={() => handleStripeCountChange(2)}>2 Stripes</button>
          <button onClick={() => handleStripeCountChange(3)}>3 Stripes</button>
          <button onClick={() => handleStripeCountChange(4)}>4 Stripes</button>
        </div>

        <div className="stripe-colors">
          <input
            type="color"
            value={stripe1Color}
            onChange={(e) => {
              setStripe1Color(e.target.value);
              handleColorChange();
            }}
            className="color-picker"
          />
          {stripeCount >= 2 && (
            <input
              type="color"
              value={stripe2Color}
              onChange={(e) => {
                setStripe2Color(e.target.value);
                handleColorChange();
              }}
              className="color-picker"
            />
          )}
          {stripeCount >= 3 && (
            <input
              type="color"
              value={stripe3Color}
              onChange={(e) => {
                setStripe3Color(e.target.value);
                handleColorChange();
              }}
              className="color-picker"
            />
          )}
          {stripeCount === 4 && (
            <input
              type="color"
              value={stripe4Color}
              onChange={(e) => {
                setStripe4Color(e.target.value);
                handleColorChange();
              }}
              className="color-picker"
            />
          )}
        </div>

        <div className="text-settings">
          <span>
            <label>Text color: </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="color-picker"
            />
          </span>
          <span>
            <label>Text Size (max 100px):</label>
            <input
              type="number"
              value={textSize}
              onChange={(e) =>
                setTextSize(e.target.value <= 100 ? e.target.value : 100)
              }
              className="text-size-input"
            />
          </span>
        </div>

        <label>Flag Text (max 20 characters):</label>
        <input
          type="text"
          value={flagText}
          onChange={(e) => setFlagText(e.target.value)}
          placeholder="Enter flag text"
          className="flag-text-input"
          maxLength="20" // Limit to 20 characters
        />

        <label>Select Font:</label>
        <select
          value={textFont}
          onChange={(e) => setTextFont(e.target.value)}
          className="font-picker"
        >
          <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
          <option style={{ fontFamily: 'Verdana' }} value="Verdana">Verdana</option>
          <option style={{ fontFamily: 'Courier New' }} value="Courier New">Courier New</option>
          <option style={{ fontFamily: 'Georgia' }} value="Georgia">Georgia</option>
          <option style={{ fontFamily: 'Brush Script MT ' }} value="Brush Script MT ">Brush Script MT </option>
          <option style={{ fontFamily: 'Impact' }} value="Impact">Impact</option>
          <option style={{ fontFamily: 'Times New Roman' }} value="Times New Roman">Times New Roman</option>
        </select>

        <div
          className="flag-preview"
          style={{ transform: `rotate(${stripeOrientation}deg)`, borderRadius: '50%' }}
        >
          <div className="flag-preview-stripes">
            <div
              className="stripe stripe1"
              style={{ backgroundColor: stripe1Color }}
            ></div>
            {stripeCount >= 2 && (
              <div
                className="stripe stripe2"
                style={{ backgroundColor: stripe2Color }}
              ></div>
            )}
            {stripeCount >= 3 && (
              <div
                className="stripe stripe3"
                style={{ backgroundColor: stripe3Color }}
              ></div>
            )}
            {stripeCount === 4 && (
              <div
                className="stripe stripe4"
                style={{ backgroundColor: stripe4Color }}
              ></div>
            )}
            <div
              className="flag-content"
              style={{
                color: textColor,
                fontSize: `${textSize}px`,
                fontFamily: textFont,
              }}
            >
              {flagText}
            </div>
          </div>
        </div>
      </div>

      <div className="orientation-control">
        <h3>Set Stripe Orientation</h3>
        <img
          src="/icons/radio_button_unchecked_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          alt="0°"
          onClick={() => handleOrientationChange(0)}
        />
        <img
          src="/icons/clock_loader_20_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          alt="90°"
          onClick={() => handleOrientationChange(90)}
        />
        <img
          src="/icons/contrast_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          alt="180°"
          onClick={() => handleOrientationChange(180)}
        />
        <img
          src="/icons/clock_loader_80_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
          alt="270°"
          onClick={() => handleOrientationChange(270)}
        />
      </div>

      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
}

export default Register;
