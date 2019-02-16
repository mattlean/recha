import { TYPE as TODO_TYPE } from './Todo'

/**
 * Constant API response type for errors
 */
export type ERR_TYPE = 'Error'

/**
 * All API response types
 */
export type APITypes = ERR_TYPE | typeof TODO_TYPE

/**
 * Interface for API response
 */
export interface APIRes<T> {
  data: T
  type: APITypes
}
