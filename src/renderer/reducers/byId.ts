import { ActionsResponse, Todo, StateById } from '../types'

export const defaultState = {}

const byId = (state: StateById = defaultState, action: ActionsResponse): StateById => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    }
  }

  return state
}

export default byId

export const getTodo = (state: StateById, id: string): Todo => state[id]
