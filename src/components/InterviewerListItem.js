// InterviewerListItem.js
// Graeme Nickerson
// November 2019

import React from "react";

import "components/InterviewerListItem.scss";

const classnames = require('classnames');

// Makes each interviewer's name appear next to thier picture when selected.
export default function InterviewerListItem(props) {
  const interviewerListClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={interviewerListClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};





