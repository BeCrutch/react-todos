import {ArrowDownUp} from "react-bootstrap-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {sortTodos} from "../redux/actions";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

function TodoFilter() {
  const sort = useSelector( state => state.todos.sort )
  const dispatch = useDispatch()

  return (
    <div>
      <ArrowDownUp size={16} />:
      <ButtonGroup className="ms-1">
        <Button variant="outline-secondary" active={sort.field === 'createdAt' && sort.direction === 'desc'} onClick={() => (dispatch(sortTodos({direction: 'desc', field :'createdAt'})))} size="sm">New</Button>
        <Button variant="outline-secondary" active={sort.field === 'createdAt' && sort.direction === 'asc'} onClick={() => (dispatch(sortTodos({direction: 'asc',field :'createdAt'})))} size="sm">Old</Button>
        <Button variant="outline-secondary" active={sort.field === 'title' && sort.direction === 'asc'} onClick={() => (dispatch(sortTodos({direction: 'asc', field :'title'})))} size="sm">[a-Z]</Button>
        <Button variant="outline-secondary" active={sort.field === 'title' && sort.direction === 'desc'} onClick={() => (dispatch(sortTodos({direction: 'desc', field :'title'})))} size="sm">[Z-a]</Button>
      </ButtonGroup>
    </div>
  )
}

export default TodoFilter
