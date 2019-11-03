// useApplicationData.js
// Graeme Nickerson
// October 2019

import { useEffect, useReducer } from 'react';
import axios from 'axios';

// Updates the spots remaining for each day when it is updated.
const updateSpotsInDays = (state, action) => {
  const updatedDays = state.days 
  for (let day of updatedDays) {
    if (day.appointments.includes(action.spots.id) && state.appointments[action.spots.id].interview === null) {
      action.spots.interview ? day.spots -= 1 : day.spots += 1;
    }
  }
  return updatedDays;
};

// Lookup for Reducer
const appointmentLookup = {
  SET_APPLICATION_DATA: (state, action) => {
    return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data };
  },
  SET_INTERVIEW: (state, action) => {
    console.log('state', state)
    console.log('newstate', {...state, appointments: action.value, days: updateSpotsInDays(state, action)})
    const {id, interview} = action.spots
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return {...state, appointments, days: updateSpotsInDays(state, action)};
  },
  SET_DAY: (state, action) => {
    return {...state, day: action.value};
  }
}

const appointmentReducer = (state, action) => {
  return appointmentLookup[action.type](state, action);
}

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

  const changeAppointments = (id, interview) => {
    console.log('stateinchange', state)
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return { appointments, appointment };
  };

  useEffect(() => {
    webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = (event) => {
      webSocket.send('ping'); 
    };
    webSocket.onmessage = (event) => {
      console.log("Message Received: ", event.data);
      const update = JSON.parse(event.data);
      if (update.type === 'SET_INTERVIEW') {
        const { appointments } = changeAppointments(update.id, update.interview);
        dispatchState({type: update.type, value: appointments, spots:{ id: (update.id), interview: update.interview }});
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
    const {appointments, appointment} = changeAppointments(id, interview);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatchState({type: 'SET_INTERVIEW', value: appointments, spots:{id, interview}}));
  }

  const cancelInterview = (id) => {
    const {appointments} = changeAppointments(id, null);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatchState({type: 'SET_INTERVIEW', value: appointments, spots:{id, interview: null}}));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}