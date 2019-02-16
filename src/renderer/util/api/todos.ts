/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import HTTPErr from '../HTTPErr'
import Todo from '../../types/Todo'
import { APIRes } from '../../types'
import { genReqOptions, ROOT_PATH } from '.'

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

const pathTodos = `${ROOT_PATH}/todos`

export const getTodos = (query?: Partial<TodosQuery>): Promise<APIRes<Todo[]>> => {
  let newPathTodos = pathTodos
  if (query) {
    const queryString = new URLSearchParams(query).toString()
    if (queryString) newPathTodos += `?${queryString}`
  }

  return fetch(newPathTodos).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
}

export const getTodoLists = (): Promise<APIRes<string[]>> =>
  fetch(`${pathTodos}/lists`).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchTodo = (id: number, data: any): Promise<APIRes<Todo>> =>
  fetch(`${pathTodos}/${id}`, genReqOptions('PATCH', data)).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
