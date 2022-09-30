import {
  SHOW_LOADER,
  CREATE_TODO,
  HIDE_LOADER,
  UPDATE_TODO,
  COMPLETED_TODO,
  DELETE_TODO,
  CLEAR_TODOS,
  SORT_TODOS
} from "./types"

export function createTodo(todo) {
  return {
    type: CREATE_TODO,
    payload: todo
  }
}

export function updateTodo(todo) {
  return {
    type: UPDATE_TODO,
    payload: todo
  }
}

export function completedTodo(id) {
  return {
    type: COMPLETED_TODO,
    payload: id
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id
  }
}

export function clearTodos() {
  return {
    type: CLEAR_TODOS
  }
}

export function sortTodos(data) {
  return {
    type: SORT_TODOS,
    payload: data
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function fetchTodo() {
  return async dispatch => {
    dispatch(showLoader())
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const json = await response.json()

    json.forEach((todo) => {
      dispatch({type: CREATE_TODO, payload: {title: todo.title, completed: todo.completed}})
    })

    dispatch(hideLoader())
  }
}
