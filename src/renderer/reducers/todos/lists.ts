import { StateTodosAPI } from '../types'

import { ActionFetchTodosSuccess, FETCH_TODOS_SUCCESS } from '../../actions/types'

type State = StateTodosAPI['lists'] | {}

const defaultState = {}

const lists = (state: State | {} = defaultState, action: ActionFetchTodosSuccess): State => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        [action.date]: action.res.result
      }
    default:
      return state
  }
}

export default lists
