import React, {useId, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { ArrowDownUp } from "react-bootstrap-icons"
import { sortTodos } from "../redux/actions"


function TodoSort() {
  const todos = useSelector( state => state.todos.todos )
  const sort = useSelector( state => state.todos.sort )
  const dispatch = useDispatch()
  const id = useId()
  const [buttonsData] = useState([
    {
      id,
      title: 'New',
      direction: 'desc',
      filed: 'createdAt',
    },
    {
      id,
      title: 'Old',
      direction: 'asc',
      filed: 'createdAt',
    },
    {
      id,
      title: '[a-Z]',
      direction: 'asc',
      filed: 'title',
    },
    {
      id,
      title: '[Z-a]',
      direction: 'desc',
      filed: 'title',
    },
  ])
  return (
    <div>
      <ArrowDownUp size={16} />:
      <ButtonGroup className="ms-1">
        {buttonsData.map(({id, title, filed, direction},index) => (
            <Button
              variant="outline-secondary"
              size="sm"
              key={`${id}-${index}`}
              disabled={!todos.length}
              active={sort.field === filed && sort.direction === direction}
              onClick={() => (dispatch(sortTodos({direction: direction, field: filed})))}
            >{title}</Button>
          ))
        }
      </ButtonGroup>
    </div>
  )
}

export default TodoSort
