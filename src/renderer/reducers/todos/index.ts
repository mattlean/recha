import { combineReducers } from 'redux'

import byId, { getTodo } from './byId'
import formNames from './formNames'
import lists from './lists'
import Todo from '../../types/Todo'
import { StateTodos } from '../../types/reducers'

const todos = combineReducers({ byId, formNames, lists })

export default todos

export const getTodoList = (state: StateTodos, date: string): Todo[] => {
  if (state.lists && Array.isArray(state.lists[date])) {
    return state.lists[date].map(id => getTodo(state.byId, String(id)))
  }
  return []
}
