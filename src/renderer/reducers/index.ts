import { combineReducers } from 'redux'

import byId, { getTodo } from './byId'
import createList, * as fromList from './createList'
import { State, StateListErrorMessage, StateListIsFetching, Todo } from '../types'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  byId,
  listByFilter
})

export default todos

export const getErrorMessage = (state: State, filter: string): StateListErrorMessage | undefined => {
  if (state.listByFilter) {
    return fromList.getErrorMessage(state.listByFilter[filter])
  }
  return undefined
}

export const getIsFetching = (state: State, filter: string): StateListIsFetching | undefined => {
  if (state.listByFilter) {
    return fromList.getIsFetching(state.listByFilter[filter])
  }
  return undefined
}

export const getVisibleTodos = (state: State, filter: string): Todo[] | undefined => {
  if (state.listByFilter && state.byId) {
    const ids = fromList.getIds(state.listByFilter[filter])
    if (ids) {
      return ids.map(
        (id): Todo | undefined => {
          if (state.byId) return getTodo(state.byId, id)
          return undefined
        }
      )
    }
  }
  return undefined
}
