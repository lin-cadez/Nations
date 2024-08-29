import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }

    // Future implementation: Check if username is unique
    // Example: Check username against an API or a list

    localStorage.setItem('username', username);
    navigate('/'); // Navigate to Home page
    window.location.reload(); // Reload to trigger route change
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
      <button onClick={handleRegister} className="register-button">Register</button>
    </div>
  );
}

export default Register;
