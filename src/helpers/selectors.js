

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
