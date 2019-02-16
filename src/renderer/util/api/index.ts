import * as todos from './todos'

type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

interface ReqOptions {
  method: string
  headers: { 'Content-Type': 'application/json' }
  body: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const ROOT_PATH = '/api/v1'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const genReqOptions = (method: Method, data: any): ReqOptions => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})

export { todos }
