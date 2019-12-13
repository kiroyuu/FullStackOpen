import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    const {course} = props
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <Header course = {course[0]}/>
            <Content course = {course[0]}/>
            <Total course = {course[0]}/>
            <Header course = {course[1]}/>
            <Content course = {course[1]}/> 
            <Total course = {course[1]}/>
        </div>
    )
}

export default Course