import React, { createContext, useState, useEffect } from 'react';
import levels from './levels'; // Adjust the import path as needed
import CryptoJS from 'crypto-js';

// Define a secret key for encryption (this should be stored securely)
const SECRET_KEY = 'your-secret-key'; // Replace with your own secret key

// Create the context
export const DataContext = createContext();

// Define the provider component
export const DataProvider = ({ children }) => {
  const defaultData = {
    money: 0,
    level: 1,
    specialMessageOpen: false,
    levelData: null,
    lastActivity: Date.now()/1000
  };

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('gameData');
      if (savedData) {
        const decryptedData = decryptData(savedData);
        return decryptedData;
      } else {
        return defaultData;
      }
    } catch (error) {
      console.error('Failed to load gameData from localStorage:', error);
      return defaultData;
    }
  });

  // Save data to local storage whenever it changes
  useEffect(() => {
    try {
      const encryptedData = encryptData(data);
      localStorage.setItem('gameData', encryptedData);
    } catch (error) {
      console.error('Failed to save gameData to localStorage:', error);
    }
  }, [data]);

  // Update data function
  const updateData = (newData) => {
    setData(prevData => {
      const updatedData = { ...prevData, ...newData };

      // Check if the level has changed and update specialMessageOpen
      if (newData.level && newData.level > prevData.level) {
        const newLevelData = levels.find(level => level.level === newData.level);
        if (newLevelData) {
          return {
            ...updatedData,
            specialMessageOpen: true,
            levelData: newLevelData
          };
        }
      }

      return {
        ...updatedData,
        lastActivity: Date.now()/1000,
      };
    });
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
