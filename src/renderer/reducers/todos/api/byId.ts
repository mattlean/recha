import Todo from '../../../types/Todo'
import { StateById } from '../../types'

import {
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ActionUpdateTodoSuccess,
  ADD_TODO_SUCCESS,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../../../actions/types'

type Actions = ActionAddTodoSuccess | ActionFetchTodosSuccess | ActionUpdateTodoSuccess

const defaultState = {}

const byId = (state: StateById<Todo> = defaultState, action: Actions): StateById<Todo> => {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        ...action.res.entities.todos
      }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        ...action.res.entities.todos
      }
    default:
      return state
  }
}

export default byId
