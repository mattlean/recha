import { StateList } from '../../types/reducers'

import { ActionFetchTodosSuccess, FETCH_TODOS_SUCCESS } from '../../types/actions'

type State = StateList<number> | {}

const defaultState = {}

const list = (state: State | {} = defaultState, action: ActionFetchTodosSuccess): State => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return {
        id: action.date,
        items: action.res.result
      }
    default:
      return state
  }
}

export default list
