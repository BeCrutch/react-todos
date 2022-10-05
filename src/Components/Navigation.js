import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Dropdown from "react-bootstrap/Dropdown"
import {Gear} from "react-bootstrap-icons"
import {clearTodos, fetchTodo} from "../redux/actions"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function Navigation() {
  const dispatch = useDispatch()
  const todos = useSelector( state => state.todos.todos )
  const [showModal, setToggleModal] = useState(false)
  const handleClose = () => setToggleModal(false);
  async function mockData() {
    await dispatch(fetchTodo())
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete all todos?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            dispatch(clearTodos())
            handleClose()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic">
          <Gear size={16} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={mockData}>Add mock data:{' '}
              <input type="number" onClick={(e) => {e.stopPropagation()}} style={{width: '35px', textAlign: 'center'}} max="10" min="1" defaultValue="5" disabled={true}/>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={() => setToggleModal(true)} disabled={!todos.length}>Clear all</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default Navigation
