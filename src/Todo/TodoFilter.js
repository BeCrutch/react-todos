import React, { useState, useId } from "react"
import {useSelector} from "react-redux"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import {Funnel} from "react-bootstrap-icons"

function TodoFilter({activeFilter, onClickBtn}) {
  const id = useId();
  const todos = useSelector( state => state.todos.todos )
  const [buttonsData] = useState([
    { id,
      title: 'All',
      state: void 0
    },
    { id,
      title: 'Not completed',
      state: false
    },
    { id,
      title: 'Completed',
      state: true
    },
  ])
  return (
    <div className="me-3">
      <Funnel size={16} />:
      <ButtonGroup className="ms-1">
        { buttonsData.map(({id,title,state}, index) => (
            <Button
              variant="outline-secondary"
              size="sm"
              key={`${id}-${index}`}
              disabled={!todos.length}
              active={activeFilter === state}
              onClick={() => {onClickBtn(state)}}>
              {title}
            </Button>
          ))
        }
      </ButtonGroup>
    </div>
  )
}

export default TodoFilter
