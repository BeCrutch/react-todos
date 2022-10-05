import React, {useState, useEffect, createRef} from "react"
import TodoList from "./Todo/TodoList"
import { useSelector } from 'react-redux'
import Navigation from "./Components/Navigation"
import TodoFilter from "./Todo/TodoFilter";
import TodoSort from "./Todo/TodoSort";
import Badge from "react-bootstrap/Badge";
import Context from "./context";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [loading, setLoading] = useState(true)
  const todos = useSelector( state => state.todos.todos )
  const [completedFilter, setCompletedFilter] = useState(undefined)

  useEffect(() => {
    setLoading(false);
  }, [])

  const toggleFilter = (val) => setCompletedFilter(val)

  return (
     <div className="container">
        <div className="wrapper">
          <Navigation />
          <h1 className="flex-grow-1 text-center">To do!</h1>
          <React.Suspense fallback={<p>Loading...</p>}>
            <AddTodo />
          </React.Suspense>
          <div className="d-flex align-items-center mb-3">
            <TodoFilter activeFilter={completedFilter} onClickBtn={toggleFilter}/>
            <TodoSort />
            <div className="flex-grow-1 text-end"><small>Total:{' '}</small><Badge bg="dark">{todos.length}</Badge></div>
          </div>
          <Context.Provider value={{completedFilter}}>
            { todos.length ? (<TodoList />) : loading || (<p>No todos</p>)}
          </Context.Provider>
        </div>
     </div>
  );
}

export default App
