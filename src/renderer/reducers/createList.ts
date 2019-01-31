import { combineReducers } from 'redux'

import {
  ActionsResponse,
  ActionToggleTodoSuccess,
  StateList,
  StateListErrorMessage,
  StateListIds,
  StateListIsFetching
} from '../types'

const createList = (filter: string): ReturnType<typeof createList> => {
  const handleToggle = (state: StateListIds, action: ActionToggleTodoSuccess): StateListIds => {
    if (action.response) {
      const { result: toggledId, entities } = action.response

      if (!Array.isArray(toggledId)) {
        const { completed } = entities.todos[toggledId]
        const shouldRemove = (completed && filter === 'active') || (!completed && filter === 'completed')

        return shouldRemove ? state.filter(id => id !== toggledId) : state
      }
    }

    return state
  }

  const ids = (state: StateListIds = [], action: ActionsResponse): StateListIds => {
    switch (action.type) {
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? [...state, action.response.result] : state
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ? action.response.result : state
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action)
      default:
        return state
    }
  }

  const isFetching = (state: StateListIsFetching = false, action): StateListIsFetching => {
    if (action.filter !== filter) {
      return state
    }

    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false
      default:
        return state
    }
  }

  const errorMessage = (state: StateListErrorMessage = null, action): StateListErrorMessage => {
    if (filter !== action.filter) {
      return state
    }

    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null
      default:
        return state
    }
  }

  return combineReducers({
    errorMessage,
    ids,
    isFetching
  })
}

export default createList

export const getErrorMessage = (state: StateList): StateListErrorMessage | undefined => {
  if (state.errorMessage || state.errorMessage === null) return state.errorMessage
  return undefined
}

export const getIds = (state: StateList): StateListIds | undefined => {
  if (state.ids) return state.ids
  return undefined
}

export const getIsFetching = (state: StateList): StateListIsFetching | undefined => {
  if (state.isFetching || state.isFetching === false) return state.isFetching
  return undefined
}
