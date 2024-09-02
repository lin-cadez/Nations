import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Navigate } from 'react-router-dom';
import './App.css';
import Oil from './components/Oil/Oil';
import Farm from './components/Farm/Farm';
import Shop from './components/Shop/Shop';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { DataProvider } from './DataContext'; // Import DataProvider
import Popup from './components/Popup/Popup'; // Import Popup component

function App() {
  const isLoggedIn = !!localStorage.getItem('username');

  return (
    <DataProvider>
      <Router>
        <div className="app-container">
          {isLoggedIn && <Navbar />}
        
          <div className="content">
            <Routes>
              <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/register" />} />
              <Route path="/farm" element={isLoggedIn ? <Farm /> : <Navigate to="/register" />} />
              <Route path="/oil" element={isLoggedIn ? <Oil /> : <Navigate to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shop" element={isLoggedIn ? <Shop /> : <Navigate to="/register" />} />
            </Routes>
          </div>
          {isLoggedIn && <Footer />}
          {isLoggedIn && <Popup />}
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
