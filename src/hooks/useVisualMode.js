import { useState } from 'react';

export default function useVisualMode (input) {
  const [mode, setMode] = useState(input);
  const [history, setHistory] = useState([input]);

  const transition = (newMode, replace = false) => {
    if (replace === false) {
      const addHistory = [...history, newMode];
      setHistory(addHistory);
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
};
