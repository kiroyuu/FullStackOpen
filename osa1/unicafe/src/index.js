import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.header}</h1>
        </div>
    )
}

const Statistic = (props) => {
    return (
            <Display value = {props.value} name={props.text} mark = {props.mark}/>
        
    )
}

const Display = props => {
    return (
        <tr>
            <th>{props.name}</th>
            <td>{props.value} {props.mark}</td>
        </tr>
    )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text = "good" value = {props.good} mark = ''/>
                        <Statistic text = "neutral" value = {props.neutral} mark = ''/>
                        <Statistic text = "bad" value = {props.bad} mark = ''/>
                        <Statistic text = "all" value = {props.all} mark = ''/>
                        <Statistic text = "average" value = {props.average.toFixed(2)} mark = ''/>
                        <Statistic text = "positive" value = {props.prosPos.toFixed(2)} mark = '%'/>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>No feedback given</div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)
    const [prosPos, setProsPos] = useState(0.0)

    const setGoodValue = (newValue) => {
        setGood(newValue)
        setAll(all + 1)
        setPositive(positive + 1)
        setAverage(((good+1) - bad) / (all+1))
        setProsPos((positive+1) / (all+1) * 100)
    }

    const setNeutralValue = (newValue) => {
        setNeutral(newValue)
        setAll(all + 1)
        setProsPos(positive / (all + 1) * 100)
    }

    const setBadValue = (newValue) => {
        setBad(newValue)
        setAll(all + 1)
        setAverage((good - (bad +1)) / (all+1))
        setProsPos(positive / (all+1) * 100)
    }

    return (
      <div>
          <h1>give feedback</h1>
          <Button handleClick={() => setGoodValue(good + 1)} text="good"/>
          <Button handleClick={() => setNeutralValue(neutral + 1)} text="neutral"/>
          <Button handleClick={() => setBadValue(bad + 1)} text="bad"/>
          <h2>statistics</h2>
          <Statistics good = {good} neutral ={neutral} bad = {bad} 
          all = {all} average = {average} prosPos = {prosPos}/>
      </div>
    )
  }

ReactDOM.render(<App />, 
  document.getElementById('root')
)