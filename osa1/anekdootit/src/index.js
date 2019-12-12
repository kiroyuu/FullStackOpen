import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Count = (props) => {
    const x = props.array[props.index]
    return (
        <div>
            <p>
                Has {x} points
            </p>
            
        </div>
    )
}

const MostVotes = (props) => {
    let i = props.index.indexOf(Math.max(...props.index));
    return (
        <div>
            {props.array[i]}
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const num = (value) => {
    let val = value
    while (val == value) {
        val = Math.floor(Math.random() * 6)
      }
      console.log(val)
      setSelected(val)
  }

  const setVote = (num) => {
    console.log(num)
    points[num] += 1
    console.log(points)
  }

  return (
    <div>
     <h1>Anecdote of the day</h1>
      <div>
          {props.anecdotes[selected]}
      </div>

      <Count array = {points} index = {selected}/>
      <Button handleClick={() => setVote(selected)} text="vote"/>
      <Button handleClick={() => num(selected)} text="next anecdote"/>
      <h2>Most votes of the day</h2>
      <MostVotes array = {props.anecdotes} index = {points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)