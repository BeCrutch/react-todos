import React, { useState } from "react"
import TodoItem from "./TodoItem"
import { useSelector } from 'react-redux'
import Loader from "../Loader";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

function TodoList() {
  const [completedFilter, setCompletedFilter] = useState(undefined)
  const todos = useSelector( state => state.todos.todos )
  const loading = useSelector( state => state.app.loading )
  if ( loading )
    return (
      <Loader />
    )

  return (
    <div>
      <TransitionGroup component="ul" style={styles.ul}>
        { todos.map((todo) => (
          <CSSTransition
            key={todo.id}
            // nodeRef={t.nodeRef}
            timeout={500}
            classNames="item"
          >
            <TodoItem completed={completedFilter} todo={todo} key={todo.id}/>
          </CSSTransition>
          )
        )}
      </TransitionGroup>
    </div>
  )
}

TodoList.propTypes = {
  //todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  // onToggle: PropTypes.func.isRequired,
}

export default TodoList
