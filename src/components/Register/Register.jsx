import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { DataContext } from '../../DataContext';

function Register() {
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [stripe1Color, setStripe1Color] = useState('#ffffff');
  const [stripe2Color, setStripe2Color] = useState('#ffffff');
  const [stripe3Color, setStripe3Color] = useState('#ffffff');
  const [flagText, setFlagText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const { data, updateData } = useContext(DataContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username.trim() === '' || country.trim() === '') {
      alert('Please enter both username and country');
      return;
    }

    // Saving data securely
    const newUserData = {
      username: username,
      country: country,
      stripe1Color: stripe1Color,
      stripe2Color: stripe2Color,
      stripe3Color: stripe3Color,
      flagText: flagText,
      customFlag: null,
    };

    if (uploadedImage) {
      const reader = new FileReader();
      reader.onload = function () {
        newUserData.customFlag = reader.result;
        updateData({ ...data, user: newUserData });
      };
      reader.readAsDataURL(uploadedImage);
    } else {
      updateData({ ...data, user: newUserData });
    }

    navigate('/');
    window.location.reload();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
    setIsImageUploaded(true);
  };

  const handleColorChange = () => {
    setIsImageUploaded(false); // Reset image if colors are changed
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="register-input"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country"
        className="register-input"
      />

      <div className="flag-editor">
        <h3>Create Your Custom Flag</h3>
        <label>Stripe 1 Color:</label>
        <input
          type="color"
          value={stripe1Color}
          onChange={(e) => {
            setStripe1Color(e.target.value);
            handleColorChange();
          }}
          className="color-picker"
        />

        <label>Stripe 2 Color:</label>
        <input
          type="color"
          value={stripe2Color}
          onChange={(e) => {
            setStripe2Color(e.target.value);
            handleColorChange();
          }}
          className="color-picker"
        />

        <label>Stripe 3 Color:</label>
        <input
          type="color"
          value={stripe3Color}
          onChange={(e) => {
            setStripe3Color(e.target.value);
            handleColorChange();
          }}
          className="color-picker"
        />

        <label>Flag Text:</label>
        <input
          type="text"
          value={flagText}
          onChange={(e) => setFlagText(e.target.value)}
          placeholder="Enter flag text"
          className="flag-text-input"
        />

        <div className="flag-preview">
          {isImageUploaded ? (
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Custom flag"
              className="flag-image"
            />
          ) : (
            <div className="flag-preview-stripes">
              <div
                className="stripe stripe1"
                style={{ backgroundColor: stripe1Color }}
              ></div>
              <div
                className="stripe stripe2"
                style={{ backgroundColor: stripe2Color }}
              ></div>
              <div
                className="stripe stripe3"
                style={{ backgroundColor: stripe3Color }}
              ></div>
              <div className="flag-content">{flagText}</div>
            </div>
          )}
        </div>
      </div>

      <div className="image-upload">
        <h3>Upload Custom Image for Flag</h3>
        <input type="file" onChange={handleImageUpload} />
      </div>

      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
}

export default Register;
