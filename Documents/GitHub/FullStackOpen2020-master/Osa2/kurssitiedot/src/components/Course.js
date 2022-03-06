//Tommi Ralli
//FullStackOpen 2020 
//Osa2 Kurssitiedot 2.1

import React from 'react';

const Course = ({course}) => {
    return (
        <>{course.map(course =>
          <>
          <Header key={course.id} course={course} />
          <Content key={course.parts.id} course={course} />
          <Total course={course}/>
          </>
        )}
        </>
      
    )
}

const Header = ({course}) => {

    return (
    <div>
        <h3 key={course.id}>{course.name}</h3>    
    </div>
    )
  } 

const Content = ({course}) => {
       
    return (
      <>
        {course.parts.map( parts => 
          <p key={parts.id}>
            {parts.name} {parts.exercises}
        </p>)}    
      </>
    )
}

const Total =({course}) => {
    const total = course.parts.map( part => part.exercises ).reduce((sum, currentValue)=>sum + currentValue);
    
    return (
    <p><b>Total of {total} exercises</b></p>
    ) 
}

export default Course