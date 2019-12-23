import React from 'react'

const PersonForm = ({addNumber, newName, nameChange, newNum, numChange}) => {
   return (
    <form onSubmit={addNumber}>
            <div>name: <input value={newName} onChange={nameChange}/></div>
            <div>number: <input value={newNum} onChange={numChange}/></div>
            <div><button type="submit">add</button></div>
    </form>
   )
}

export default PersonForm