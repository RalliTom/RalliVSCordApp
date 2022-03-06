import React from 'react'

const Person = (props, deleteNumber) => {
    return (
      <li>{props.name}  {props.number} <button onClick={props.deleteNumber}>Delete</button></li>
    )
  }

  export default Person