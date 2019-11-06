// Confirm.js
// Graeme Nickerson
// November 2019

import React from 'react';
import Button from 'components/Button'

// Confimation Prompt shown to users when they are deleting an appointment.
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">Delete the appointment?</h1>
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button danger onClick={props.onConfirm}>Confirm</Button>
    </section>
  </main>
  );
}