import React from "react";

import InterviewerListItem from 'components/InterviewerListItem';
import "components/InterviewerList.scss";

export default function DayList(props) {
  const interviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        onClick={(event) => props.setInterviewer(interviewer.id)} />
    )
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );
}