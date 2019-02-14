/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import HTTPErr from './HTTPErr'
import Todo from '../types/Todo'
import { APIRes } from '../types'

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

const rootPath = '/api/v1'

export const getTodos = (query?: Partial<TodosQuery>): Promise<APIRes<Todo[]>> => {
  let path = `${rootPath}/todos`

  if (query) {
    const queryString = new URLSearchParams(query).toString()
    if (queryString) path += `?${queryString}`
  }

  return fetch(path).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
}
