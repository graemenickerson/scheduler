import { useEffect, useReducer } from 'react';
import axios from 'axios';

const appointmentLookup = {
  getFromServer: (state, action) => {
    return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data };
  },
  updateAppointments: (state, action) => {
    return {...state, appointments: action.value};
  },
  setDay: (state, action) => {
    return {...state, day: action.value};
  }
}

const appointmentReducer = (state, action) => {
  return appointmentLookup[action.type](state, action);
}

const initialValue = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

export function useApplicationData() {
  const [state, dispatchState] = useReducer(appointmentReducer, initialValue);

  const setDay = day => dispatchState({type: 'setDay', value: day});

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
      .then((all) => {
        dispatchState({type: 'getFromServer', value: all});
      });
  }, []);

  const changeAppointments = (id, interview) =>{
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return { appointments, appointment };
  };

  const bookInterview = (id, interview) => {
    const {appointments, appointment} = changeAppointments(id, interview);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => dispatchState({type: 'updateAppointments', value: appointments}));
  }

  const cancelInterview = (id) => {
    const {appointments} = changeAppointments(id, null);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatchState({type: 'updateAppointments', value: appointments}));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}