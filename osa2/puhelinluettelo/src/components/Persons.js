import React from 'react'
import Number from './Number'

const Persons = ({ persons, filter, handleDelete }) => {  
        let personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

        const rows = () => personsToShow.map(person =>
            <Number
            key={person.name}
            name={person.name}
            number = {person.number}
            handleDelete = {() => handleDelete(person.id)}
            />
        )

        return (
            <div>
                {rows()}
            </div>
        )
}

export default Persons