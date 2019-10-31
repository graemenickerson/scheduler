

export function getAppointmentsForDay(state, day) {
  const daySelected = state.days.filter(d => d.name === day);
  let result = []
  if (daySelected[0]) {
    for (const app of daySelected[0].appointments) {
        result.push(state.appointments[app]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  let result = null;
  if (interview) {
    result = {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
      };
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  let result = []
  const daySelected = state.days.filter(d => d.name === day);
  if (daySelected[0]) {
    for (const interviewer of daySelected[0].interviewers) {
        result.push(state.interviewers[interviewer]);
    }
  }
  return result;
}