import moment from 'moment'
import { StateTodosAPI } from '../../types'

import {
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ActionRemoveTodoSuccess,
  ADD_TODO_SUCCESS,
  FETCH_TODOS_SUCCESS,
  REMOVE_TODO_SUCCESS
} from '../../../actions/types'

type Actions = ActionAddTodoSuccess | ActionFetchTodosSuccess | ActionRemoveTodoSuccess

const defaultState = {}

const lists = (state: StateTodosAPI['lists'] = defaultState, action: Actions): StateTodosAPI['lists'] => {
  switch (action.type) {
    case ADD_TODO_SUCCESS: {
      const formattedDate = moment(action.date).format('YYYY-MM-DD')
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
    case REMOVE_TODO_SUCCESS: {
      const date = moment(action.date).format('YYYY-MM-DD')
      const currList = state[date]
      const todoIndex = currList.indexOf(action.id)
      const newList = [...currList.slice(0, todoIndex), ...currList.slice(todoIndex + 1)]

      return {
        ...state,
        [date]: newList
      }
    }
    default:
      return state
  }
}

export default lists
