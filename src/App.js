import React, { useEffect } from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
import Loader from "./Loader"
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=12')
      .then(response => response.json())
      .then(json =>
        setTimeout(() => {
          setLoading(false)
          setTodos(json)
        }, 2500)
      )
  }, [])


  function toggleTodo(id) {
    console.log('todos', todos)
    setTodos(todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat({
      id: Date.now(),
      title,
      completed: false,
    }))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 style={{ textAlign: 'center' }}>To do!</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        { loading && <Loader /> }
        { todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>) : loading || (<p>No todos</p>)}
      </div>
    </Context.Provider>
  );
}

export default App;
