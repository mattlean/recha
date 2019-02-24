import moment from 'moment'
import { StateTodosAPI } from '../../types'

import {
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ADD_TODO_SUCCESS,
  FETCH_TODOS_SUCCESS
} from '../../../actions/types'

type Actions = ActionAddTodoSuccess | ActionFetchTodosSuccess

type State = StateTodosAPI['lists'] | {}

const defaultState = {}

const lists = (state: State = defaultState, action: Actions): State => {
  switch (action.type) {
    case ADD_TODO_SUCCESS: {
      const formattedDate = moment(state[action.date]).format('YYYY-MM-DD')
      const newList = Array.from(state[formattedDate])
      newList.push(action.res.result)
      return {
        ...state,
        [formattedDate]: newList
      }
    }
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
