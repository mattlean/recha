import { StateTodosUI } from '../../types/reducers'

import {
  ActionSelectTodo,
  ActionSelectTodoList,
  ActionUpdateTodoName,
  SELECT_TODO,
  SELECT_TODO_LIST,
  UPDATE_TODO_NAME
} from '../../types/actions'

type Actions = ActionSelectTodo | ActionSelectTodoList | ActionUpdateTodoName

type State = StateTodosUI | {}

const defaultState: State = {}

const ui = (state: State = defaultState, action: Actions): State => {
  switch (action.type) {
    case SELECT_TODO:
      return {
        ...state,
        currTodo: action.todo.id,
        todoName: action.todo.name
      }
    case SELECT_TODO_LIST:
      return {
        ...state,
        currTodoList: action.date
      }
    case UPDATE_TODO_NAME:
      return {
        ...state,
        todoName: action.name
      }
    default:
      return state
  }
}

export default ui
