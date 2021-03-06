// Button.js
// Graeme Nickerson
// November 2019

import React from "react";

import "components/Button.scss";

const classnames = require("classnames");

// Details all button elements in application.
export default function Button(props) {
   let buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
  return (
   <button
     className={buttonClass}
     onClick={props.onClick}
     disabled={props.disabled}
   >
     {props.children}
   </button>
 );
}
