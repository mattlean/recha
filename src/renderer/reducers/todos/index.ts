import { combineReducers } from 'redux'

import byId, { getTodo } from './byId'
import list from './list'
import ui from './ui'
import Todo from '../../types/Todo'
import { StateTodos } from '../../types/reducers'

const todos = combineReducers({ byId, list, ui })

export default todos

export const getTodoList = (state: StateTodos): Todo[] => {
  if (Array.isArray(state.list.items)) {
    return state.list.items.map(id => getTodo(state.byId, String(id)))
  }
  return []
}
