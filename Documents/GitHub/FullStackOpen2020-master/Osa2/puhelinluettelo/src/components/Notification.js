import React from 'react';

const Notification = ({ message, luokka }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={luokka}> 
        {message}
      </div>
    )
  }

export default Notification;
