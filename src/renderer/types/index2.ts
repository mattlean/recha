import { TYPE as TODO_TYPE } from './Todo'

/**
 * Interface for API response
 */
export interface APIRes<T> {
  data: T
  type: Types
}

/**
 * Constant API response type for errors
 */
export const ERR_TYPE = 'Error'

/**
 * All API response types
 */
export type Types = typeof ERR_TYPE | typeof TODO_TYPE
