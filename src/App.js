import React, { useState, useEffect } from "react"
import TodoList from "./Todo/TodoList"
import { useSelector } from 'react-redux'
import Navigation from "./Components/Navigation";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App({ getTodos }) {
  const [loading, setLoading] = useState(true)
  const todos = useSelector( state => state.todos.todos )

  //useEffect -> Аналогично componentDidMount, componentDidUpdate и componentWillUnmount
  //useRef -> используем когда не хотим перересовывать(не вызывать сам рендер компонента) .current (ref={})
  //useMemo -> кеширование...
  //useCallback -> кэшируем, работаем с самой функцикй
  //useDispatch

  useEffect(() => {
    setLoading(false);
  }, [])


  return (
     <div className="container">
      {/*<Context.Provider value={}>*/}
        <div className="wrapper">
          <hr/>
          <Navigation />
          <h1 className="flex-grow-1 text-center">To do!</h1>
          <React.Suspense fallback={<p>Loading...</p>}>
            <AddTodo />
          </React.Suspense>
          <div>

          </div>
          { todos.length ? (<TodoList/>) : loading || (<p>No todos</p>)}
        </div>
      {/*</Context.Provider>*/}
     </div>
  );
}

export default App
