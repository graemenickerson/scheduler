import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointments from 'components/Appointments/index';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
      .then((all) => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({...state, appointments}))
      .catch(err => console.log(err));
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
      .catch(err => console.log(err));
  }
  
  const dayInterviewers = getInterviewersForDay(state, state.day);
  const dayAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dayAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointments
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dayInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
      );
  });
    

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointments key="last" time="5pm" />
      </section>
    </main>
  );
}
