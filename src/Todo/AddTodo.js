import React, { useState, useRef } from "react"
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import Calendar from 'react-calendar';
import { Plus } from 'react-bootstrap-icons'
import 'react-calendar/dist/Calendar.css'
import {connect} from 'react-redux'
import { createTodo } from '../redux/actions'

//Custom Hook
function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: e => setValue(e.target.value)
    },
    value: () => value.trim(),
    clear: () => setValue(''),
  }
}

function AddTodo({ onCreate, createTodo }) {
  const input = useInputValue('')
  const textInput = useRef(null)
  const [invalidFeedback, setInvalidFeedback] = useState(false)

  //
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [value, onChange] = useState(new Date());

  function submitHandler(event) {
    event.preventDefault()
    if(input.value()) {
      //onCreate(input.value())
      input.clear()
      createTodo({
        title: input.value(),
        completed: false
      })
      return
    }
    textInput.current.focus();
    setInvalidFeedback(true)
  }

  return (
    <>
      <form action="#" className="mb-1" onSubmit={submitHandler} >
        <InputGroup>
          <Form.Control
            placeholder="Input..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            ref={textInput}
            onInput={() => setInvalidFeedback(false)}
            {...input.bind}
          />
          <Button
            id="button-addon2"
            variant="outline-secondary"
            onClick={handleShow}
          >
            <Plus size={16}/>
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            // disabled={!input.value()}
          >
            Add
          </Button>
        </InputGroup>
        <span className={`${invalidFeedback ? 'opacity-1' : 'opacity-0'} text-danger`} >The field must not be empty!</span>
      </form>
      <Modal.Dialog>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Calendar onChange={onChange} value={value} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Modal.Dialog>
    </>
  )
}



const mapDispatchToProps = {
  createTodo
}

AddTodo.propTypes = {
  //onCreate: PropTypes.func.isRequired
}

export default connect(null, {createTodo})(AddTodo)
