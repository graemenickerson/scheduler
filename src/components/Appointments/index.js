import React from 'react';
import Header from 'components/Appointments/Header';
import Show from 'components/Appointments/Show';
import Empty from 'components/Appointments/Empty';

import 'components/Appointments/styles.scss';

export default function Appointment(props) {
  let {id, time, interview} = props;
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? 
        <Show student={interview.student} interviewer={interview.interviewer.name} /> 
      : <Empty onAdd={() => console.log("Add New")} />}
    </article>
    );
}