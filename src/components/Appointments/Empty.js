// Empty.js
// Graeme Nickerson
// November 2019

import React from 'react';

// View shown to users when there is not appointment booked.
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}