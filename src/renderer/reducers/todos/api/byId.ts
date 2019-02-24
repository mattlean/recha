import { StateTodosAPI } from '../../types'

import {
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ActionRemoveTodoSuccess,
  ActionUpdateTodoSuccess,
  ADD_TODO_SUCCESS,
  FETCH_TODOS_SUCCESS,
  REMOVE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../../../actions/types'

type Actions = ActionAddTodoSuccess | ActionFetchTodosSuccess | ActionRemoveTodoSuccess | ActionUpdateTodoSuccess

const defaultState = {}

const byId = (state: StateTodosAPI['byId'] = defaultState, action: Actions): StateTodosAPI['byId'] => {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
    case FETCH_TODOS_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        ...action.res.entities.todos
      }
    case REMOVE_TODO_SUCCESS: {
      const newState = { ...state }
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default byId
