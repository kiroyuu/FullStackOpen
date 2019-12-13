import React from 'react'
import Part from './Part'

const Content = ({course}) => {
    const array = course.parts
    const rows = () => array.map(part =>
            <Part content={part.name} num={part.exercises} key={part.id} />
    )
    return (
        <div>{rows()}</div>
    )
}

export default Content