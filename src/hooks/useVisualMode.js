// useVisualMode.js
// Graeme Nickerson
// November 2019

import { useState } from 'react';

// Returns mode and functions that track which view is visible on each appointment slot.
export function useVisualMode (input) {
  const [mode, setMode] = useState(input);
  const [history, setHistory] = useState([input]);

  const transition = (newMode, replace = false) => {
    if (replace === false) {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      const popHistory = [...history];
      popHistory.pop();
      setHistory(popHistory);
      setMode(popHistory[popHistory.length - 1]);
    }
  };
 
  return { mode, transition, back};
}
