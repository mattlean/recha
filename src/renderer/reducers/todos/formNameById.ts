import {
  ActionFetchTodosSuccess,
  ActionUpdateFormTodoName,
  FETCH_TODOS_SUCCESS,
  UPDATE_FORM_TODO_NAME
} from '../../types/actions'
import { StateById } from '../../types/reducers'

export const defaultState = {}

type Actions = ActionFetchTodosSuccess | ActionUpdateFormTodoName

const formNameById = (state: StateById<string> = defaultState, action: Actions): StateById<string> => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS: {
      const newState = {}
      if (action.res.result.length > 0) {
        const { todos } = action.res.entities
        Object.keys(todos).forEach(id => {
          newState[id] = todos[id].name
        })
        return newState
      }
      return state
    }
    case UPDATE_FORM_TODO_NAME: {
      return {
        ...state,
        [action.id]: action.name
      }
    }
    default:
      return state
  }
}

export default formNameById

export const getTodoName = (state: StateById<string>, id: string): string => state[id]
