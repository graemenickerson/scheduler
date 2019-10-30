import { useState } from 'react';

export default function useVisualMode (input) {
  const [state, setState] = useState({mode : input});
  return state;
}