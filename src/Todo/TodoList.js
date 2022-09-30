import React, { useState } from "react"
import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"
import { useSelector } from 'react-redux'
import Loader from "../Loader";
import { Funnel } from "react-bootstrap-icons";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Badge from "react-bootstrap/Badge";
import TodoSort from "./TodoSort";

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

function TodoList({updateTodos}) {
  const [completedFilter, setCompletedFilter] = useState(undefined)
  const todos = useSelector( state => state.todos.todos )
  const loading = useSelector( state => state.app.loading )

  if ( loading )
    return (
      <Loader />
    )

  return (

    <>
      <div className="d-flex align-items-center mb-3">
        <div className="me-3">
          <Funnel size={16} />:
          <ButtonGroup className="ms-1">
            <Button variant="outline-secondary" active={completedFilter === void 0} onClick={() => {setCompletedFilter(void 0)}} size="sm">All</Button>
            <Button variant="outline-secondary" active={completedFilter === false} onClick={() => {setCompletedFilter(false)}} size="sm">Not completed</Button>
            <Button variant="outline-secondary" active={completedFilter === true} onClick={() => {setCompletedFilter(true)}} size="sm">Completed</Button>
          </ButtonGroup>
        </div>
        <TodoSort />

        <div className="flex-grow-1 text-end"><small>total quantity:</small><Badge bg="dark">{todos.length}</Badge></div>
      </div>

      <ul style={styles.ul}>
        { todos.map(todo => <TodoItem completed={completedFilter} todo={todo} key={todo.id}/>) }
      </ul>

    </>
  )
}

TodoList.propTypes = {
  //todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  // onToggle: PropTypes.func.isRequired,
}

export default TodoList
