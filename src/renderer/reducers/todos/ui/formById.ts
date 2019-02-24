import {
  ADD_TODO_SUCCESS,
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ActionUpdateTodoFormCompleted,
  ActionUpdateTodoFormName,
  ActionUpdateTodoSuccess,
  FETCH_TODOS_SUCCESS,
  UPDATE_TODO_FORM_COMPLETED,
  UPDATE_TODO_FORM_NAME,
  UPDATE_TODO_SUCCESS
} from '../../../actions/types'
import { Form, StateById } from '../../types'
import { todoIsChecked } from '../../../util'

export const defaultState = {}

type Actions =
  | ActionAddTodoSuccess
  | ActionFetchTodosSuccess
  | ActionUpdateTodoFormCompleted
  | ActionUpdateTodoFormName
  | ActionUpdateTodoSuccess

const formById = (state: StateById<Form> = defaultState, action: Actions): StateById<Form> => {
  const updateForm = (entities): StateById<Form> => {
    const newState = {}
    const { todos } = entities
    Object.keys(todos).forEach(id => {
      newState[id] = {
        completed: todoIsChecked(todos[id].completed_at),
        name: todos[id].name
      }
    })
    return {
      ...state,
      ...newState
    }
  }

  switch (action.type) {
    case ADD_TODO_SUCCESS: {
      return updateForm(action.res.entities)
    }
    case FETCH_TODOS_SUCCESS: {
      if (action.res.result.length > 0) {
        return updateForm(action.res.entities)
      }
      return state
    }
    case UPDATE_TODO_FORM_COMPLETED: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          completed: action.completed
        }
      }
    }
    case UPDATE_TODO_FORM_NAME: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.name
        }
      }
    }
    case UPDATE_TODO_SUCCESS: {
      return updateForm(action.res.entities)
    }
    default:
      return state
  }
}

export default formById
