//Tommi Ralli
//FullStackOpen 2020 
//Kurssitiedot 1.5

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (course) => {
  console.log(course)
  return (
  <h1>{course.course}</h1>
  )
} 

const Content = (course) => {
  console.log(course)
  return (
    <>
      <p>{course.course.parts[0].name} {course.course.parts[0].exercises}</p>
      <p>{course.course.parts[1].name} {course.course.parts[1].exercises}</p>
      <p>{course.course.parts[2].name} {course.course.parts[2].exercises}</p>
    </>
  )
}

const Total = (course) => {
  return (
    <div>
      <p>Number of exercises {course.course.parts[0].exercises+course.course.parts[1].exercises+course.course.parts[2].exercises}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
