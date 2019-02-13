/* eslint-disable import/prefer-default-export */
/**
 * Interface for API response
 */
export interface APIRes<T> {
  data: T
  type: string
}
