/**
 * Constant API response type for todos
 */
export const TYPE = 'Todo'

/**
 * Interface for Todo row data
 */
export default interface Todo {
  id: number
  date: string
  name: string
  order_num?: number
  completed_at?: string
  details?: string
  created_at: string
  updated_at: string
}
