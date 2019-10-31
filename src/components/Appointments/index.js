import React from 'react';
import Header from 'components/Appointments/Header';
import Show from 'components/Appointments/Show';
import Empty from 'components/Appointments/Empty';
import Form from 'components/Appointments/Form';
import Status from 'components/Appointments/Status';
import Confirm from 'components/Appointments/Confirm';

import { useVisualMode } from 'hooks/useVisualMode';

import 'components/Appointments/styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.log(err));
  }
  const cancel = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETING && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={cancel}/>}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
    </article>
    );
}