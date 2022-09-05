import React, { useState } from "react"
import PropTypes from 'prop-types'

//Custom Hook
function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: e => setValue(e.target.value)
    },
    value: () => value,
    clear: () => setValue(''),
  }
}

function AddTodo({ onCreate }) {
  const input = useInputValue('')

  function submitHandler(event) {
    event.preventDefault()
    if(input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form action="" style={{display: 'flex', marginBottom: '1rem'}} onSubmit={submitHandler}>
      <input type="text" {...input.bind} style={{flexGrow: '1'}}/>
      <button type="submit">Add</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo
