import { normalize } from 'normalizr'

import Todo from '../types/Todo'
import { APIRes } from '../types'
import { todoSchema, todoArraySchema } from '../util/schema'
import { getTodos, patchTodo } from '../util/api/todos'
import {
  ActionFetchTodosReq,
  ActionFetchTodosSuccess,
  ActionSelectTodo,
  ActionUpdateFormTodoName,
  ActionUpdateTodoSuccess,
  FETCH_TODOS_REQ,
  FETCH_TODOS_SUCCESS,
  SELECT_TODO,
  UPDATE_FORM_TODO_NAME,
  UPDATE_TODO_SUCCESS,
  NormalizedTodoRes,
  NormalizedTodosRes,
  ThunkDispatch,
  ThunkResult
} from './types'
import { State } from '../reducers/types'

export const fetchTodosReq = (): ActionFetchTodosReq => ({
  type: FETCH_TODOS_REQ
})

export const fetchTodosSuccess = (date: Todo['date'], res: APIRes<Todo[]>): ActionFetchTodosSuccess => ({
  type: FETCH_TODOS_SUCCESS,
  date,
  res: normalize(res.data, todoArraySchema)
})

export const fetchTodos = (date: Todo['date']): ThunkResult<Promise<NormalizedTodosRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(fetchTodosReq())

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
  dispatch(fetchTodosReq())

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
