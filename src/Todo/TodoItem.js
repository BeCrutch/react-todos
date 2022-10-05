//import PropTypes from 'prop-types'

import React, {useContext, useLayoutEffect, useRef, useState} from "react"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import {Pen, Trash, Check, X, Check2, CheckLg, Plus} from 'react-bootstrap-icons'
import Form from 'react-bootstrap/Form';
import {completedTodo, updateTodo, deleteTodo} from "../redux/actions";
import {useDispatch} from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Context from "../context";

const styles = {
  li: {
    position: 'relative',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'rgb(255 255 255)',
    boxShadow: '0 3px 6px 0 rgb(0 0 0 / 20%)',
  },
  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginRight: '16px',
  },
  number: {
    position: 'absolute',
    top: '-12px',
    left: '12px',
    padding: '0 4px',
    backgroundColor: 'rgb(255 255 255)',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  number_test: {
    position: 'absolute',
    top: '-12px',
    left: '12px',
    padding: '0 4px',
    backgroundColor: 'rgb(0 0 0)',
    fontSize: '14px',
    fontStyle: 'italic',
    border: '1px solid #c2c2c2',
    borderRadius: '5px',
    color: '#bababa',
  },
  span: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    marginRight: '8px',
    cursor: 'pointer'
  }
}

function dateFormat(date) {
  //.toString().length
  const formatter = v => (v < 10 ? `0${v}` : v)
  const _d    = new Date(date)
  const h     = formatter(_d.getHours())
  const m     = formatter(_d.getMinutes())
  const s     = formatter(_d.getSeconds())
  const d     = formatter(_d.getDate())
  const month = formatter(_d.getMonth())
  const year  = _d.getFullYear()
  return `${h}:${m}:${s} ${d}/${month}/${year}`
}

function TodoItem({ todo, completed }) {
  //const { removeTodo } = useContext(Context)
  //const { toggleModal } = useContext(Context)

  const classes = []
  if (todo.completed) {
    classes.push('done')
  }
  const dispatch = useDispatch()
  const inputTodo = useRef(null)
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [editTodo, setEditTodo] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)

  const {completedFilter} = useContext(Context)

  useLayoutEffect(() => {
    if(editTodo) {
      inputTodo.current.focus()
    }
  }, [editTodo])

  const editBtn = () => {
    dispatch(updateTodo({id: todo.id, title: editValue}))
    setEditTodo(false)
  }
  const onChangeCompleted = () => {
    dispatch(completedTodo(todo.id))
  }
  const deleteBtn = () => {
    dispatch(deleteTodo(todo.id))
  }


  return (

      <li style={styles.li} className={`${completedFilter === undefined || (completedFilter === todo.completed ? '' : 'd-none')}`}>
      {/*<span style={styles.number}>{index}</span>*/}
      <div >
        <span className="text-secondary opacity-75 small">created at:{' '}</span>
        <Badge bg="light" text="warning">{dateFormat(todo.createdAt) || '--:-- --/--/--'}</Badge>
        {todo.finishIn &&
          <>
            <span className="text-secondary opacity-75 small">Finish in:</span>
            <Badge bg="danger" text="white">--:-- --/--/--</Badge>
          </>
        }
      </div>
      <div style={styles.div}>
        <div className={classes.join(' ')} style={styles.span}>
          <Form.Check
            className="d-flex align-items-center"
            type={'checkbox'}
            id={todo.id}
            label={editTodo || todo.title }
            onChange={() => onChangeCompleted(todo.id)}
            checked={todo.completed}
          />
          {editTodo &&
            <form action="#"
              className="w-100"
              onSubmit={(e) => {
                e.preventDefault()
                editBtn()
              }}>
              <InputGroup>
                <Form.Control
                  type="text"
                  defaultValue={ todo.title }
                  ref={inputTodo}
                  onChange={(e) => {
                    setEditValue(e.target.value)
                  }}
                />
                <Button
                  id="button-addon2"
                  variant="outline-danger"
                  onClick={() => {
                    setEditTodo(false)
                  }}>
                  <X />
                </Button>
                <Button
                  id="button-addon2"
                  variant="outline-success"
                  // onClick={editBtn}
                  type="submit"
                >
                  <CheckLg size={16} />
                </Button>
              </InputGroup>
            </form>
          }
        </div>
        <ButtonGroup>
          <Button
            variant="outline-primary"
            onClick={() => (setEditTodo(true))}
            disabled={editTodo}>
            <Pen size={16} />
          </Button>
          <Button
            variant="outline-danger"
            className={confirmRemove && "active"}
            onClick={() => (setConfirmRemove(!confirmRemove))}
            disabled={editTodo}>
            <Trash />
          </Button>
        </ButtonGroup>
      </div>
      { confirmRemove &&
        <div style={{textAlign: 'end', marginTop: '8px'}}>
          Are you sure?
          {/*onClick={removeTodo.bind(null, todo.id)}*/}
          <a href="#" className="link-secondary mx-2" onClick={() => (setConfirmRemove(false))}>No</a>
          |
          <a href="#" className="link-danger mx-2" onClick={() => {deleteBtn()}}>Yes</a>
        </div>
      }
    </li>
  )
}

TodoItem.propTypes = {
  //index: PropTypes.number,
  //todo: PropTypes.object.isRequired,
}

export default TodoItem
