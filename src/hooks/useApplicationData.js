// useApplicationData.js
// Graeme Nickerson
// October 2019

import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { appointmentReducer } from "reducers/application";

// Initial values passed into state.
const initialValue = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

let webSocket;

// Handles all matters pertaining to state for this application.
export function useApplicationData() {
  const [state, dispatchState] = useReducer(appointmentReducer, initialValue);

  const setDay = day => dispatchState({type: 'SET_DAY', value: day});

  useEffect(() => {
    webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = (event) => {
      webSocket.send('ping'); 
    };
    webSocket.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'SET_INTERVIEW') {
        dispatchState({type: update.type, value:{ id: (update.id), interview: update.interview }});
      }
    }

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
      .then((all) => {
        dispatchState({type: 'SET_APPLICATION_DATA', value: all});
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatchState({type: 'SET_INTERVIEW', value:{id, interview}}));
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatchState({type: 'SET_INTERVIEW', value:{id, interview: null}}));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}