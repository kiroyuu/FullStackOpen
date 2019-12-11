import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.content} {props.num}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part content={props.content1} num={props.num1} />
            <Part content={props.content2} num={props.num2} />
            <Part content={props.content3} num={props.num3} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises {props.total}
            </p>
        </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <div>
          <Header course={course} />
          <Content content1={part1} content2={part2} content3={part3} num1={exercises1} num2={exercises2} num3={exercises3} />
          <Total total={exercises1+exercises2+exercises3} />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))