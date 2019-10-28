import React from "react";

import "components/InterviewerListItem.scss";

const classnames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerListClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  if (props.selected) {
    return (
      <li className={interviewerListClass} onClick={() => props.setInterviewer(props.name)}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.name}
      </li>
    );
  } else {
    return (
      <li className={interviewerListClass} onClick={() => props.setInterviewer(props.name)}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
      </li>
    );
  }
};





