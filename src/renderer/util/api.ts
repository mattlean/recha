import fetch from 'cross-fetch'

import HTTPErr from './HTTPErr'
import Todo from '../types/Todo'
import { APIRes } from '../types/index2'

const rootPath = '/api/v1'
// if(process.env.NODE_ENV === 'test') {
//   rootPath = `http://localhost:9001${rootPath}`
// }

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

// eslint-disable-next-line import/prefer-default-export
export const getTodos = (query?: Partial<TodosQuery>): Promise<APIRes<Todo[]>> => {
  let path = `${rootPath}/todos`

  if (query) {
    const queryString = new URLSearchParams(query).toString()
    if (queryString) path += `?${queryString}`
  }

  return fetch(path).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
}
