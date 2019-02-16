import Todo from '../../types/Todo'
import { StateById } from '../types'

import {
  ActionFetchTodosSuccess,
  ActionUpdateTodoSuccess,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../../actions/types'

type Actions = ActionFetchTodosSuccess | ActionUpdateTodoSuccess

const defaultState = {}

const byId = (state: StateById<Todo> = defaultState, action: Actions): StateById<Todo> => {
  switch (action.type) {
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
