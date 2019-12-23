import React from 'react'

const Number = ({ name, number, handleDelete }) => {
  return (
  <div>{name} {number} <button onClick={handleDelete}>delete</button></div>
  )
}

export default Number