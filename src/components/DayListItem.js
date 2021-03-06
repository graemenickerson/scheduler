// DayListItem.js
// Graeme Nickerson
// November 2019

import React from "react";

import "components/DayListItem.scss";

const classnames = require('classnames');

const formatSpots = (spots) => {
  switch (spots) {
    case 0 :
      return ' no spots remaining';
    case 1 :
      return '1 spot remaining';
    default :
      return `${spots} spots remaining`;
  }
}; 

// Builds each item to be displayed as part of the Day List.
export default function DayListItem(props) {
  let dayListClass = classnames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayListClass} data-testid="Day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};