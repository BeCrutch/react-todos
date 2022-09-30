import {
  CLEAR_TODOS,
  COMPLETED_TODO,
  CREATE_TODO,
  DELETE_TODO,
  FETCH_TODO,
  SORT_TODOS,
  UPDATE_TODO
} from './types'

const initialState = {
  todos: [],
  sort: {
    field: 'createdAt',
    direction: 'desc'
  },
}

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}

function _sort(todos, params) {
  if(params.direction === 'desc') {
    return  todos.sort((a, b) => ( a[params.field] < b[params.field] ? 1 : a[params.field] > b[params.field] ? -1 : 0) )
  }
  return todos.sort((a, b) => ( a[params.field] > b[params.field] ? 1 : a[params.field] < b[params.field] ? -1 : 0) )
}

//Pure Function
export const todosReducer = (state = initialState, action) => {
  switch (action.type) {

    // CREATE_TODOs sort
    case CREATE_TODO:
      const newTodo = {
        id: uid(),
        title: action.payload.title,
        completed: action.payload.completed || false,
        createdAt: new Date().toISOString()
      }
      return { ...state, todos: _sort(state.todos.concat(newTodo), state.sort) }

    case UPDATE_TODO:
      return {
        ...state, todos: _sort(state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title
          }
          return todo
        }), state.sort)
      }

    case COMPLETED_TODO:
      return { ...state, todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed
          }
          return todo
        })}

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload)}

    case CLEAR_TODOS:
      return { ...state, todos: []}

    case SORT_TODOS:
      let t = state.todos.map(a => a)
      return { ...state, todos: _sort(t, action.payload), sort: action.payload }

    case FETCH_TODO:
      return { ...state, todos: state.todos.concat(action.payload) }
    default: return state
  }
}
