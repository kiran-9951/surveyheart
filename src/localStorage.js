// src/localStorage.js

// Function to save state to local storage
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('todosState', serializedState);
    } catch (error) {
      console.error('Could not save state', error);
    }
  };
  
  // Function to load state from local storage
  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('todosState');
      if (serializedState === null) {
        return undefined; // Return undefined for the initial state if no data in localStorage
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Could not load state', error);
      return undefined;
    }
  };
  