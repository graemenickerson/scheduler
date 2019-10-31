import React from "react";

import "./Application.scss";
import DayList from './DayList';
import Appointments from './Appointments/index';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';
import { useApplicationData} from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
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
