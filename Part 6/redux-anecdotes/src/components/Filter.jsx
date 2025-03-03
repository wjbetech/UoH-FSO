import React from 'react'
import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

export default function Filter(props) {
  const dispatch = useDispatch()  

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(filterChange(event.target.value))
  }
  
  return (
    <div>
      <p>Filter: <input type="text" onChange={handleChange} /></p>
    </div>
  )
}
