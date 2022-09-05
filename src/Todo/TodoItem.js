import React, { useContext } from "react"
import PropTypes from 'prop-types'
import Context from "../context";

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem',
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginRight: '16px',
  },
  number: {
    marginRight: '4px'
  }
}

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context)
  const classes = []
  if (todo.completed) {
    classes.push('done')
  }
  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input
          id={`input-${index}`}
          type="checkbox"
          style={styles.input}
          onChange={() => onChange(todo.id)}
          checked={todo.completed}
        />
        <label htmlFor={`input-${index}`}>
          <strong style={styles.number}>{++index}</strong>
          {todo.title}
        </label>
      </span>

      {/*removeTodo.bind(todo.id)*/}
      <button className="remove" onClick={removeTodo.bind(null, todo.id)}>&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  index: PropTypes.number,
  todo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TodoItem
