import {combineReducers} from "redux";
import {todosReducer} from "./todosReducer";
import {appReducer} from "./appReducer";

// чистые функции
export const rootReducer = combineReducers({
  todos: todosReducer,
  app: appReducer
})

