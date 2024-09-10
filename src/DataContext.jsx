import React, { createContext, useState, useEffect } from 'react';
import levels from './levels'; // Adjust the import path as needed

// Create the context
export const DataContext = createContext();

// Define the provider component
export const DataProvider = ({ children }) => {
  const defaultData = {
    money: 0,
    level: 1,
    specialMessageOpen: false,
    levelData: null,
    lastActivity: Date.now() / 1000
  };

  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('gameData');
      if (savedData) {
        return JSON.parse(savedData);
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
      localStorage.setItem('gameData', JSON.stringify(data));
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
        lastActivity: Date.now() / 1000,
      };
    });
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
