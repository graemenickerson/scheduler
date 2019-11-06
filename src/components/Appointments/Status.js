// Status.js
// Graeme Nickerson
// November 2019

import React from 'react';


// The spinner and message shown when sending something to the server.
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}