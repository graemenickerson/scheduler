// applicationCache.js
// Graeme Nickerson
// November 2019

// Updates the spots remaining for each day when it is updated.
const updateSpotsInDays = (state, action) => {
  const {id, interview} = action.value
  const updatedDays = [...state.days]
  const result =[];
  for (let day of updatedDays) {
    const newDay = {...day};
    if (day.appointments.includes(id)) {
      if (interview && state.appointments[id].interview === null ){
        newDay.spots--;
      } else if (interview === null) {
        newDay.spots++;
      }
    }
    result.push(newDay);
  }
  return result;
};

// Lookup for Reducer
const appointmentLookup = {
  SET_APPLICATION_DATA: (state, action) => {
    return {...state, days: action.value[0].data, appointments: action.value[1].data, interviewers: action.value[2].data };
  },
  SET_INTERVIEW: (state, action) => {
    const {id, interview} = action.value
    const appointment = {
      ...state.appointments[id],
      interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return {...state, appointments, days: updateSpotsInDays(state, action)};
  },
  SET_DAY: (state, action) => {
    return {...state, day: action.value};
  }
}

export const appointmentReducer = (state, action) => {
  if (appointmentLookup.hasOwnProperty(action.type)) {
    return appointmentLookup[action.type](state, action);
  } else {
    throw new Error (`Tried to reduce with unsupported action type: ${action.type}`);
  }
}