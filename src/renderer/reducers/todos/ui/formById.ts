import {
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
  | ActionFetchTodosSuccess
  | ActionUpdateTodoFormCompleted
  | ActionUpdateTodoFormName
  | ActionUpdateTodoSuccess

const formById = (state: StateById<Form> = defaultState, action: Actions): StateById<Form> => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS: {
      const newState = {}
      if (action.res.result.length > 0) {
        const { todos } = action.res.entities
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
      const newState = {}
      const { todos } = action.res.entities
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
    // case UPDATE_TODO_FORM_CHECKED: {
    //   return {
    //     ...state,
    //     [action.id]: {
    //       ...state[action.id],
    //       checked: action.checked
    //     }
    //   }
    // }
    default:
      return state
  }
}

export default formById
