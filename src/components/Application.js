import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointments from 'components/Appointments/index';
import {getAppointmentsForDay, getInterview} from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  const dayAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dayAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointments
          key={appointment.id}
          time={appointment.time}
          interview={interview}
          />
      );
    });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ])
      .then((all) => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

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
