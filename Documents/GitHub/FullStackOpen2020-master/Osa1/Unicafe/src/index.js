//Tommi Ralli
//Unicafe

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button style={{margin: "5px", }} onClick={onClick} >
    {text}
  </button>
  )

const StatisticLine = (props) => {
  console.log('from statline: ',props.text,props.value,props.txt)
  return (
    <>
      <td>{props.text}</td> 
      <td>{props.value}{props.txt}</td>
    </>
  ) 
}

const ResultTable = ({good,neutral,bad,all,avg,pos}) => {
  console.log('from resulttable',good,neutral,bad,all,avg,pos)
  return (
  <>
    <h3>Tulokset:</h3>
    <table>
      <tbody>
        <tr><StatisticLine text='Hyvä: ' value={good} /></tr>
        <tr><StatisticLine text='Neutraali: ' value={neutral} /></tr>
        <tr><StatisticLine text='Huono: ' value={bad} /></tr>
        <tr><StatisticLine text='Kaikki: ' value={all} /></tr>
        <tr><StatisticLine text='Keskiarvo: ' value={avg / all} /></tr>
        <tr><StatisticLine text='Positiivisia: ' value={pos / all * 100} txt='%' /></tr>
      </tbody>
    </table>
  </>)
}

const Statistics = ({good,neutral,bad,all,avg,pos}) => {
  console.log('from stats', good,neutral,bad,all,avg,pos)
  if (all===0) { 
    return (
    <div>
      <p>Ei annettuja palautteita.</p>
    </div>
    )
  }
    return <ResultTable good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}/>;
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAvg(avg +1)
    setPos(pos +1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAvg(avg +0)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAvg(avg -1)
  }

  console.log('from App',good,neutral,bad,all,avg,pos)
  return (
    <div>
      <h1>Kiitos asioinnista!</h1>
      <h3>Halutessasi jätä palaute. Oliko kokemuksesi:</h3>
      <Button onClick={handleGoodClick} text='Erinomainen' />
      <Button onClick={handleNeutralClick} text='Neutraali' />
      <Button onClick={handleBadClick} text='Huono' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}/>
    </div>
  )

}

ReactDOM.render(<App />,
  document.getElementById('root')
)
