import { TYPE as TODO_TYPE } from './Todo'

/**
 * Constant API response type for errors
 */
export const ERR_TYPE = 'Error'

/**
 * Interface for API response
 */
export interface APIRes<T> {
  data: T
  type: APITypes
}

/**
 * All API response types
 */
export type APITypes = typeof ERR_TYPE | typeof TODO_TYPE
