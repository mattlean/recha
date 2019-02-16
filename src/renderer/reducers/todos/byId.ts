import Todo from '../../types/Todo'
import { StateById } from '../types'

import { ActionFetchTodosSuccess, FETCH_TODOS_SUCCESS } from '../../actions/types'

const defaultState = {}

const byId = (state: StateById<Todo> = defaultState, action: ActionFetchTodosSuccess): StateById<Todo> => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        ...action.res.entities.todos
      }
    default:
      return state
  }
}

export default byId
