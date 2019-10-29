import React from 'react';
import Header from 'components/Appointments/Header';
import Show from 'components/Appointments/Show';
import Empty from 'components/Appointments/Empty';

import 'components/Appointments/styles.scss';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? 
        <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> 
      : <Empty onAdd={() => console.log("Add New")} />}
    </article>
    );
}