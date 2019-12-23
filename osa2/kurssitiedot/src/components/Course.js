import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    return (
        <div>
            <Header course = {course}/>
            <Content course = {course}/>
            <Total course = {course}/>
            {/* <Header course = {course[1]}/>
            <Content course = {course[1]}/> 
            <Total course = {course[1]}/> */}
        </div>
    )
}

export default Course