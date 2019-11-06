// DayList.js
// Graeme Nickerson
// November 2019

import React from "react";

import DayListItem from 'components/DayListItem';

// Creates a list of the days to be shown in the side bar.
export default function DayList(props) {
  const dayList = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
    );
  });
  return dayList;
};
