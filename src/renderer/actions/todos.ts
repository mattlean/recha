import { normalize } from 'normalizr'

import {
  ActionAddTodoSuccess,
  ActionFetchTodosSuccess,
  ActionRemoveTodoSuccess,
  ActionStartTodosReq,
  ActionUpdateTodoFormCompleted,
  ActionUpdateTodoFormName,
  ActionUpdateTodoSuccess,
  ADD_TODO_SUCCESS,
  FETCH_TODOS_SUCCESS,
  Initiator,
  NormalizedTodoRes,
  NormalizedTodosRes,
  REMOVE_TODO_SUCCESS,
  START_TODOS_REQ,
  ThunkDispatch,
  ThunkResult,
  UPDATE_TODO_FORM_COMPLETED,
  UPDATE_TODO_FORM_NAME,
  UPDATE_TODO_SUCCESS
} from './types'
import Todo from '../types/Todo'
import { APIRes } from '../types'
import { todoSchema, todoArraySchema } from '../util/schema'
import { deleteTodo, getTodos, patchTodo, patchTodoOrders, postTodo } from '../util/api/todos'
import { todoIsChecked } from '../util'

export const startTodosReq = (initiator: Initiator): ActionStartTodosReq => ({
  type: START_TODOS_REQ,
  initiator
})

export const addTodoSuccess = (date: string, data: Todo): ActionAddTodoSuccess => ({
  type: ADD_TODO_SUCCESS,
  date,
  res: normalize(data, todoSchema)
})

export const addTodo = (data: Partial<Todo>): ThunkResult<Promise<NormalizedTodoRes>> => (dispatch: ThunkDispatch) => {
  dispatch(startTodosReq('addTodo'))

  return postTodo(data).then(res => Promise.resolve(dispatch(addTodoSuccess(res.data.date, res.data)).res))
}

export const fetchTodosSuccess = (date: Todo['date'], data: Todo[]): ActionFetchTodosSuccess => ({
  type: FETCH_TODOS_SUCCESS,
  date,
  res: normalize(data, todoArraySchema)
})

export const fetchTodos = (date: Todo['date']): ThunkResult<Promise<NormalizedTodosRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(startTodosReq('fetchTodos'))

  return getTodos({ date, col: 'order_num', dir: 'ASC' }).then(res =>
    Promise.resolve(dispatch(fetchTodosSuccess(date, res.data)).res)
  )
}

export const removeTodoSuccess = (date: string, id: Todo['id']): ActionRemoveTodoSuccess => ({
  type: REMOVE_TODO_SUCCESS,
  date,
  id
})

export const removeTodo = (id: Todo['id']): ThunkResult<Promise<Todo['id']>> => (dispatch: ThunkDispatch) => {
  dispatch(startTodosReq('removeTodo'))

  return deleteTodo(id).then(res => Promise.resolve(dispatch(removeTodoSuccess(res.data.date, res.data.id)).id))
}

export const reorderTodos = (date: Todo['date'], data: number[]): ThunkResult<Promise<NormalizedTodosRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(startTodosReq('reorderTodos'))

  return patchTodoOrders(data).then(res => Promise.resolve(dispatch(fetchTodosSuccess(date, res.data)).res))
}

export const updateTodoSuccess = (res: APIRes<Todo>): ActionUpdateTodoSuccess => ({
  type: UPDATE_TODO_SUCCESS,
  res: normalize(res.data, todoSchema)
})

export const updateTodo = (id: Todo['id'], data: Partial<Todo>): ThunkResult<Promise<NormalizedTodoRes>> => (
  dispatch: ThunkDispatch
) => {
  dispatch(startTodosReq('updateTodo'))

  return patchTodo(id, data).then(res => Promise.resolve(dispatch(updateTodoSuccess(res)).res))
}

export const updateTodoFormCompleted = (
  id: Todo['id'],
  completed_at: Todo['completed_at']
): ActionUpdateTodoFormCompleted => ({
  type: UPDATE_TODO_FORM_COMPLETED,
  id,
  completed: todoIsChecked(completed_at)
})

export const updateTodoFormName = (id: Todo['id'], name: Todo['name']): ActionUpdateTodoFormName => ({
  type: UPDATE_TODO_FORM_NAME,
  id,
  name
})
