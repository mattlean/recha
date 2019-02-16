import { normalize } from 'normalizr'

import Todo from '../types/Todo'
import { APIRes } from '../types'
import { todoSchema, todoArraySchema } from '../util/schema'
import { getTodos, patchTodo } from '../util/api/todos'
import {
  ActionFetchTodosSuccess,
  ActionSelectTodo,
  ActionStartTodosReq,
  ActionUpdateFormTodoName,
  ActionUpdateTodoSuccess,
  FETCH_TODOS_SUCCESS,
  Initiator,
  NormalizedTodoRes,
  NormalizedTodosRes,
  SELECT_TODO,
  START_TODOS_REQ,
  ThunkDispatch,
  ThunkResult,
  UPDATE_FORM_TODO_NAME,
  UPDATE_TODO_SUCCESS
} from './types'
import { State } from '../reducers/types'

export function fetchTodosSuccess(date: Todo['date'], res: APIRes<Todo[]>): ActionFetchTodosSuccess {
  return {
    type: FETCH_TODOS_SUCCESS,
    date,
    res: normalize(res.data, todoArraySchema)
  }
}

export const startTodosReq = (initiator: Initiator): ActionStartTodosReq => ({
  type: START_TODOS_REQ,
  initiator
})

export const fetchTodos = (date: Todo['date']): ThunkResult<Promise<NormalizedTodosRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(startTodosReq('fetchTodos' as Initiator))

  return getTodos({ date, col: 'order_num', dir: 'ASC' }).then(res =>
    Promise.resolve(dispatch(fetchTodosSuccess(date, res)).res)
  )
}

export const updateTodoSuccess = (res: APIRes<Todo>): ActionUpdateTodoSuccess => ({
  type: UPDATE_TODO_SUCCESS,
  res: normalize(res.data, todoSchema)
})

export const updateTodo = (id: Todo['id'], data: Partial<Todo>): ThunkResult<Promise<NormalizedTodoRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(startTodosReq('updateTodo' as Initiator))

  return patchTodo(id, data).then(res => Promise.resolve(dispatch(updateTodoSuccess(res)).res))
}

export const selectTodo = (id: Todo['id'], name: Todo['name']): ActionSelectTodo => ({
  type: SELECT_TODO,
  id,
  name
})

export const updateFormTodoName = (id: Todo['id'], name: Todo['name']): ActionUpdateFormTodoName => ({
  type: UPDATE_FORM_TODO_NAME,
  id,
  name
})
