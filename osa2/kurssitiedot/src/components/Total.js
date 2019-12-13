import React from 'react'

const Total = (props) => {
    const totalAmount = props.course.parts.reduce(function(sum,part) {
        return sum + part.exercises
    },0)

    return (
        <div>
            <p>
                <b>
                Total of {totalAmount} exercises
                </b>     
            </p>
        </div>
    )
}

export default Total